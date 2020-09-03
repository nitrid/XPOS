const SerialPort = require('serialport')
//const Readline = require('@serialport/parser-readline')
/*
* 
*   Dave Hill | dave-hill@dyrk.org
*   USING PROTOCOL CONCERT
*   ref : https://lists.launchpad.net/openerp-community/pdfcezlBjgtdJ.pdf
*	NodeJS >= 8
*/

/*
 *
 *  syncSerialPort : init Serial Communication
 *  Take in params the value to send on TPE
 *  & an "Array" (Object) with the expected value binded with their function to run
 */
var syncSerialPort = function(config, req, listAction){
    const port = new SerialPort(config.DEVICE, {
        baudRate:config.DEVICE_RATE,
        parser: new SerialPort.parsers.Readline()
       });
    port.on('data', (function(config, listAction, line){
        config.lastReceive = line.toString();
        
        port.close(function()
        {
            if (typeof listAction[line] == 'function')
            listAction[line](config);
            else if (listAction['default'])
            listAction['default'](config);
            else
            console.log(listAction, line);
        })
    }).bind(null, config, listAction));
    port.on('open',(function(req){
         port.write(req);
         data = port.read();
    }).bind(null, req));
    port.on('error', function(err){console.log(err)});
    //Make Timeout (serial Port is Busy, process in while, ..., terrorist)
    setTimeout(()=>{ port.close(); }, 120000); // It's dirty & you can remove this ;)
    return new Promise(function(resolve){
        return port.on("close", resolve)
    });
  },
  /*
   *
   *    generate_lrc : used for the signature of message
   *
   *
   */
  generate_lrc = function(real_msg_with_etx){	
    	let lrc = 0, text = real_msg_with_etx.split('');
        for (i in text){
            lrc ^= text[i].charCodeAt(0);
        }
        console.log('lrc => ', lrc);
        return lrc;
    },  
    send_eot_signal = function(config){
        console.log('Signal EOT sent to terminal');
        listAction = {};
        listAction[String.fromCharCode(5)] = (function(config){
           console.log('ENQ received from terminal');
           send_enq_signal(config);
         }).bind(null, config); 
        syncSerialPort(config, String.fromCharCode(4),listAction); //EOT
    },
    send_enq_signal = function(config){
        console.log('Signal ACK sent to terminal');
        listAction = {};
        listAction['default'] = get_answer_from_terminal.bind(null, config)
        syncSerialPort(config, String.fromCharCode(6),listAction); //ACK
    },
    /*
     *
     *  get_answer_from_terminal : Get the confirmation of the Payement
     *  (or cancelation)
     *
     *
     */
    get_answer_from_terminal = function(config){
        let response = {};
        console.log('Now expecting answer from Terminal');
        config.lastReceive = config.lastReceive.
                             substr(1).substr(0, config.lastReceive.length-3);
        console.log(config.lastReceive);
        response = {
            'pos_number'        : config.lastReceive.substr(0, 2),
            'transaction_result': config.lastReceive.charAt(2),
            'amount_msg'        : config.lastReceive.substr(3, 8),
            'payment_mode'      : config.lastReceive.charAt(11),
            'currency_numeric'  : config.lastReceive.substr(12, 3),
            'private'           : config.lastReceive.substr(15, 11)
        };
        console.log('response : ', JSON.stringify(response));
    },
    /*
     *
     *  Prepare & Send Payment Request to TPE
     *  !!!! DON'T CHANGE THE ORDER !!!
     *
     */
    send_message    = function(config){
        console.log('Send Message  ...');
        let data = {
            'pos_number': '01',
            'amount_msg': ('0000000' + (config.AMOUNT * 100).toFixed(0)).substr(-8),
            'answer_flag': '0',
            'payment_mode': config.PAYMENT_MODE  == 'check' ? 'C' : '1', 
            'transaction_type': '0',
            'currency_numeric': 978, 
            'private': '          ',
            'delay': 'A010',
            'auto': 'B010'
        };
        msg = Object.keys(data).map( k => data[k] ).join('');
        if (msg.length > 34) return console.log('ERR. : failed data > 34 characters.', msg);
        real_msg_with_etx = msg.concat(String.fromCharCode(3));//ETX
        lrc = generate_lrc(real_msg_with_etx);
        //STX + msg + lrc
        tpe_msg = (String.fromCharCode(2)).concat(real_msg_with_etx).concat(String.fromCharCode(lrc));
        console.log('Real message to send =', msg);
        console.log('Message sent to terminal');
        listAction = {};
        listAction[String.fromCharCode(6)] = ((config)=>{ 
          console.log('ACK received from terminal'); 
          send_eot_signal(config);
        }).bind(null, config);
             syncSerialPort(config, tpe_msg, listAction);
    },
    /*
     *
     *  Init the TPE
     *
     *
     */
    transaction_start = function(config){
        try {
            // Init
           console.log('Signal ENQ sent to terminal');
           listAction = {};
           listAction[String.fromCharCode(6)] = (function(config){
               console.log('ACK received from terminal');
               send_message(config);
           }).bind(null, config);
           syncSerialPort(config, String.fromCharCode(5),listAction);
         } catch (e){
            console.log(e);            
         }
    };




/*
 *
 *  Main - Poc 
 *
 *
 *
*/
var config = {
    DEVICE : 'COM6',
    DEVICE_RATE : 9600,
    PAYMENT_MODE : 'card',
    AMOUNT : 1.10
}

transaction_start(config);