$(document).ready(function () {
    var score = 0;
    var totalScore = 16;

    // Create a variable for the container to hold the emoji cards.
    var emojiCardContainer = $("#songs");

    // Create a variable for the emoji cards.
    var emojiCard = "";

    // Run the random order function below on the data inside data.js. This will display the cards in a random order on the page every time the page is refreshed.
    var quizItems = generateList(emojiItems);

    // Loop through the data from the data.js file and insert parts of the data into HTML. On each loop, we are appending a new card with the HTML below.
    for (var i in quizItems) {
        var featuredArtist = $.makeArray(emojiItems[i].featuredArtist).join(', ');
        var artist = $.makeArray(emojiItems[i].artist).join(', ');

        emojiCard +=
            "<div class='emoji-card'><div class='emoji-card-wrapper'><div class='hint-container'><i class='fas fa-question-circle'></i><p class='hint'><span class='type'>" + emojiItems[i].year +
            "</span></p></div><div class='emoji-images'>" + emojiItems[i].emojiImgs +
            "</div><div class='emoji-card-title hide-card'>";

        if (emojiItems[i].musicVideo) {
            emojiCard += "<div class='emoji-card-link'><a href='" + emojiItems[i].musicVideo + "' title='View " + emojiItems[i].title + " Music Video' target='_blank'><i class='fas fa-play-circle'></i></a></div>";
        }

        emojiCard += "<div class='title-content'><h3>" + emojiItems[i].title + " (" + emojiItems[i].year + ")" + "</h3>";

        if (featuredArtist) {
            emojiCard += "<div class='artist-ft-container'><h4>" + artist + " ft. " + featuredArtist + "</h4></div>";
        } else {
            emojiCard += "<div class='artist-container'><h4>" + artist + "</h4></div>";
        }
        
       emojiCard += "</div></div><input type='text' id=" + i + ">";

        emojiCard += "</div></div></div></div>";
    }

    // Append the emoji card variable, which has all of the emoji cards to the initial variable we created that was for the container to hold the cards.
    emojiCardContainer.html(emojiCard);

    // Run Twemoji to change all emojis to Twitter emojis.
    twemoji.parse(document.body);

    // Add the count of number of songs to the footer.
    $("footer span").append(totalScore);

    function generateList(array) {
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

        return array.slice(0, 16);
    }

    // Display a hint when hovering over the question mark.
    $("#songs").on("mouseover", ".hint-container", function () {
        $(this)
            .find(".hint")
            .addClass("hint-reveal");
    });

    // Hide hint when the user stops hovering over the question mark.
    $("#songs").on("mouseleave", ".hint-container", function () {
        $(this)
            .find(".hint")
            .removeClass("hint-reveal");
    });

    //Checks answers
    $("#submit").click(function () {
        for (var l in quizItems) {
            //changes the  quiz title to lowercase to accurate check if the answer matches
            if($("#" + l).val() === quizItems[l].title.toLowerCase()) {
                //adds 1 to the score and add a checkmark emoji next to the correct answer
                score += 1;
                $("#" + l).val(quizItems[l].title + "✅");
            }
            else {
                //adds a big red "X" emoji next to the wrong answer and also displays the correct answer
                $("#" + l).val(quizItems[l].title + "❌");
            }
        }

        $("footer").html("<span>" + score + '/' + totalScore + "</span>");
        $("footer").append("<p>Refresh the page for a new set of cards</p>");
    })




});