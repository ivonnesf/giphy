
var buttons = ["Barak Obama", "George W Bush", "Bill Clinton"];
function renderButtons() {

// Deleting the movies prior to adding new movies
// (this is necessary otherwise we will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of movies
for (var i = 0; i < buttons.length; i++) {
    $("#buttons-view").append(`<button class="buttonsclass" data-name="${buttons[i]}">${buttons[i]}</button>
    `)
}

$(".buttonsclass").on("click", function() {
    $("#gifs-appear-here").text("")
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            $("#gifs-appear-here").append(`<div class= "imagediv"> <p> rating: ${results[i].rating} </p>
            <img class="imagen"  data-still='${results[i].images.fixed_height_still.url}' 
                                 src='${results[i].images.fixed_height_still.url}'
                                 data-animate='${results[i].images.fixed_height.url}'
                                 data-state="still" >
                                 </div>`);  
        }

        $(".imagen").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
         } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
         }
        });
      });
    });
}

$("#add-button").on("click", function(event) {
    event.preventDefault();

    var eachbutton = $("#button-input").val().trim();
    if (eachbutton != ""){
    // The movie from the textbox is then added to our array
    buttons.push(eachbutton);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();}
});

renderButtons();
