var Scanner = 
(
    function()
    {
        if(typeof require == 'undefined')
        {
            return Scanner;
        }
        const SerialPort = require('serialport');        
        let Listeners = Object();  

        function Scanner()
        {
            
        }
        function StartScan(pPort)
        {
            if(typeof require != 'undefined')
            {                 
                const port = new SerialPort(pPort)               
                let SerialCount = 0;
                let Barcode = "";

                port.on('data',(data) =>
                {
                    SerialCount++;
                    Barcode = Barcode + data.toString("utf8")

                    if(SerialCount == 2)
                    {
                        if(Barcode.length == 11)
                        {
                            Barcode = Barcode.substring(2,10)
                        }
                        else
                        {
                            Barcode = Barcode.substring(1,14)
                        }
                        
                        LocalEvent(Barcode);   
                        SerialCount = 0;
                        Barcode = "";            
                    }
                })
            }
        }
        //#region "EVENT TRIGGER"        
        function LocalEvent(pData)
        {
            EventTrigger('Scanner',pData);
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
        Scanner.prototype.On = function(evt, callback) 
        {
            if (!Listeners.hasOwnProperty(evt))
                Listeners[evt] = Array();

                Listeners[evt].push(callback);      
        }
        Scanner.prototype.Emit = EventTrigger;
        //#endregion EVENT TRIGGER
        Scanner.prototype.StartScan = StartScan;
        return Scanner;
    }
)();