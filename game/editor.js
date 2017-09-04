

var editorSelected = 0;
var editorEnnemies = [];

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
        "randomly",
        "at the player",
        "rotating",
        "cone at the player"
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



function editorRefreshEnnemy()
{
    console.log("ok");
}
function editorAddEnnemy()
{
    console.log("pushed");
    editorEnnemies.push(1);
    editorRefreshList();
}

function editorDeleteEnnemy(id)
{
    console.log("delete");
    editorEnnemies.splice(id,1);
    editorRefreshList();
}

function editorDisplay(id)
{

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
    document.getElementById("position").innerHTML=" x:"+x+" y:"+y;
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
