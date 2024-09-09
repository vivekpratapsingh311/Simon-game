var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePressed(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  console.log("UCP " + userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
started=false;
level=0;
gamePattern=[];
}

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  var newh1 = "Level " + level;
  $("h1").text(newh1);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  var randomColorId = "#" + randomChosenColor;
  $(randomColorId).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log("GP " + gamePattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressed(currentColor) {
  var buttonClass = "." + currentColor;
  $(buttonClass).addClass("pressed");
  setTimeout(function() {
    $(buttonClass).removeClass("pressed");
  }, 100);
}
