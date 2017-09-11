
var storyFrame = 0;
var storyChapter = 0;

function frameStory()
{
    if(mode == 0)storyFrame+=3;
}


function drawStory()
{
    if(mode == 0)
    {

        var text = [];
        var when = [];
        var playerStarter = false;

        switch(storyChapter)
        {
            case 0 :
                text = ["where am i ?","welcome to hell.","Wait... This isn't Diagon Alley?"];
                when = [0,600,1000];
                playerStarter = true;
            break;
            case 1 :
                text = ["This must be a mistake..","    Well kid, i don't care.\nYou're a lost soul. I'm charon.\n      and This is my job","your job kinda sucks"];
                when = [0,600,1800];
                playerStarter = true;
            break;
            case 2 :
                text = ["So you will just try forever?\nEven if I ressurect everytime?"," Well, once you've\nabandonned, I'm done","You underestimate my stubbornness"];
                when = [0,600,1300];
                playerStarter = true;
            break;
            case 3 :
                text = ["        Just give up.\nIt will be easier for everyone","Well, I'm just starting to have fun..\n             So no.","Darn kid"];
                when = [0,600,1800];
                playerStarter = false;
            break;
            case 4 :
                text = ["Could you please give up?\nI need to go to the toilet.","You're already stopping?\nBUt we just started !","Urg... Why is this\nsoul so annoying ??"];
                when = [0,600,1300];
                playerStarter = false;
            break;
            case 5 :
                text = ["So, you wanna send me to my destination?","I can't ! A soul that comes\nin the limbo must stay in it !","So you want me to stay?"];
                when = [0,600,1300];
                playerStarter = true;
            break;
            case 6 :
                text = ["   If I let you go,\nyou won't tell anyone?","hum... Yeah sure.","ok, because I could\n get in trouble..."];
                when = [0,600,1300];
                playerStarter = false;
            break;
            case 7 :
                text = ["Fine, I'll let you go.\nBut don't tell anyone !","Really?","Yeah. I'm tired of you","well, you'll be even more tired of me.","what do you mean?",
                "Inspector soulomon grundy, You're coming\n      with me for corruption and\n    potentially letting a soul escape !","What??? NO ! How ?"];
                when = [0,800,1300,2000,2800,3500,4500];
                playerStarter = false;
            break;
            case 8 :
                text = ["Congratulation !","","   You've finished the story mode !"];
                when = [0,0,500];
                playerStarter = false;
            break;


        }

        for(var i = 0;i<text.length;i++)
        {
            var lining =  text[i].split("\n").length - 0.0;

            if(playerStarter)
            {
                drawText(playerX - (text[i].length+0.0)*8/lining,playerY-60-40*lining,text[i],storyFrame-when[i]);
            }
            else
            {
                ctx.scale(2,2);
                drawText(250 - (text[i].length+0.0)*8/lining,140-40*lining,text[i],storyFrame-when[i]);
                ctx.scale(0.5,0.5);
            }
            playerStarter = !playerStarter;
        }

        if(storyFrame>2500 && storyChapter<7){
            mode = 1;
            var data = [
                "fX0HwgAAMMj6GRZAMQGQPvrhCUAxAyBX+ksCADQHAD76fQQ4MAjwPg==",
                "fX0AQngAYLsMDAXBYwMgfX19HkAABdA+ZGQYgGAH0D4=",
                "fX0GwBAAYJwAAAIAYwHwfX19GIAABdA+",
                "Pj4FOmAAMPoyAAXAUAHwPsj6BcAgAfA+fQAGjAAH0Bl9+geMAAogGQ==",
                "fX0AjgAAYNoAABAoUAJQXQAAFChAAlBd+voccAAIkD4=",
                "AAAAIgAAYJz6AAAiAABgnAD6ACIAAGCc+voAIgAAYJwAABIAUgHwPvoADgBSAfA+AAAFOGAF0D76+gU4YAXQPg==",
                "fX0HcwAAYJx9ABUgAAHwPgB9ESAAAfA+"
            ];
            startLevel(data[storyChapter],false);

        }
        if(storyChapter == 7 && storyFrame>6000)
        {
            storyFrame = 0;
            storyChapter ++;
            mode = 0;
        }

    }
    else {
        if(levelFinished())
        {
            storyFrame = 0;
            storyChapter ++;
            mode = 0;
        }
    }

}


function initStory()
{
    ennemies = [];
    bullets = [];
    playerX = 250;
    playerY = 500;
}

function playerInMiddle()
{
    return playerX < 515 && playerX>485 && playerY<515 && playerY>485;
}
