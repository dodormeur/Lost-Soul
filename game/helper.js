
//keys
var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;
var CTRL = 17;
var keys = [];
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true;}


function shadow(color,blur,offX,offY)
{
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = offX;
    ctx.shadowOffsetY = offY;
}


function drawCircleShadow(x,y,size,width,color,blurPower,quality)
{

    shadow(color,10,0,0);
    ctx.lineWidth = width;
    ctx.strokeStyle="white";
    ctx.beginPath();
    ctx.arc(playerX,playerY,size,0,2*Math.PI);
    ctx.stroke();

    for(var i = 1;i<quality;i++)
    {
        ctx.globalAlpha = 1.0/(i+1);
        ctx.beginPath();
        ctx.arc(playerX,playerY,size+i*blurPower/quality,0,2*Math.PI);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

var pathText = ['M 0 6 L 2 0 L 4 6 L 3 3 L 1 3',
'M 0 6 L 0 0 A 1 1 0 1 1 0 3 A 1.5 1 0 0 1 0 6 L 0 3',
'M 4 6 A 1.2 1 0 1 1 4 0 ',
'M 0 6 L 0 0 A 1 1 0 1 1 0 6 ',
'M 3 6 L 0 6 L 0 3 L 2 3 L 0 3 L 0 0 L 3 0 ',
'M 0 6 L 0 3 L 2 3 L 0 3 L 0 0 L 3 0',
'M 2 4 L 4 4 A 2 3 0 1 1 4 2 ',
"M 0 0 L 0 6 L 0 3 L 3 3 L 3 0 L 3 6 ",
'M 1 6 L 3 6 L 2 6 L 2 0 L 1 0 L 3 0 ',
"M 0 5 C 0 7 2 7 2 5 L 2 1 L 1 1 L 3 1 ",
"M 0 6 L 0 0 L 0 3 L 2 1 L 0 3 L 3 6",
"M 0 0 L 0 6 L 3 6 ",
"M 0 6 L 0 0 L 2 2 L 4 0 L 4 6 ",
"M 0 6 L 0 0 L 4 6 L 4 0 ",
"M 2 6 A 0.5 1 0 1 1 2 0 A 0.5 1 0 1 1 2 6 ",
"M 0 6 L 0 0 A 1.5 1 0 1 1 0 3 ",
"M 3 4 L 4 6 A 1 1 0 1 1 2 1 A 1 1 0 1 1 4 6 ",
"M 0 6 L 0 0 A 1 1 0 1 1 0 3 L 2 6 ",
"M 0 6 C 4 7 4 3 2 3 C 0 3 0 -1 3 0 ",
"M 2 6 L 2 0 L 0 0 L 4 0 ",
"M 0 0 Q 0 6 2 6 Q 4 6 4 0",
"M 0 0 L 2 6 L 4 0",
"M 0 0 L 1 6 L 2 0 L 3 6 L 4 0 ",
"M 0 0 L 4 6 L 2 3 L 0 6 L 4 0 ",
"M 0 0 L 2 3 L 0 6 L 4 0",
"M 0 0 L 4 0 L 0 6 L 4 6 ",
"M 1 0 C 3 0 5 2 3 3 C 1 3.5 2.5 4 2.5 5 "];

var lookupText = "abcdefghijklmnopqrstuvwxyz?"

function initText()
{
    for(var p = 0;p<pathText.length;p++)
    pathText[p] = new Path2D(pathText[p])
}

function drawText(x,y,text,frame)
{
    if(frame<0)return;
    var spacing = 5;
    var timeBetween = 8;
    var timeAlone = 30;
    var timeReading = 150;
    if(frame>text.length*timeBetween*2.5+timeReading)return;

    text = text.toLowerCase();
    ctx.save();
    var scale = 3;
    ctx.lineWidth = 0.8;
    ctx.lineCap="round";
    ctx.lineJoin = 'round';

    ctx.translate(x,y);
    ctx.scale(scale,scale);
    shadow("white",5,0,0)
    for(var i = 0;i<text.length;i++)
    {
        if(frame > i*timeBetween)ctx.globalAlpha = Math.min((frame-i*timeBetween)/timeAlone,1);
        else ctx.globalAlpha = 0;
        if(frame > text.length*timeBetween+timeReading+i*timeBetween)ctx.globalAlpha = Math.max(0,Math.min(1-((frame-(text.length*timeBetween+timeReading+i*timeBetween))/timeAlone),1));

        var c = text.charCodeAt(i);
        var p = 0;
        if(c == "?".charCodeAt(0))p = 26;
        else if(c == " ".charCodeAt(0))p = -1;
        else if(c == "\n".charCodeAt(0))
        {
            p = -1;
            ctx.translate(-spacing*(i+1),12);
        }
        else p = c-"a".charCodeAt(0);

        if(p!= -1)ctx.stroke(pathText[p]);
        ctx.translate(spacing,0);

    }

        ctx.restore();
}
