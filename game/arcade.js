
var arcadeLevel;
var arcadeStage;
var arcadeLevelInStage;
var arcadeLevelPossible = [];
var arcadeLevelPerStage = 3;

function initArcade()
{
    arcadeLevel = 0;
    arcadeStage = 0;
    arcadeLevelInStage = 0;
    playerX = 500;
    playerY = 500;

    arcadeLevelPossible = [
        ["fX0DkAAAYD4=","fX0HkAAAYD4=","cHAbkWAAYD4=","fX0H5gAAYD4=","fX0D5wAAYD4=","Pj4DAAAAYD67uwMAAABgPg=="],
        ["fX0DcAAAYD4=","Pj4DAAAAYD67uwMAAABgPj67AwAAAGA+uz4DAAAAYD4=","fX0H8gAAYD4=","V1cD5WMAYD4=","V1cH4GMAYD4=","fX0H5QMAYD4="],
        ["V1cH5GMAYD4=","fX0HfAAAYD4=","fX0HnwAAYD4=","fX0HnAAAYD4=","fX0HeQAAYD4=","Pj4COAAAYD4+uwLEAABgPrs+AsQAAGA+u7sCxAAAYD4="],
        ["Pj4COGIAYD4+uwLEYgBgPrs+AsRiAGA+u7sCxGIAYD4=","Pj4HxGIAYD67uwfEYgBgPg==","GRkGWGIAYD7h4QbEYgBgPg","fX0H7AIAYD4","fX0HxBkAYD4=","fX0HyxkAYD4="],
        ["fX0HGBsAYD4","fX0H5gAAYD59fQUcEABgPg","Pj4H4GAAYD67uwfgYABgPg","Pj4G82MAYD4=","Pj4DPGMAYD67uwM8YwBgPg==","Pj4DIGMAYD67uwMgYwBgPn19BjwAAGA9"],
        ["Pj4G5GAAYD67uwbkYABgPg","Pj4DjWMAYD4=","fX0Dj3MAYD67uwY8YwBgPg","Pj4CwBIAYD67uwLAEgBgPj67AsASAGA+uz4CwBIAYD4=","Pj4GwGIAYD67uwbAYgBgPj67A8ASAGA","GRkDcAIAYD7h4QNwAgBgPg"],
        ["fX0H5BoAYD4=","GRkGPGIAYD7h4QbkYgBgPg","GRkGXGIAYD7h4QboYgBgPg","V1cH62MAYD4=","fX0HfwAAYD4=","GRkGxGoAYD5kZAZYYgBgPuHhBsRiAGA9"],
        ["fX0HOBsAYD4=","Pj4G7GAAYD67uwbsYABgPg","fX0HfwsAYD4=","Pj4HPAsAYD67uwc8CwBgPg","Pj4HPHsAYD67uwc8GQBgPg","Pj4D8HMAYD67uwOccwBgPg=="]
    ];
    startArcadeLevel();
}
function frameArcade()
{
    if(levelFinished())
    {
        arcadeLevel++;
        arcadeLevelInStage ++;
        startArcadeLevel();
    }
}

function startArcadeLevel()
{
    if(arcadeLevelInStage>arcadeLevelPerStage)
    {
        arcadeLevelInStage = 0;
        arcadeStage ++;
    }
    if(arcadeStage >= arcadeLevelPossible.length)
    {
        alert("well done ! You've beaten the arcade mode ! Each run has different levels, so why not try it again?");
        return;
    }
    var index = Math.floor(Math.random()*arcadeLevelPossible[arcadeStage].length);
    var string = arcadeLevelPossible[arcadeStage][index];
    arcadeLevelPossible[arcadeStage].splice(index,1);
    document.getElementById("levelDisplay").innerHTML ="Level "+arcadeStage+"-"+arcadeLevelInStage+"<br/>seed :"+string;
    startLevel(string);
}
