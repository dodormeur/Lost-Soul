
//canvas info
var ctx;
var canvas;

var INVERSE_MAX_FPS = 1000 / 60.0;
var frameDelta = 0.0;
var lastUpdate;

var stats;
//0 = story, 1 = play in story, 2 = custom level, 3 = editor,4 = main menu, 5 = arcade
var mode = 4;
var motionBlur = 4;


function initDOMEvent()
{
    var g = function(id)
    {
        return document.getElementById(id);
    }

    g("canvas").addEventListener("click",editorClickCanvas);
    g("formEditor").addEventListener("change",editorRefreshEnnemy);
    g("buttonStart").addEventListener("click",editorStartLevel);
    g("buttonAdd").addEventListener("click",editorAddEnnemy);
    g("buttonLoad").addEventListener("click",editorLoadData);
}
function init()
{

    initDOMEvent();
    initText();
    canvas = document.getElementById("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    ctx = canvas.getContext('2d');


    lastUpdate  = Date.now();
    render();

    changeMode(4);

    //stats
/*
    var script=document.createElement('script');
    script.onload=function()
    {
        stats=new Stats();
        //document.body.appendChild(stats.dom);
    };
    script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
    */
}


function changeMode(which)
{
    switch(which)
    {
        case 0 : initStory();break;
        case 1 : mode = 5;break;
        case 2 :
            var custom = prompt("please enter the level code","Should look like b5cH5GEAbIE=");
            if(custom == null || custom == ""){keys[SPACE] = false;return;}
            else startLevel(custom);
            lastUpdate = Date.now();
        break;
        case 3 : initEditor();break;
        case 4 : startLevel("u7sG5AAAD/8=");playerX = OUT;break;
    }
    mode = which;
}


function frame()
{
    switch(mode)
    {
        case 0:case 1:
            frameStory();
        case 2:case 3:
            frameEnnemy();
            framePlayer();
        break;
        case 4:
            frameMenu();
            frameEnnemy();
        break;

        case 5:
            frameEnnemy();
            framePlayer();
            frameArcade();

        break;
    }
}

function render()
{
    if(stats != undefined)stats.update();
    var now = Date.now();

    frameDelta += now - lastUpdate;
    lastUpdate = now;

    while(frameDelta >= INVERSE_MAX_FPS) {
        frame();
        frameDelta -= INVERSE_MAX_FPS;
    }


    shadow("transparent",0,0,0)
    ctx.fillStyle="rgba(0,0,0,"+1/motionBlur+")"
    ctx.rect(0,0,1000,1000);
    ctx.fill();
    ctx.fillStyle="rgba(0,0,0,1)"
//    ctx.clearRect(0,0,1000,1000);

    switch(mode)
    {
        case 0:case 1:
            drawStory();
        case 2:case 3:
            drawEnnemy();
            drawPlayer();
        break;
        case 4:
            drawEnnemy();
            drawMenu();
        break;
    }
    requestAnimationFrame(render);

}


window.onload = function () { init(); }
