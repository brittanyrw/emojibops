$(document).ready(function () {
  // Create a variable for the container to hold the emoji cards.
  var emojiCardContainer = $("#songs");

  // Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
  shuffle(emojiItems);

  // Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
  const showMusic = (emojiItems) => {
    // Create a variable for the emoji cards.
    let emojiCard = "";
    
    for (var i in emojiItems) {
    var featuredArtist = emojiItems[i].featuredArtist.join(', ');
    var artist = emojiItems[i].artist.join(', ')
    
    emojiCard +=
      "<div class='emoji-card'><div class='emoji-card-wrapper'><div class='hint-container'><i class='fas fa-question-circle'></i><p class='hint'><span class='type'>" + emojiItems[i].year +
      "</span></p></div><div class='emoji-images'>" + emojiItems[i].emojiImgs +
      "</div><div class='emoji-card-title hide-card'>";

      if(emojiItems[i].musicVideo){
        emojiCard += "<div class='emoji-card-link'><a href='" + emojiItems[i].musicVideo + "' title='View" + emojiItems[i].title + " Music Video' target='_blank'><i class='fas fa-play-circle'></i></a></div>";
      }
      
      emojiCard += "<div class='title-content'><h3>" + emojiItems[i].title +
      " (" + emojiItems[i].year + ")" + "</h3>";

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

 showMusic(emojiItems);

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

 
  // create a variable to select the dropdown button from the dom
  const dropDown = document.querySelector('.dropdown-menu');

  // Array of all songs genres from spotify's genre list
  let songsGenres = ["alt-rock", "art rock", "alternative", "blues", "children", "classic rock", "dance", "disco", "disney", "edm", "electronics", "emo", "folk", "funk", "garage", "gospel", "goth", "groove", "grunge", "guitar", "hard-rock", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "indie", "indie-pop", "j-pop", "j-rock", "jazz", "k-pop", "latin", "metal", "movies", "opera rock", "punk", "punk-rock", "r-n-b","reggae", "rock", "show-tunes", "singer-songwriter", "soft rock", "soul", "soundtracks", "summer", "techno", "world-music"];

  // craeted a function that loops through available songs genre and append it to the dropdown menu so users can see available songs genre
  const appendGenresToDropDown = (genres) => {
    genres.forEach(items => {
      let dropdownItems = document.createElement('a');
      dropdownItems.classList.add('dropdown-item');
      dropdownItems.innerText = items;

      dropDown.appendChild(dropdownItems);
    })
  }

  // created a function to combine songs genres from the array of songs genres and all songs genres in the data.js file, so that if new songs genre is added to the data.js it will also be available in the dropdown menu
  const getGenres = ((emojiItems) => {
    let tempStore1 = emojiItems.map(items => items.genres);

    let tempStore2 = tempStore1.flat();
    let tempStore3 = [...tempStore2, ...songsGenres];

    songsGenres = [...new Set(tempStore3)];

    appendGenresToDropDown(songsGenres);
  })(emojiItems);

  // craeted a function thats takes in the the selected genre from the dropdown menu and available song genre in the data.js file, then return true if the selected genre match with the genre in the data.js
  const filterItems = (data1, data2) => {
    let change = false;
    data1.forEach(x => {
      if(x === data2) {
        change = true;
      }
    })
    return change

  }
  
  // created a function that filter data.js files and returns only  objects that match with selected genre in the dropdown menu
  const checkForMatch = (text) => {
    if (text == 'All') {
      showMusic(emojiItems);
    } else {
      let filterItem = emojiItems.filter(data => {
        if(filterItems(data.genres, text)) {
          return data;
          
        }
      })
      showMusic(filterItem);
    }

  }

 // listen for an click event to the function that will filter the data.js files
  const options = document.querySelectorAll('.dropdown-item');
  options.forEach(filter => {
    filter.addEventListener('click', () => {
      document.querySelector('.btn').textContent = filter.innerHTML;
      checkForMatch(filter.innerText); 
    })
  })

});


