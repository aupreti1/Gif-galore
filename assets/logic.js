$(document).ready(function () {

    var topics = ["Happy", "Depressed", "Done", "Ugh", "Party", "Lazy", "Confident"];

    function createButton() {
        $("#button").empty();

        for (var i = 0; i < topics.length; i++) {
            var sOption = $("<button>")
            sOption.addClass("mood");
            sOption.attr("data-name", topics[i]);
            sOption.text(topics[i]);
            $("#button").append(sOption);
        }

    }

    function showGifs() {
        $('#images').empty();
        var feels = $(this).attr("data-name");
        var apiKey = "RK2eyilT0dYYyIyoxRqNqqNlLlcPR6qi";
        var limitOf = 10;
        var fullUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + feels + "&limit=" + limitOf + "&offset=0&lang=en";

        //Ajax linked
        $.ajax({
            url: fullUrl,
            method: 'GET'
        }).done(function (response) {
            //checking to see if link is connected 
            console.log(response.data);
            var results = response.data;

            //loop through each gif 
            for (var i = 0; i < results.length; i++) {
                //create div, with class and set to img
                var gifDiv = $("<div class=treats>");
                var showMood = $("<img>");
                //pull the images held in API object
                showMood.attr('src', results[i].images.fixed_height_still.url);
                showMood.attr("data-still", results[i].images.fixed_height_still.url);
                showMood.attr('data-animate', results[i].images.fixed_height.url);
                showMood.attr("data-state", "still");
                //add class to gif image
                showMood.addClass('gif');
                //add to html
                gifDiv.append(showMood)

                //set rating variable 
                var rating = results[i].rating;
                //add p tag, and stor rating in then append to html
                var gifRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(gifRating)

                $("#images").prepend(gifDiv);

            }
        })

    }

    //Animate gif images 
    $(document).on('click', '.gif', function () {

        var state = $(this).attr('data-state');
        //if the image is still, then animate the image src, and change attr state to animate 
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            //otherwise, switch it to still
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })


    //add a new button for gif topic
    $("#submitButton").on("click", function () {
        //store input in var
        var feels = $("#userinput").val().trim();
        //push into topic array
        topics.push(feels)
        //resets the input to empty for new 
        form.reset();
        //call function to create button
        createButton()

        //enter
        return false;
    })


    //PROCESSES 
    //_________________________________________________

    //calling the functions on click

    $(document).on("click", ".mood", showGifs);


    createButton()


})
