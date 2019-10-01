/**
 * Update page with actual page number (lazy loading)
 * @param {Number} pageNumber Actual page number ( 1 => n )
 */
function goToPageNumber( pageNumber ) {
  //Parse for typing security
  pageNumber = Number.parseInt( pageNumber );
  var myUrl = window.location.href;
  //Does page=XXX exist ?
  if( ! myUrl.match(/page=[0-9]+/) ) {
    //Create it
    myUrl += "?page=" + pageNumber;
  }
  else {
    //Update
    myUrl.replace(/page=[0-9]+/, 'page=' + pageNumber);
  }

  //Push in history to prevent page reloading
  window.history.pushState('page' + pageNumber, 'Page ' + pageNumber, myUrl);

  //Generate pagination and emoji items
  generateEmojiItems( pageNumber );
}

/**
 * Generate pagination and emoji items
 * @param {Number} pageNumber Actual page number ( 1 => n )
 */
function generateEmojiItems( pageNumber ) {
  //Get some vars to generate pagination
  var myItemsPerPage = 30;
  var myMaxPageBetweenActual = 2;
  //Get max page, ceil : 2.5 => 3 
  var myPageMax = Math.ceil( emojiItems.length / myItemsPerPage );

  //Generate pagination
  var myPaginationDom = $("#pagination-container .pagination");
  //Clear pagination item
  myPaginationDom.html("");
  //Make first button, redirect to page 1
  myPaginationDom.append(
    $("<button></button>").append(
      $("<span></span>").text("⯇")
    ).click( function() {
      goToPageNumber(1);
    })
  );

  //Disable button if we are already on that page
  if( pageNumber === 1 ) {
    myPaginationDom.children().first().attr("disabled", "true");
  }

  //Make center button
  for( var i = Math.max( 1, pageNumber - myMaxPageBetweenActual ); i < Math.min( myPageMax + 1, pageNumber + myMaxPageBetweenActual + 1); i++ ) {
    //Display
    var myButton = $("<button></button>").attr("data-page", i ).append(
      $("<span></span>").text(i)
    );
    //Set actual page if needed, so no click event on it
    if( i === pageNumber ) {
      myButton.addClass("active");
    }
    else {
      myButton.click( function() {
        goToPageNumber( $(this).attr("data-page"));
      })
    }

    //Add button to pagination item
    myPaginationDom.append(
      myButton
    );
  }

  //Make last button, redirect to page max
  myPaginationDom.append(
    $("<button></button>").append(
      $("<span></span>").text("⯈")
    ).click( function() {
      goToPageNumber(myPageMax);
    })
  );

  //Disable button if we are on last page
  if( pageNumber === myPageMax ) {
    myPaginationDom.children().last().attr("disabled", "true");
  }

  //Create items to display them. Tip : Array.slice( begin, end )
  var myItems = emojiItems.slice( (pageNumber - 1) * myItemsPerPage,  (pageNumber - 1) * myItemsPerPage + myItemsPerPage);
  createEmojiItems( myItems );
}

/**
 * 
 * @param {*} items Items corresponding to emojiItem that should be display
 */
function createEmojiItems( items ) {
  // Create a variable for the container to hold the emoji cards.
  var emojiCardContainer = $("#songs");
  emojiCardContainer.html("");

  // Create a variable for the emoji cards.
  var emojiCard = "";

  // Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
  for (var i in items) {

    var featuredArtist = items[i].featuredArtist.join(', ');
    var artist = items[i].artist.join(', ')
    
    emojiCard +=
      "<div class='emoji-card'><div class='emoji-card-wrapper'><div class='hint-container'><i class='fas fa-question-circle'></i><p class='hint'><span class='type'>" + items[i].year +
      "</span></p></div><div class='emoji-images'>" + items[i].emojiImgs +
      "</div><div class='emoji-card-title hide-card'>";

      if(items[i].musicVideo){
        emojiCard += "<div class='emoji-card-link'><a href='" + items[i].musicVideo + "' title='View" + items[i].title + " Music Video' target='_blank'><i class='fas fa-play-circle'></i></a></div>";
      }
      
      emojiCard += "<div class='title-content'><h3>" + items[i].title +
      " (" + items[i].year + ")" + "</h3>";

    if(featuredArtist){
      emojiCard += "<div class='artist-ft-container'><h4>" + artist + " ft. " + featuredArtist + "</h4></div>";
      } else {
        emojiCard += "<div class='artist-container'><h4>" + artist + "</h4></div>";
    }  
      
    emojiCard += "</div></div></div></div>";
  }

  // Append the emoji card variable, which has all of the emoji cards to the initial variable we created that was for the container to hold the cards.
  emojiCardContainer.html(emojiCard);

  // Run Twemoji to change all emojis to Twitter emojis.
  twemoji.parse(document.body);
}

$.urlParam = function(name){
	var myResult = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return (myResult !== null && myResult[1] !== undefined ) ? myResult[1] : 0;
}

$(document).ready(function () {

  // Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
  shuffle(emojiItems);
  goToPageNumber( 1 );

  // Add the count of number of shows/movies to the footer.
  $("footer span").append(emojiItems.length);


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

  // Expand the emoji card when clicked to reveal the song name, artist and music video link.
  $("#songs").on("click", ".emoji-images", function () {
    $(this)
      .siblings(".emoji-card-title")
      .toggleClass("hide-card");
  });

  // Display a hint (type ie tv, movie or musical) when hovering over the question mark.
  $("#songs").on("mouseover", ".hint-container", function () {
    $(this)
      .find(".hint")
      .addClass("hint-reveal");
  });

  // Hide hint (type ie tv, movie or musical) when the user stops hovering over the question mark.
  $("#songs").on("mouseleave", ".hint-container", function () {
    $(this)
      .find(".hint")
      .removeClass("hint-reveal");
  });

});

