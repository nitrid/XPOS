let terminal = require("child_process").spawn(__dirname + "/lib/DevPrint");

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
    terminal.stdin.write(pData + "\n");
    if(typeof pCallback != 'undefined')
    {
        _Once(pCallback)
    }
}
function _Once(pCallback)
{
    terminal.stdout.on('data', function (data) 
    {
        pCallback(data.toString().split('|')[1])
    }); 
}
module.exports = devprint;