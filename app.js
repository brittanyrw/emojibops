$(document).ready(function () {
  // Create a variable for the container to hold the emoji cards.
  var emojiCardContainer = $("#songs");

  // Create a variable for the emoji cards.
  var emojiCard = "";

  // Interval reference for the timing game
  var gameTimer = null;
  // Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
  shuffle(emojiItems);

  // Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
  for (var i in emojiItems) {
    var emojiItem = emojiItems[i];
    emojiCard += createEmojiCard(emojiItem);
  }


  // Append the emoji card variable, which has all of the emoji cards to the initial variable we created that was for the container to hold the cards.
  emojiCardContainer.html(emojiCard);

  // Run Twemoji to change all emojis to Twitter emojis.
  twemoji.parse(document.body);

  // Add the count of number of songs to the footer.
  $("footer span").append(emojiItems.length);


  // Display songs and show in a random order, the random order will refresh on page reload. This function is used above before the cards are rendered on the page.
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Expand the emoji card when clicked to reveal the song name, artist and music video link.
  $("#songs").on("click", ".emoji-images", function () {
    $(this)
      .siblings(".emoji-card-title")
      .toggleClass("hide-card");
  });

  // Display a hint when hovering over the question mark.
  $("#songs, #timedGame").on("mouseover", ".hint-container", function () {
    $(this)
      .find(".hint")
      .addClass("hint-reveal");
  });

  // Hide hint when the user stops hovering over the question mark.
  $("#songs, #timedGame").on("mouseleave", ".hint-container", function () {
    $(this)
      .find(".hint")
      .removeClass("hint-reveal");
  });

  // Start the game when the user clicks on the game anchor
  $(".play-time-game-link").on("click", function () {
    openTimedGame();
  });

  // Close the game and go back to the home screen
  $(".home-link").on("click", function () {
    goHome();
  });

  // Hides all the emoji cards and header and starts the game
  function openTimedGame() {
    $(".heading-content").hide();
    $("#songs").hide();
    $(".play-time-game-link").hide();
    $(".home-link.game-links-item").show();
    startGame();
  }
  // Hides the game and shows all the emoji cards and header
  function goHome() {
    $(".heading-content").show();
    $("#songs").show();
    $(".play-time-game-link").show();
    $(".home-link.game-links-item").hide();
    destroyGame();
  }
  // Clears the game and removes the countdown
  function destroyGame() {
    $("#timedGame .game-container").empty();
    $("#timedGame").hide();
    clearInterval(gameTimer);
    gameTimer = null;
  }

  // Starts the game and starts the countdown
  function startGame() {
    var items = shuffle(emojiItems.slice());
    var timeLimit = 1000 * 60 * 2;
    var currentTime = 0;
    var i = 0;
    var currentItem = items[i];

    updateGameCard(items, i);
    $("#timedGame .timed-game-answer").keyup(function(key) {
      var value = $(this).val();
      if (value.toLowerCase() === currentItem.title.toLowerCase()) {
        i += 1;
        currentItem = items[i];
        updateGameCard(items, i);
        $(this).val('');
      }
    })
  
    $("#timedGame").show();
    updateCountDown(currentTime);

    gameTimer = setInterval(function() {
      currentTime += 1000;
      updateCountDown(currentTime)
      if (currentTime > timeLimit) {
        clearInterval(gameTimer);
        gameTimer = null;
        var score = '<div class="game-final-score">Final score is: ' + i + '</div>';
        $("#timedGame .game-container").html(score);
      }
    }, 1000)
    
    function updateGameCard(items, index) {
      var currentItem = items[index];
      var emojiCard = createEmojiCard(currentItem);
      $("#timedGame .game-container").html(emojiCard);
    }
  
    function updateCountDown(currentTime) {
      var timeLeft = timeLimit - currentTime;
      var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      if (seconds < 10 && seconds >= 0) seconds = '0' + seconds;
      else if (seconds < 0) seconds = '00';
      if (minutes < 10 && minutes >= 0) minutes = '0' + minutes;
      else if (minutes < 0) minutes = '00';
      var time = '<div>Time Left: ' + minutes + ':' + seconds + '</div>';
      $("#timedGame .game-timer").html(time);
    }
  }
  
  function createEmojiCard(emojiItem) {
    var emojiCard = '';
    if (emojiItem) {
      var featuredArtist = emojiItem.featuredArtist.join(', ');
      var artist = emojiItem.artist.join(', ')
      emojiCard +=
        "<div class='emoji-card'><div class='emoji-card-wrapper'><div class='hint-container'><i class='fas fa-question-circle'></i><p class='hint'><span class='type'>" + emojiItem.year +
        "</span></p></div><div class='emoji-images'>" + emojiItem.emojiImgs +
        "</div><div class='emoji-card-title hide-card'>";
  
        if(emojiItem.musicVideo){
          emojiCard += "<div class='emoji-card-link'><a href='" + emojiItem.musicVideo + "' title='View " + emojiItem.title + " Music Video' target='_blank'><i class='fas fa-play-circle'></i></a></div>";
        }
        
        emojiCard += "<div class='title-content'><h3>" + emojiItem.title + " (" + emojiItem.year + ")" + "</h3>";
  
      if (featuredArtist) {
        emojiCard += "<div class='artist-ft-container'><h4>" + artist + " ft. " + featuredArtist + "</h4></div>";
      } else {
        emojiCard += "<div class='artist-container'><h4>" + artist + "</h4></div>";
      }
  
      emojiCard += "</div></div></div></div>";
    }
    return emojiCard;
  }
});
