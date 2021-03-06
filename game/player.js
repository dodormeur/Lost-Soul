

var playerX=120,playerY=500;
var playerStoryFrame = 0;
var playerTransformation = 0;
var playerHalo = 10;
var playerFrame = 0;
var playerTouched = false;

function framePlayer()
{
    var speed = 2;
    if(keys[CTRL])speed = 1;
    if(keys[UP])playerY-=speed;
    if(keys[DOWN])playerY+=speed;
    if(keys[LEFT])playerX-=speed;
    if(keys[RIGHT])playerX+=speed;
    playerFrame++;
    if(playerX>1000)playerX = 1000;
    if(playerX<0)playerX =0;
    if(playerY>1000)playerY = 1000;
    if(playerY<0)playerY =0;

    if(mode == 0)
    {
        if(playerTransformation && playerHalo<10)playerHalo+=0.2;
        else playerHalo += Math.sin(playerFrame/60)/15;
    }
    if(mode >= 1 && playerHalo>0)
    {
        playerHalo-=0.2;
        playerTransformation = true;
    }

playerTouched = false;
    if(collision(playerX,playerY,5))
    {
        startLevel(levelPlaying);
    }
}
function drawPlayer()
{
    /*ctx.strokeStyle="white"
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(playerX,playerY,5,0,2*Math.PI);
    ctx.stroke();*/

    drawCircleShadow(playerX,playerY,5,4,!playerTouched?"white":"blue",playerHalo,5)

}
