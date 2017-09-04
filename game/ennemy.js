
/*
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
5 = shooting rotating
*
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
*
var ennemiesType = [6,1,2];
*/
class Ennemy{
    //x or the string representing the Ennemy
    constructor(x,y,type,AI)
    {
        if (arguments.length == 4) {
            this.x = x;this.y = y;this.type = type;this.AI = AI;
            this.frame = 0;
        }
        else {
            //load from string
        }
    }
}
class Bullet{
    constructor(x,y,size,type,direction,speed)
    {
        this.x = x;this.y = y;this.type = type;this.direction = direction;
        this.size = size;this.speed = speed;
    }
}

var ennemies = [new Ennemy(500,500,6,5)];
var bullets = [];
var OUT = -999;
/*
var bulletsX = [];
var bulletsY = [];
var bulletsSize = [];
var bulletsFrame = [];
var bulletsType = [];
var bulletsDirection = [];
var bulletsSpeed = [];
*/



function startLevel(custom)
{
    ennemies = [];
    bullets = [];
}

function newBullet(x,y,size,frame,type,direction,speed)
{
    bullets.push(new Bullet(x,y,size,type,direction,speed))
    /*var p = -1;
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
    else bulletsX[p] = x;bulletsY[p] = y;bulletsSize[p] = size;bulletsFrame[p]= frame;bulletsType[p] = type;bulletsDirection[p] = direction;bulletsSpeed[p] = speed;*/
}
function frameEnnemy()
{


    console.log(bullets.length);
    for(var i = 0;i<ennemies.length;i++)
    {
        var e = ennemies[i];
        e.frame++;
        var targetAngle = -1;
        switch(e.AI)
        {
            case 0:
                if(Math.random()<0.1)targetAngle = (Math.random()*6.28);
            break;
            case 1:
                if((e.frame%20)==0)targetAngle = (Math.atan2(playerY-e.y,playerX-e.x));
            break;
            case 2:
                if((e.frame%20)==0)targetAngle = (Math.random()*6.28);
            break;
            case 3:
                if((e.frame%20)==0)targetAngle = (Math.atan2(playerY-e.y+Math.random()*30-15,playerX-e.x+Math.random()*30-15));
            break;
            case 4:
                if((e.frame%20)==0)targetAngle = (Math.atan2(playerY-e.y,playerX-e.x))+Math.random()*0.6-0.3;
            break;
            case 5:
                if((e.frame%20)==0)targetAngle = e.frame/20;
            break;
        }
            var x =e.x;
            var y =e.y;
        if(targetAngle != -1)
            switch(e.type)
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

    for(var i = 0;i<bullets.length;i++)
    {
        var b = bullets[i];
        if(b.x<-50 || b.x>1050 || b.y<-50 || b.y>1050)
        {
            b.x = OUT;
        }
        else
        {
            if(b.type == 0)
            {
                b.x += Math.cos(b.direction)*b.speed;
                b.y += Math.sin(b.direction)*b.speed;
            }
        }
    }
}


function drawEnnemy()
{
    shadow("blue",10,0,0)
    ctx.strokeStyle = "red";
    ctx.beginPath();
    for(var i = 0;i<bullets.length;i++)
    {
        if(bullets[i].x != OUT)
        {
            ctx.moveTo(bullets[i].x,bullets[i].y);
            ctx.arc(bullets[i].x,bullets[i].y,bullets[i].size,0,Math.PI*2);

        }
    }
    ctx.stroke();
}


function collision(playerX,playerY,playerSize)
{
    var s2 = playerSize*playerSize;

    for(var i = 0;i<bullets.length;i++)
    {
        if(bullets[i].x != OUT)
            if((bullets[i].x-playerX)*(bullets[i].x-playerX) + (bullets[i].y-playerY)*(bullets[i].y-playerY) < s2+bullets[i].size*bullets[i].size)return true;
    }
}
