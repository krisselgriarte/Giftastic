var subjects = ["Ice Cream", "Peppa Pig", "Dancing", "Rabbits", "Fruit", "Books", "Sunday", "Gardening", "BBQ", "Running", "Guitar", "Sun"];


function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < subjects.length; i++) {
        $("#buttons-view").prepend($("<button>").addClass("subject").attr("data-name", subjects[i]).text(subjects[i]));
    }
};

function displayGifs() {
	$(".main").empty();
	$(".main").append($("<img id='loading'>").attr("src", "assets/images/loading.gif"));
	$("#loading").css("display", "block");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).data("name") + "&api_key=9d6eb754f3d144af92264ae108ed718e&limit=10&rating=pg";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response.data);
		var gifArray = response.data;
		console.log(gifArray);
		gifArray.sort(function(a, b) {
    		return parseFloat(a.images.fixed_height.width) - parseFloat(b.images.fixed_height.width);
		});
		console.log(gifArray);
		for (var i = 0; i < gifArray.length; i++) {
			var gifDiv = $("<div class=gifDiv>");
			var gif = $("<img class='gif'>").attr("src", gifArray[i].images.fixed_height.url);
			gif.attr("data-animate", gifArray[i].images.fixed_height.url);
			gif.attr("data-still", gifArray[i].images.fixed_height_still.url);
			gif.data("state", "animate");
			gifDiv.append(gif);
			gifDiv.append($("<p>").text("GIF Rating: " + gifArray[i].rating.toUpperCase()));
			$(".main").append(gifDiv);				
		}
		setTimeout(function() {
				$("#loading").css("display", "none");
				$(".gifDiv").css("display", "block");
			}, 3000);
	});
};

$("#add-subject").on("click", function(event) {
    event.preventDefault();
    var subject = $("#subject-input").val().trim();
    if (subject == "") {
    	return 0;
    } else {
    subjects.push(subject);
    renderButtons();
	}
});

$(document).on("click", ".gif", function() {
      var state = $(this).data("state");
      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).data("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).data("state", "still");
      }
});
$(document).on("click", ".subject", displayGifs);

renderButtons();