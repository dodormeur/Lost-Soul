

var editorSelected = 0;
var editorEnnemies = [];
var editorX,editorY;
var editorCode;
function generateCode()
{
    document.getElementById("code").innerHTML="temp";
}

function initEditor()
{
    ennemies = [];
    bullets = [];
    document.getElementById("editor").style.display ="flex";
    document.getElementById("canvas").classList.add("canvasEdit");

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
    */



    var targetSystem = [
        "at the player",
        "rotating",
        "top",
        "left",
        "right",
        "bottom",
        "4 direction where player is",
        "8 direction where player is"
    ];

    var firerate = [
        "very slow",
        "slow",
        "medium",
        "fast"
    ];
    var bulletModifier = [
        "simple bullet",
        "triple bullet close",
        "triple bullet wide",
        "5 bullet close",
        "5 bullet wide",
        "2 bullet in opposite direction",
        "4 bullet in opposite direction",
        "8 bullet in opposite direction"
    ];
    var bulletType = [
        "quick and small",
        "quick and big",
        "slow and small",
        "slow and big"
    ];
    var movementTarget = [
        "fixed",
        "go to player",
        "top",
        "left",
        "right",
        "bottom",
        "rectangle centered in 500,500",
        "opposite to the player"
    ];

    var movementType = [
        "straight",
        "sine wave",
        "slow turn"
    ]
    var speed = [
        "slow",
        "normal",
        "fast",
        "very fast"
    ];
    //16 bits + 20 (position) + 14 (start frame) + 14 (duration)  = 64 bits = 8 octet/ennemy


    var s = "";
    for(var i = 0;i<targetSystem.length;i++)
        s += "<option value="+i+">"+targetSystem[i]+"</option>";
    document.getElementById('target').innerHTML = s;

    s = "";
    for(var i = 0;i<bulletModifier.length;i++)
        s += "<option value="+i+">"+bulletModifier[i]+"</option>";
    document.getElementById('firstMult').innerHTML = s;
    document.getElementById('secondMult').innerHTML = s;

    s = "";
    for(var i = 0;i<firerate.length;i++)
        s += "<option value="+i+">"+firerate[i]+"</option>";
    document.getElementById('fireRate').innerHTML = s;

    s = "";
    for(var i = 0;i<bulletType.length;i++)
        s += "<option value="+i+">"+bulletType[i]+"</option>";
    document.getElementById('bulletType').innerHTML = s;
    s = "";
    for(var i = 0;i<movementTarget.length;i++)
        s += "<option value="+i+">"+movementTarget[i]+"</option>";
    document.getElementById('movement').innerHTML = s;

s = "";
for(var i = 0;i<movementType.length;i++)
    s += "<option value="+i+">"+movementType[i]+"</option>";
document.getElementById('movementType').innerHTML = s;


    s = "";
    for(var i = 0;i<speed.length;i++)
        s += "<option value="+i+">"+speed[i]+"</option>";
    document.getElementById('speed').innerHTML = s;

    editorAddEnnemy();
}




function u8To64(data){
    var b64encoded = btoa(String.fromCharCode.apply(null, data));
    return b64encoded;
}



function editorGenerateCode()
{
    var temp = [];
    for(var i = 0;i<editorEnnemies.length;i++)
    {
        temp = temp.concat(editorEnnemies[i].generateArray());
    }
    editorCode = u8To64(new Uint8Array(temp));
    document.getElementById("code").value=editorCode;
}

