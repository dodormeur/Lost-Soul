
var storyFrame = 900;

function frameStory()
{
    storyFrame++;
    if(storyFrame>1200)mode = 1;
}


function drawStory()
{
    drawText(50,400,"WHERE AM I?",storyFrame);
    drawText(400,400," Everyone ask the same\nquestion when they arrive",storyFrame-300);
    drawText(50,400,"What are you\ntalking about??",storyFrame-600);
//    drawText(400,400," Everyone ask the same\nquestion when they arrive",storyFrame-300);

}


function initStory()
{
    
}
