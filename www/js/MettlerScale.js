var MettlerScale = 
(
    function()
    {
        if(typeof require == 'undefined')
        {
            return MettlerScale;
        }
        const SerialPort = require('serialport');
        
        function MettlerScale()
        {
           
        }
        function _ScaleSend(pPrice,pCallback)
        {
            let port = new SerialPort("COM2",{baudRate:9600,dataBits:7,parity:'odd',stopBits:1});
            let TmpPrice = parseInt(pPrice * 100).toString().padStart(6,'0');
            //TERAZİYE FİYAT GÖNDERİLİYOR.
            port.write('01' + TmpPrice +'');
            let ReciveBuffer = '';
            //TERAZİDEN DÖNEN DEĞERLERİN OKUNMASI
            port.on('data',line =>
            {                
                //console.log(line.toString());
                //TERAZİDEN ONAY GELDİĞİNDE..
                if(toHex(line.toString()) == "6")
                {
                    port.write('')
                }
                //TERAZİDEN ONAY GELMEDİĞİNDE
                else if(toHex(line.toString()) == "15")
                {
                    //TEKRAR FİYAT GÖNDERİLİYOR.
                    port.write('01' + TmpPrice +'');
                }
                //VALİDASYON İŞLEMİ BAŞLANGIÇ
                if(line.toString().substring(1,3) == "11")
                {
                    //VALİDASYON İÇİN GEREKLİ OLAN RANDOM NUMARA
                    if(line.toString().substring(4,5) == "2")
                    {      
                        //RANDOM NUMARA BİT ÇEVİRİM İŞLEMİ      
                        let cs = ("000" + parseInt(Rol16(0x2C3C, line.toString().substring(5,6)) & 0xFFFF).toString(16)).slice(-4).toString().toUpperCase();
                        let kw = ("000" + parseInt(Ror16(0xFA07, line.toString().substring(6,7)) & 0xFFFF).toString(16)).slice(-4).toString().toUpperCase();
                        let cskw = cs + kw;
                        //VALİDASYON CS VE KW GÖNDERİLİYOR 
                        port.write('10'+ cskw.toString() + '')
                    }
                    else if(line.toString().substring(4,5) == "0")
                    {
                        //VALİDASYON BAŞARISIZ DURUMU
                        //console.log("Validasyon Başarısız");
                        port.write('01' + TmpPrice +'');
                    }
                    else if(line.toString().substring(4,5) == "1")
                    {
                        //VALİDASYON BAŞARILI DURUMU
                        console.log("Validasyon Başarılı");

                        let TmpResult = 
                        {
                            Type: "01",
                            Result :
                            {
                                Msg : "Validasyon Başarılı"
                            }                            
                        }

                        if (typeof pCallback != 'undefined')
                        {
                            pCallback(TmpResult);
                        }
                        
                        port.close();
                    }
                }
                
                //TERAZİ SONUÇ DÖNDÜĞÜNDE
                if(line.toString().substring(1,3) == "02" || ReciveBuffer.substring(1,3) == "02")
                {
                    ReciveBuffer += line.toString()
                    if(ReciveBuffer.length >= 26)
                    {
                        let TmpScale = ReciveBuffer.substring(6,11)
                        let TmpPrice = ReciveBuffer.substring(12,18)
                        let TmpAmount = ReciveBuffer.substring(19,25)
                        
                        let TmpResult = 
                        {
                            Type: "02",
                            Result :
                            {
                                Scale : TmpScale / 1000,
                                Price : TmpPrice / 100,
                                Amount : TmpAmount / 100
                            }
                        }
                        if (typeof pCallback != 'undefined')
                        {
                            pCallback(TmpResult);
                        }

                        ReciveBuffer = '';
                        port.close();
                    }
                }
                // if(ReciveBuffer.substring(1,3) == "02")
                // {
                    
                //     if(ReciveBuffer.length >= 26)
                //     {
                //         console.log(ReciveBuffer)
                //         port.close();
                //     }
                //}
            })
            
            setTimeout(()=>
            { 
                if(port.isOpen)
                {
                    port.close(); 
                }
            }, 20000);

            return new Promise(function(resolve)
            {
                return port.on("close", resolve)
            });
        }
        function toHex(str) 
        {
            var result = '';
            for (var i=0; i<str.length; i++) {
                result += str.charCodeAt(i).toString(16);
            }
            return result;
        }
        function Ror16(pData,pDistance)
        {
            pDistance &= 15;
            pData &= 0xFFFF;
            return (pData >> pDistance) | (pData << (16 - pDistance));
        }
        function Rol16(pData,pDistance)
        {
            pDistance &= 15;
            pData &= 0xFFFF;
            return (pData << pDistance) | (pData >> (16 - pDistance));
        }

        MettlerScale.prototype.ScaleSend = _ScaleSend;
        return MettlerScale;
    }
)();