function editorRefreshEnnemy()
{

    if(editorSelected >= editorEnnemies.length)return;
    /*

        this.x = (x[0]<<2) + ((x[1]&0xC0)>>6);
        this.y = ((x[1]&0x3F)<<4) + ((x[2]&0xF0)>>4);
        this.target = (x[2]&0xC)>>2;
        this.fireRate = x[2]&0x3;
        this.bulletModifier = ((x[3]&0xE)>>5);
        this.bulletModifier2 = (x[3]&0x1C)>>2;
        this.bulletType = (x[3]&0x3);
        this.movement = (x[4]&0xC0)>>6;
        this.speed = (x[4]&0x30)>>4;
        this.start = (x[5]&0xF)<<12 + x[6]<<2 + ((x[7]&0xC0)>>6);
        this.duration = ((x[7]&0x3F)<<8) + x[8];

*/
    var g = function(a){
        return document.getElementById(a);
    }
    var e = editorEnnemies[editorSelected];
    e.x = g("posX").value;
    if(e.x<0)e.x = 0;
    if(e.x>1024)e.x = 1024;
    g("posX").value= e.x;

    e.y = g("posY").value;
    if(e.y<0)e.y = 0;
    if(e.y>1024)e.y = 1024;
    g("posY").value= e.y;

    e.target = g("target").value;
    e.bulletModifier = g("firstMult").value;
    e.bulletModifier2 = g("secondMult").value;
    e.fireRate = g("fireRate").value;
    e.bulletType = g("bulletType").value;
    e.movement = g("movement").value;
    e.movementType = g("movementType").value;
    e.speed = g("speed").value;
    e.start = g("start").value;
    if(e.start<0)e.start = 0;
    if(e.start>Math.pow(2,16)-8)e.start = Math.pow(2,16)-8;
    g("start").value  = e.start;


    e.duration = g("duration").value;
    if(e.duration<0)e.duration = 0;
    if(e.duration>Math.pow(2,16)-8)e.duration = Math.pow(2,16)-8;
    g("duration").value  = e.duration;

    editorGenerateCode();

}
function editorAddEnnemy()
{
    editorEnnemies.push(new Ennemy());
    editorRefreshList();
}

function editorDeleteEnnemy(id)
{
    editorEnnemies.splice(id,1);
    editorSelected = 0;
    editorRefreshEnnemy();
    editorRefreshList();
}


function editorStartLevel()
{
    startLevel(editorCode);
}

function editorDisplay(id) //Display the ennemy with the code
{
    var g = function(a){
        return document.getElementById(a);
    }

    editorSelected = id;
    var e = editorEnnemies[editorSelected];

    g("posX").value = e.x;
    g("posY").value = e.y
    g("target").value = e.target;
    g("firstMult").value = e.bulletModifier;
    g("secondMult").value = e.bulletModifier2;
    g("fireRate").value = e.fireRate;
    g("bulletType").value = e.bulletType;
    g("movement").value = e.movement;
    g("movementType").value = e.movementType;
    g("speed").value = e.speed;
    g("start").value = e.start;
    g("duration").value = e.duration;
}


function editorLoadData()
{
    var custom = document.getElementById("load").value;
    try {
        var data = toU8(custom);
        editorEnnemies =  [];
        for(var i = 0;i<data.length/8;i++)
        {
            editorEnnemies.push(new Ennemy(data.subarray(i*8,i*8+8)));
        }
        editorRefreshList();
        editorDisplay(0);
        editorGenerateCode();
    }catch(e)
    {
        alert("invalid Data. Please check it.")
    }
}

function editorRefreshList()
{
    var string = "";
    for(var i = 0;i<editorEnnemies.length;i++)
        string+= "<li onclick='editorDisplay("+i+")'>Ennemy "+i+"<span onclick='editorDeleteEnnemy("+i+")'>X</span></li>";
document.getElementById("list").innerHTML = string;

}

function editorClickCanvas(e)
{
    editorEnnemies[editorSelected].x = Math.floor((e.clientX-canvas.offsetLeft)/canvas.offsetHeight*1000);
    editorEnnemies[editorSelected].y = Math.floor((e.clientY-canvas.offsetTop)/canvas.offsetHeight*1000);
    editorDisplay(editorSelected);
    /*
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }*
    x -= ;
    y -= canvas.offsetTop;
    console.log(x/canvas.offsetHeight+" "+y/canvas.offsetHeight);*/
}
