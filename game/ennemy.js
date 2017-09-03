

var ennemiesX = [500,100,900];
var ennemiesY = [500,100,900];
var ennemiesFrame = [1,1,1];

/*
AIs :
0 = shooting randomly at random place
1 = shooting continously at the player
2 = shooting continously at random place
3 = shooting continously at a zone near the player
4 = shooting continously at a cone player
*/
var ennemiesAI = [2,4,4];
/*
Type :
0 = shooting simple bullet, speed = 1.5
1 = shooting triple close bullet, speed = 1.5
2 = shooting triple wide bullet, speed = 1.5
3 = shooting 5 close bullet
4 = shooting 5 wide bullet
5 = shooting 2 bullet in opposite direction
6 = shooting 4 bullet in opposite direction
7 = shooting 8 bullet in opposite direction
*/
var ennemiesType = [6,1,2];

var bulletsX = [];
var bulletsY = [];
var bulletsSize = [];
var bulletsFrame = [];
var bulletsType = [];
var bulletsDirection = [];
var bulletsSpeed = [];

var OUT = -999;


function newBullet(x,y,size,frame,type,direction,speed)
{
    var p = -1;
    for(var i = 0;i<bulletsX.length;i++)
    {
        if(bulletsX[i] == OUT)
        {
            p = i;break;
        }
    }

    if(p == -1)
    {
        bulletsX.push(x);bulletsY.push(y);bulletsSize.push(size);bulletsFrame.push(frame);bulletsType.push(type);bulletsDirection.push(direction);bulletsSpeed.push(speed);
    }
    else bulletsX[p] = x;bulletsY[p] = y;bulletsSize[p] = size;bulletsFrame[p]= frame;bulletsType[p] = type;bulletsDirection[p] = direction;bulletsSpeed[p] = speed;
}
function frameEnnemy()
{
    console.log(bulletsX.length)



    for(var i = 0;i<ennemiesX.length;i++)
    {
        ennemiesFrame[i]++;
        var targetAngle = -1;
        switch(ennemiesAI[i])
        {
            case 0:
                if(Math.random()<0.1)targetAngle = (Math.random()*6.28);
            break;
            case 1:
                if((ennemiesFrame[i]%20)==0)targetAngle = (Math.atan2(playerY-ennemiesY[i],playerX-ennemiesX[i]));
            break;
            case 2:
                if((ennemiesFrame[i]%20)==0)targetAngle = (Math.random()*6.28);
            break;
            case 3:
                if((ennemiesFrame[i]%20)==0)targetAngle = (Math.atan2(playerY-ennemiesY[i]+Math.random()*30-15,playerX-ennemiesX[i]+Math.random()*30-15));
            break;
            case 4:
                if((ennemiesFrame[i]%20)==0)targetAngle = (Math.atan2(playerY-ennemiesY[i],playerX-ennemiesX[i]))+Math.random()*0.6-0.3;
            break;
        }
            var x = ennemiesX[i];
            var y = ennemiesY[i];
        if(targetAngle != -1)
            switch(ennemiesType[i])
            {
                case 0 :
                    newBullet(500,500,5,0,0,targetAngle,1.5);break;
                case 1 :
                    for(var a = -0.1;a<0.15;a+=0.1)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 2 :
                    for(var a = -0.3;a<0.35;a+=0.3)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 3 :
                    for(var a = -0.2;a<0.25;a+=0.1)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 4 :
                    for(var a = -0.6;a<0.65;a+=0.3)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 5 :
                    for(var a = 0;a<Math.PI+1;a+=Math.PI)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 6 :
                    for(var a = 0;a<Math.PI*2;a+=Math.PI/2)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
                case 7 :
                    for(var a = 0;a<Math.PI*2;a+=Math.PI/4)newBullet(x,y,5,0,0,targetAngle+a,1.5);
                break;
            }
    }

    for(var i = 0;i<bulletsX.length;i++)
    {
        if(bulletsX[i]<-50 || bulletsX[i]>1050 || bulletsY[i]<-50 || bulletsY[i]>1050)
        {
            bulletsX[i] = OUT;
        }
        else
        {
            if(bulletsType[i] == 0)
            {
                bulletsX[i] += Math.cos(bulletsDirection[i])*bulletsSpeed[i];
                bulletsY[i] += Math.sin(bulletsDirection[i])*bulletsSpeed[i];
            }
        }
    }
}


function drawEnnemy()
{
    shadow("blue",10,0,0)
    ctx.strokeStyle = "red";
    ctx.beginPath();
    for(var i = 0;i<bulletsX.length;i++)
    {
        if(bulletsX[i] != OUT)
        {
            ctx.moveTo(bulletsX[i],bulletsY[i]);
            ctx.arc(bulletsX[i],bulletsY[i],bulletsSize[i],0,Math.PI*2);

        }
    }
    ctx.stroke();
}


function collision(playerX,playerY,playerSize)
{
    var s2 = playerSize*playerSize;

    for(var i = 0;i<bulletsX.length;i++)
    {
        if(bulletsX[i] != OUT)
            if((bulletsX[i]-playerX)*(bulletsX[i]-playerX) + (bulletsY[i]-playerY)*(bulletsY[i]-playerY) < s2+bulletsSize[i]*bulletsSize[i])return true;
    }
}
