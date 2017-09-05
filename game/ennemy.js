
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
    constructor(x,y,target,firerate,bulletModifier,bulletModifier2,bulletType,movement,speed,start,duration)
    {
        this.frame = 0;
        if (arguments.length == 4) {
            this.x = x;
            this.y = y;
            this.startFrame = start;
            this.duration = duration
            this.target = target;
            this.fireRate = firerate;
            this.bulletModifier = bulletModifier;
            this.bulletModifier2 = bulletModifier2;
            this.bulletType = bulletType;
            this.movement = movement;
            this.speed = speed;
        }
        else if (arguments.length == 1){
            this.x = (x[0]<<2);
            this.y = (x[1]<<2);
            this.target = (x[2]&0xFD)>>2;
            this.fireRate = x[2]&0x3;
            this.bulletModifier = ((x[3]&0xE0)>>5);
            this.bulletModifier2 = (x[3]&0x1C)>>2;
            this.bulletType = (x[3]&0x3);
            this.movement = (x[4]&0xC0)>>6;
            this.speed = (x[4]&0x30)>>4;
            this.start = (x[4]&0xF)<<12 + x[5]<<2 + ((x[6]&0xC0)>>6);
            this.duration = ((x[6]&0x3F)<<8) + x[7];

            console.log("init"+x[2]+" "+this.target);

            //load from string
        }
        else
        {
            this.x = 0;
            this.y = 0;
            this.target = 0;
            this.fireRate = 0;
            this.bulletModifier = 0;
            this.bulletModifier2 = 0;
            this.bulletType = 0;
            this.movement = 0;
            this.speed = 0;
            this.start = 0;
            this.duration = 0;
        }
    }

    generateArray()
    {
        var a = [];
        console.log(this.target+" test");
        a.push(Math.floor(this.x>>2));
        a.push(Math.floor(this.y>>2));
        a.push(((+this.target)<<2)+(+this.fireRate));
        a.push((this.bulletModifier<<5)+(this.bulletModifier2<<2)+(+this.bulletType));
        a.push((this.movement<<6)+(this.speed<<4)+Math.floor(this.start>>10));
        a.push((this.start&0x3FC)>>2);
        a.push(((this.start&0x3)<<6)+Math.floor(this.duration>>8));
        a.push(this.duration&0xFF);
        return a;
    }
}
class Bullet{
    constructor(x,y,size,type,direction,speed)
    {
        this.x = x;this.y = y;this.type = type;this.direction = direction;
        this.size = size;this.speed = speed;
    }
}

var ennemies = [];
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


function toU8(data){
    var u8_2 = new Uint8Array(atob(data).split("").map(function(c) {
    return c.charCodeAt(0); }));

    return u8_2;
}


function startLevel(custom)
{

    ennemies = [];
    bullets = [];
    var data = toU8(custom);
    for(var i = 0;i<data.length/8;i++)
    {
        ennemies.push(new Ennemy(data.subarray(i*8,i*8+8)));
    }
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



    for(var i = 0;i<ennemies.length;i++)
    {
        var e = ennemies[i];
        e.frame++;
        if(e.frame>e.start && e.frame<(e.start+e.duration))
        {
            var fire = ((e.frame%(72/(e.fireRate+1))) == 0);
            if(fire)
            {
                var targetAngle = [];


        "at the player",
        "rotating",
        "top",
        "left",
        "right",
        "bottom",
        "4 direction where player is",
        "8 direction where player is"
                switch(e.target)
                {
                    case 0:
                        targetAngle.push(Math.atan2(playerY-e.y,playerX-e.x));
                    break;
                    case 1:
                        targetAngle.push(e.frame/72);
                    break;
                    case 2:
                        targetAngle.push(Math.PI*3/2);
                    break;
                    case 3:
                        targetAngle.push(Math.PI);
                    break;
                    case 4:
                        targetAngle.push(0);
                    break;
                    case 5:
                        targetAngle.push(Math.PI/2);
                    break;
                    case 6:
                        var angle = (Math.atan2(playerY-e.y,playerX-e.x)-Math.PI/4+ Math.PI*2)%(Math.PI*2);
                        angle= Math.floor(angle/(Math.PI/2)) * Math.PI/2 + Math.PI/2;
                        targetAngle.push(angle);
                    break;
                    case 7:
                        var angle = (Math.atan2(playerY-e.y,playerX-e.x)-Math.PI*3/8+ Math.PI*2)%(Math.PI*2);
                        angle= Math.floor(angle/(Math.PI/4)) * Math.PI/4 + Math.PI/2;
                        targetAngle.push(angle);
                    break;
                }

                for(var w = 0;w<2;w++)
                {
                    var targetAngle2 = [];
                    Array.prototype.forEach.call(targetAngle, function(target)
                    {
                        switch(w==0?e.bulletModifier:e.bulletModifier2)
                        {
                            case 0:targetAngle2.push(target); break;
                            case 1:
                                for(var a = -0.1;a<0.15;a+=0.1)targetAngle2.push(target+a);
                            break;
                            case 2:
                                for(var a = -0.3;a<0.35;a+=0.3)targetAngle2.push(target+a);
                            break;
                            case 3:
                                for(var a = -0.2;a<0.25;a+=0.1)targetAngle2.push(target+a);
                            break;
                            case 4:
                                for(var a = -0.6;a<0.65;a+=0.3)targetAngle2.push(target+a);
                            break;
                            case 5:
                                for(var a = 0;a<Math.PI+1;a+=Math.PI)targetAngle2.push(target+a);
                            break;
                            case 6:
                                for(var a = 0;a<Math.PI*2;a+=Math.PI/2)targetAngle2.push(target+a);
                            break;
                            case 7:
                                for(var a = 0;a<Math.PI*2;a+=Math.PI/4)targetAngle2.push(target+a);
                            break;
                        }
                    });
                    targetAngle = targetAngle2;
                }
                for(var i = 0;i<targetAngle.length;i++)
                {
                    newBullet(e.x,e.y,5,0,0,targetAngle[i],1.5);
                }
            }
        }
    }

    for(var i = 0;i<bullets.length;i++)
    {
        var b = bullets[i];
        if(b.x<-50 || b.x>1050 || b.y<-50 || b.y>1050)
        {
            bullets.splice(i,1);
            i--;
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
