$(document).ready(function() {
  // Create a variable for the container to hold the emoji cards.
  var emojiCardContainer = $('#songs');

  // Create a variable for the emoji cards.
  var emojiCard = '';

  // Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
  shuffle(emojiItems);

  // Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
  for (var i in emojiItems) {
    var featuredArtist = emojiItems[i].featuredArtist.join(', ');
    var artist = emojiItems[i].artist.join(', ');

    emojiCard +=
      "<div class='emoji-card' tabindex='0'><div class='emoji-card-wrapper'><div class='hint-container' tabindex='0'><i class='fas fa-question-circle'></i><p class='hint'><span class='type'>" +
      emojiItems[i].year +
      "</span></p></div><div class='emoji-images'>" +
      emojiItems[i].emojiImgs +
      "</div><div class='emoji-card-title hide-card'>";

    if (emojiItems[i].musicVideo) {
      emojiCard +=
        "<div class='emoji-card-link'><a href='" +
        emojiItems[i].musicVideo +
        "' title='View " +
        emojiItems[i].title +
        " Music Video' target='_blank'><i class='fas fa-play-circle'></i></a></div>";
    }

    emojiCard +=
      "<div class='title-content'><h3>" +
      emojiItems[i].title +
      ' (' +
      emojiItems[i].year +
      ')' +
      '</h3>';

    if (featuredArtist) {
      emojiCard +=
        "<div class='artist-ft-container'><h4>" +
        artist +
        ' ft. ' +
        featuredArtist +
        '</h4></div>';
    } else {
      emojiCard +=
        "<div class='artist-container'><h4>" + artist + '</h4></div>';
    }

    emojiCard += '</div></div></div></div>';
  }

  // Append the emoji card variable, which has all of the emoji cards to the initial variable we created that was for the container to hold the cards.
  emojiCardContainer.html(emojiCard);

  // Run Twemoji to change all emojis to Twitter emojis.
  twemoji.parse(document.body);

  // Add the count of number of songs to the footer.
  $('footer span').append(emojiItems.length);

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
  $('#songs').on('click', '.emoji-images', function() {
    $(this)
      .siblings('.emoji-card-title')
      .toggleClass('hide-card');
    });

    // Display a hint when hovering over the question mark.
    $('#songs').on('mouseover', '.hint-container', function() {
      $(this)
      .find('.hint')
      .addClass('hint-reveal');
    });

  // Expand the emoji card when pressing a key to reveal the song name, artist and music video link.
  $('#songs').on('keypress', '.emoji-card', function(e) {
    $(this)
      .find('.emoji-card-title')
      .toggleClass('hide-card');
    });

  // Display a hint when pressing a key over the question mark.
  $('#songs').on('keypress', '.hint-container', function(e) {
    e.stopPropagation();
    $(this)
      .find('.hint')
      .toggleClass('hint-reveal');
  });

  // Hide hint when the user stops hovering over the question mark.
  $('#songs').on('mouseleave', '.hint-container', function() {
    $(this)
      .find('.hint')
      .removeClass('hint-reveal');
  });
});
