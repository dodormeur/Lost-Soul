

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
    var movement = [
        "fixed",
        "go to random point",
        "go to player",
        "erratic move"
    ];
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
    for(var i = 0;i<movement.length;i++)
        s += "<option value="+i+">"+movement[i]+"</option>";
    document.getElementById('movement').innerHTML = s;

    s = "";
    for(var i = 0;i<speed.length;i++)
        s += "<option value="+i+">"+speed[i]+"</option>";
    document.getElementById('speed').innerHTML = s;
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
        console.log("test"+" "+editorEnnemies[i].generateArray());
    }
    editorCode = u8To64(new Uint8Array(temp));
    console.log(temp);
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
    e.x = editorX;
    e.y = editorY;
    e.target = g("target").value;
    e.bulletModifier = g("firstMult").value;
    e.bulletModifier2 = g("secondMult").value;
    e.fireRate = g("fireRate").value;
    e.bulletType = g("bulletType").value;
    e.movement = g("movement").value;
    e.speed = g("speed").value;
    e.start = g("start").value;
    e.duration = g("duration").value;

    editorGenerateCode();

}
function editorAddEnnemy()
{
    console.log("pushed");
    editorEnnemies.push(new Ennemy());
    editorRefreshList();
}

function editorDeleteEnnemy(id)
{
    console.log("delete");
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

    editorX = e.x;
    editorY = e.y;
    g("position").innerHTML=" x:"+editorX+" y:"+editorY;
    g("target").value = e.target;
    g("firstMult").value = e.bulletModifier;
    g("secondMult").value = e.bulletModifier2;
    g("fireRate").value = e.fireRate;
    g("bulletType").value = e.bulletType;
    g("movement").value = e.movement;
    g("speed").value = e.speed;
    g("start").value = e.start;
    g("duration").value = e.duration;
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
    var x = Math.floor((e.clientX-canvas.offsetLeft)/canvas.offsetHeight*1000);
    var y = Math.floor((e.clientY-canvas.offsetTop)/canvas.offsetHeight*1000);
    editorX = x;
    editorY = y;
    document.getElementById("position").innerHTML=" x:"+editorX+" y:"+editorY;
    editorRefreshEnnemy();
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
