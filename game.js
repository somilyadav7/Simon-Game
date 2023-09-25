var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","green","blue","yellow"];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        //level = level + 1;
        started = true;
    }
    
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * (3-0+1) + 0);
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio1 = new Audio("sounds/" + randomColorChosen + ".mp3");
    audio1.play();
    //console.log("random " + gamePattern);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log("user " + userClickedPattern);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("sucess");
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        console.log("Wrong");
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }