$(document).ready(function(){

var fighters = ["Nate Diaz", "Nick Diaz", "Conor McGregor", "Ronda Rousey", "Jon Jones", "Brock Lesnar", "Uriah Hall"];

function addNewButtons(){

	$("#fighters-view").empty();

	for(var i = 0; i < fighters.length;i++) {
			var buttonChoices = $("<button>");
			buttonChoices.addClass("options btn fighter-name");
			buttonChoices.attr("type", "button");
			buttonChoices.attr("data-name", fighters[i]);
			buttonChoices.attr("id", + i);
			buttonChoices.attr("value", i);
			buttonChoices.text(fighters[i]);
			$("#fighters-view").append(buttonChoices);
		};

}
	$(document).on("click", ".fighter-name", function(){
		var person = $(this).attr("data-name");
		createGifs(person)
	});


	$("#add-fighter").on("click", function(){
		event.preventDefault();

		var newFighter = $("#fighters-input").val().trim();

			fighters.push(newFighter);
			addNewButtons();
	});


function createGifs(searchThis){
console.log(searchThis);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchThis + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.then(function(response){
		console.log(response);
		var results = response.data;
		for(var i = 0; i < results.length; i++){

			var gifsDiv = $("<div>")
			var fighterImage = $("<img>");
				fighterImage.addClass("jif");
				fighterImage.attr("src", results[i].images.fixed_height_still.url);
				fighterImage.attr("data-state", "still");
				fighterImage.attr("data-still", results[i].images.fixed_height_still.url);
				fighterImage.attr("data-animate", results[i].images.fixed_height.url);
				gifsDiv.append(fighterImage);
				$("#gifs-appear-here").prepend(gifsDiv);
		}

	});
}
addNewButtons();
$(document).on("click", ".jif", function(){

	var toggle = $(this).attr("data-state");
	console.log(toggle);
	if (toggle === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
	})

});