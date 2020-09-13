const SerialPort = require('serialport')

let port = new SerialPort("COM2",{baudRate:9600,dataBits:7,parity:'odd',stopBits:1})

port.write('01000001')

port.on('data',line =>
{
    console.log(line.toString())
    if(toHex(line.toString()) == "6")
    {
        port.write('')
    }
    else if(toHex(line.toString()) == "15")
    {
        port.write('01000001')
    }

    if(line.toString().substring(1,3) == "11")
    {
        if(line.toString().substring(4,5) == "2")
        {            
            let cs = ("000" + parseInt(Rol16(0x2C3C, line.toString().substring(5,6)) & 0xFFFF).toString(16)).slice(-4).toString().toUpperCase();
            let kw = ("000" + parseInt(Ror16(0xFA07, line.toString().substring(6,7)) & 0xFFFF).toString(16)).slice(-4).toString().toUpperCase();
            let cskw = cs + kw;

            port.write('10'+ cskw.toString() + '')
        }
        else if(line.toString().substring(4,5) == "0")
        {
            console.log("Validasyon Başarısız");
            port.write('01000001');
        }
        else if(line.toString().substring(4,5) == "1")
        {
            console.log("Validasyon Başarılı");
        }
    }
})
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

