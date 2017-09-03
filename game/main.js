
//canvas info
var ctx;

var INVERSE_MAX_FPS = 1000 / 60.0;
var frameDelta = 0.0;
var lastUpdate;

var stats;
//0 = story, 1 = play
var mode = 0;

function init()
{
    initText();
    document.getElementById("canvas").width = 1000;
    document.getElementById("canvas").height = 1000;
    ctx = document.getElementById("canvas").getContext('2d');


    lastUpdate  = Date.now();
    render();

    //stats
    var script=document.createElement('script');
    script.onload=function()
    {
        stats=new Stats();
        document.body.appendChild(stats.dom);
    };
    script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
}



function frame()
{
    frameEnnemy();
    framePlayer();
    frameStory();
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


    ctx.clearRect(0,0,1000,1000);
    drawEnnemy();
    drawPlayer();
    drawStory();
    requestAnimationFrame(render);

}


window.onload = function () { init(); }
