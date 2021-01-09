var CardPayment = 
(
    function()
    {
        if(typeof require == 'undefined')
        {
            return CardPayment;
        }

        const SerialPort = require('serialport');
        let Listeners = Object();
        let port = null;
        let config = 
        {
            DEVICE : 'COM6',
            DEVICE_RATE : 9600,
            PAYMENT_MODE : 'card',
            AMOUNT : 0.10
        }

        function CardPayment()
        {
            
        }
        function syncSerialPort(req, listAction)
        {
            port = new SerialPort(config.DEVICE, 
            {
                baudRate:config.DEVICE_RATE,
                parser: new SerialPort.parsers.Readline()
            });
        
            port.on('data', (function(config, listAction, line)
            {
                config.lastReceive = line.toString();
                console.log(config.lastReceive)
                port.close(function()
                {
                    console.log(11)
                    if (typeof listAction[line] == 'function')
                    listAction[line](config);
                    else if (listAction['default'])
                    listAction['default'](config);
                    else
                    {
                        console.log(listAction, line);                        
                    }
                    
                })
            }).bind(null, config, listAction));
            port.on('open',(function(req)
            {
                port.write(req);
                data = port.read();
            }).bind(null, req));
            
            port.on('error', function(err){});
            //Make Timeout (serial Port is Busy, process in while, ..., terrorist)
            setTimeout(()=>{port.close()}, 120000); // It's dirty & you can remove this ;)
            return new Promise(function(resolve)
            {
                return port.on("close", resolve)
            });
        }
        function generate_lrc(real_msg_with_etx)
        {
            let lrc = 0, text = real_msg_with_etx.split('');

            for (i in text)
            {
                lrc ^= text[i].charCodeAt(0);
            }
        
            console.log('lrc => ', lrc);
            return lrc;
        }
        function send_eot_signal()
        {
            console.log('Signal EOT sent to terminal');
            listAction = {};
            listAction[String.fromCharCode(5)] = (function(config)
            {
                console.log('ENQ received from terminal');
                send_enq_signal();
            }).bind(null, config); 

            syncSerialPort(String.fromCharCode(4),listAction); //EOT
        }
        function send_enq_signal()
        {
            console.log('Signal ACK sent to terminal');
            listAction = {};
            listAction['default'] = get_answer_from_terminal.bind(null, config)
            syncSerialPort(String.fromCharCode(6),listAction); //ACK
        }
        function get_answer_from_terminal()
        {
            let response = {};
            console.log('Now expecting answer from Terminal');
            console.log(config.lastReceive);
            config.lastReceive = config.lastReceive.substr(1).substr(0, config.lastReceive.length-3);
            
            response = 
            {
                'pos_number'        : config.lastReceive.substr(0, 2),
                'transaction_result': config.lastReceive.charAt(2),
                'amount_msg'        : config.lastReceive.substr(3, 8),
                'payment_mode'      : config.lastReceive.charAt(11),
                'currency_numeric'  : config.lastReceive.substr(12, 3),
                'private'           : config.lastReceive.substr(15, 11)
            };

            console.log('response : ', JSON.stringify(response));

            send_eot_signal();
            setTimeout(() => {port.close()},1000);

            LocalEvent({tag:"response",msg:JSON.stringify(response)});   
            // setTimeout(() => {send_eot_signal()},1000);
        }
        function send_message()
        {
            console.log('Send Message  ...');

            let data = 
            {
                'pos_number': '01',
                'amount_msg': ('0000000' + (config.AMOUNT.toFixed(2) * 100).toFixed(0)).substr(-8),
                'answer_flag': '0',
                'payment_mode': config.PAYMENT_MODE  == 'check' ? 'C' : '1', 
                'transaction_type': '0',
                'currency_numeric': 978, 
                'private': '          ',
                'delay': 'A010',
                'auto': 'B010'
            };

            msg = Object.keys(data).map( k => data[k] ).join('');
            console.log(msg)
            if (msg.length > 34) return console.log('ERR. : failed data > 34 characters.', msg);
            real_msg_with_etx = msg.concat(String.fromCharCode(3));//ETX
            lrc = generate_lrc(real_msg_with_etx);
            //STX + msg + lrc
            tpe_msg = (String.fromCharCode(2)).concat(real_msg_with_etx).concat(String.fromCharCode(lrc));

            console.log('Real message to send =', msg);
            console.log('Message sent to terminal');

            listAction = {};
            listAction[String.fromCharCode(6)] = ((config)=>
            { 
                console.log('ACK received from terminal'); 
                send_eot_signal();
            }).bind(null, config);

            syncSerialPort(tpe_msg, listAction);
        }
        function transaction_start(pPort,pTutar)
        {
            config.DEVICE = pPort;
            config.AMOUNT = pTutar;
            try 
            {                
                // Init
                console.log('Signal ENQ sent to terminal');
                listAction = {};
                listAction[String.fromCharCode(6)] = (function(config){
                    console.log('ACK received from terminal');
                    send_message();
                }).bind(null, config);
                syncSerialPort(String.fromCharCode(5),listAction);
            } catch (e)
            {
                console.log(e);            
            }
        }
        CardPayment.prototype.transaction_start = transaction_start;
        //#region "EVENT TRIGGER"        
        function LocalEvent(pData)
        {
            EventTrigger('PaymentEvent',pData);
        }
        function EventTrigger(evt, params) 
        {
            if (evt in Listeners) 
            {
                callbacks = Listeners[evt];
                for (var x in callbacks)
                {
                    callbacks[x](params);
                }
            } 
            else
            {
                console.log("No listeners found for " + evt);
            }
        }
        CardPayment.prototype.On = function(evt, callback) 
        {
            if (!Listeners.hasOwnProperty(evt))
                Listeners[evt] = Array();
    
                Listeners[evt].push(callback);      
        }
        CardPayment.prototype.Emit = EventTrigger;
        //#endregion EVENT TRIGGER
        return CardPayment;
    }
)();