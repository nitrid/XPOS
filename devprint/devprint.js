let proc = require("child_process");
let terminal;
// _Print("{TYPE:'REVIEW',PATH:'C:\\\\Users\\\\A.K.K\\\\Desktop\\\\DevPrint\\\\test.repx',DATA:[{KODU:'001'}]}",function(pData)
// {
//     console.log(pData)
// })
function devprint()
{

}
devprint.prototype.Print = _Print;
function _Print(pData,pCallback)
{
    terminal = proc.spawn(__dirname + "/lib/DevPrint")
    terminal.stdin.write(pData + "\n");
    if(typeof pCallback != 'undefined')
    {
        _Once(pCallback)
    }
}
function _Once(pCallback)
{
    let TmpData = "";
    terminal.stdout.on('data', function (data) 
    {
        TmpData += data.toString();         
    }); 

    terminal.stdout.on('end',function()
    {
        pCallback(TmpData)
    })
}
module.exports = devprint;