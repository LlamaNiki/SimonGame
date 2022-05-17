var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


function startGame(){
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    var started = true;
  }
}

$(document).one("keypress", function() {
startGame()
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  animatePress(userChosenColor);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

document.body.addEventListener("mouseclick", function() {
  audio.play()
})

function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#level-title").text("Level " + level);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function animatePress(currentColor) {

  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
};

function startOver() {
  level = [];
  gamePattern = [];
  started = false;
  startGame();
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    playSound("wrong")
    console.log("wrong");
    $("h1").text("GAME OVER. Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $(document).one("keypress", function() {
        startOver()
        console.log("keypressed");
    });
  }
}
