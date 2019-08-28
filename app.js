// Create a variable for the container to hold the emoji cards.
var emojiCardContainer = document.getElementById("songs");

// Create a variable for the emoji cards.
var emojiCard = "";

// Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
shuffle(emojiItems);

// Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
for (var i in emojiItems) {

  var featuredArtist = emojiItems[i].featuredArtist.join(', ');
  var artist = emojiItems[i].artist.join(', ');

  emojiCard +=
  "<div class='emoji-card'><div class='emoji-images'>" + emojiItems[i].emojiImgs + "</div><div class='emoji-card-title hide-card'><h3>" + emojiItems[i].title + " (" + emojiItems[i].year + ")" + "</h3>";

  if(emojiItems[i].featuredArtist.length > 0){
    emojiCard += "<div class='artist-ft-container'><h4>" + artist + " ft. " + featuredArtist + "</h4></div>"; 
  } else {
    emojiCard += "<div class='artist-container'><h4>" + artist + "</h4></div>";
  }
  
  emojiCard += "</div ></div >";
}

// Append the emoji card variable, which has all of the emoji cards to the initial variable we created that was for the container to hold the cards.
emojiCardContainer.innerHTML = emojiCard;

// Run Twemoji to change all emojis to Twitter emojis.
twemoji.parse(document.body);

// Display movies and show in a random order, the random order will refresh on page reload. This function is used above before the cards are rendered on the page.
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
