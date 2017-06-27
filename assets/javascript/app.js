// This is adding buttons in HTML //

		$("#adding-subject").on("click", function(event) {
			event.preventDefault();

			var newButton = $("#subject-input").val().trim();
			var oneButton = $("<button>");
			if (newButton == "") {
				return 0;
			} else {oneButton.attr("data-countries", newButton);
					oneButton.text(newButton);
					oneButton.addClass("inputCountry");
					$("#country-button").prepend(oneButton);

			}

			oneButton.attr("data-countries", newButton);
			oneButton.text(newButton);
			oneButton.addClass("inputCountry");
			$("#country-button").prepend(oneButton);

			console.log(newButton);
			console.log(oneButton);
			

		});

///// this will show each GIFs if they click on a country or GIF created//////

  		$(document).on("click", ".inputCountry", function() {
       	 var country = $(this).attr("data-countries");
      		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=6&rating=pg";
      		$("#gifs-show-here").empty();

       	$.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
              var results = response.data;
				console.log(response);

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var countryImage = $("<img class='myCountry'>");
              countryImage.attr("src", results[i].images.fixed_height.url);
              countryImage.attr("data-animate", results[i].images.fixed_height.url);
              countryImage.attr("data-still", results[i].images.fixed_height_still.url);
              countryImage.attr("data-state", "animate");


               gifDiv.prepend(p);
               gifDiv.prepend(countryImage);

              $("#gifs-show-here").append(gifDiv);
          }
        });
      });

///// This is will pause each GIF ///////

  		 	$(document).on("click", ".myCountry", function() {
      		var state = $(this).data("state");
      			if (state === "still") {
        			$(this).attr("src", $(this).attr("data-animate"));
         			 $(this).data("state","animate");
      			} else {
        			$(this).attr("src", $(this).attr("data-still"));
          			$(this).data("state", "still");
      			}
       });
 

