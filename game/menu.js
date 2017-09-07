var menuFrame = 0;
var menuSelected = 0;
var menuKey = true;

function frameMenu()
{
    menuFrame++;

    var old = menuKey;
    if(keys[UP]){if(menuKey)menuSelected--;menuKey = false}
    else if(keys[DOWN]){if(menuKey)menuSelected++;menuKey = false;}
    else menuKey = true;

    menuSelected = (menuSelected+4)%4;

    if(keys[SPACE])changeMode(menuSelected);
}

function drawMenu()
{

    var titleSize =5;
    var elementSize =2;
    var itemName=["Story","Arcade","Custom","Editor"]
    ctx.save();
    ctx.scale(titleSize,titleSize);
    ctx.strokeStyle = "black"
    drawText(40,20,"Lost Soul",menuFrame,menuFrame+1)
    ctx.restore();
    ctx.save();
    ctx.scale(elementSize,elementSize);
    for(var i = 0;i<4;i++)
    {
        if(i == menuSelected)ctx.strokeStyle = "rgba(255,255,255,"+(Math.sin(menuFrame/40)/8+0.6)+")";
        else ctx.strokeStyle = "black";
        drawText(100,200+i*50,itemName[i],menuFrame,menuFrame+1)
    }
    ctx.restore();
}
