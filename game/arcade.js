
var arcadeLevel;
var arcadeLevelStartingPossible;
var arcadeLevelMany;
var arcadeLevelPossible = [];
var arcadeLevelPerStagePossible = 6;
var arcadeLevelPerStage = 3;

function initArcade()
{
    arcadeLevel = 1;
    arcadeLevelStartingPossible = 0;
    arcadeLevelMany = 6;
    startArcadeLevel();

    arcadeLevelPossible = [
    ]
}
function frameArcade()
{


}

function startArcadeLevel()
{
    var index = arcadeLevelStartingPossible + Math.floor(Math.random()*arcadeLevelMany);
    if(index >= arcadeLevelPossible.length)
    {
        console.log("finished");
        return;
    }
    var string = arcadeLevelPossible[index];
    arcadeLevelPossible.splice(index,1);
    arcadeLevelMany--;
    if(arcadeLevel%arcadeLevelPerStage == 0)
    {
        arcadeLevelStartingPossible+= arcadeLevelMany;
        arcadeLevelMany = arcadeLevelPerStagePossible;
    }
    console.log(string);
}
