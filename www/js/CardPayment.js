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
        let Ack = false;
        let port = null;
        let OneShoot = false;

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
        
        function transaction_start(pPort,pTutar)
        {
            config.DEVICE = pPort;
            config.AMOUNT = pTutar;
            Ack = false;
            
            if(port == null)
            {
                port = new SerialPort(config.DEVICE);
                port.on('data',(data)=> 
                {    
                    if(String.fromCharCode(data[0]) == String.fromCharCode(6))
                    {
                        if(Ack == false)
                        {
                            OneShoot = false;
                            let TmpData = 
                            {
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
                    
                            msg = Object.keys(TmpData).map( k => TmpData[k] ).join('');
                            if (msg.length > 34) return console.log('ERR. : failed data > 34 characters.', msg);
                            real_msg_with_etx = msg.concat(String.fromCharCode(3));//ETX
                            
                            lrc = generate_lrc(real_msg_with_etx);
                            //STX + msg + lrc
                            tpe_msg = (String.fromCharCode(2)).concat(real_msg_with_etx).concat(String.fromCharCode(lrc));
                            port.write(tpe_msg)
        
                            Ack = true;
                        }      
                    }
                    else if(String.fromCharCode(data[0]) == String.fromCharCode(6))
                    {
                        port.write(String.fromCharCode(4))
                    }
                    else if(String.fromCharCode(data[0]) == String.fromCharCode(5))
                    {
                        port.write(String.fromCharCode(6))
                    }
                    else if(data.length >= 25)
                    {
                        if(OneShoot)
                        {
                            return;
                        }

                        OneShoot = true;
                        let str = "";
                        if(isNaN(data.toString().substr(1)))
                        {
                            str = data.toString().substr(1).substr(0, data.toString().length-3);
                        }
                        else
                        {
                            str = data.toString().substr(0, data.toString().length-3);;
                        }
                        //data.toString().substr(1).substr(0, data.toString().length-3);
                        response = 
                        {
                            'pos_number'        : str.substr(0, 2),
                            'transaction_result': str.charAt(2),
                            'amount_msg'        : str.substr(3, 8),
                            'payment_mode'      : str.charAt(11),
                            'currency_numeric'  : str.substr(12, 3),
                            'private'           : str.substr(15, 11)
                        };
        
                        LocalEvent({tag:"response",msg:JSON.stringify(response)});   
                    }
                    console.log(data.toString())
                })
            }

            port.write(String.fromCharCode(5));
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
