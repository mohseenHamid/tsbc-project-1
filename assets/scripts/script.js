const omdbKey = "e2bf0e18";

// function to pull data from omdb API for searching
function searchMovieTitles(searchString) {
	const queryURL =
		"http://www.omdbapi.com/?apikey=" + omdbKey + "&s=" + searchString + "*";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		const resultsArray = response.Search;
		const resultsDiv = $("#search-results");
		resultsDiv.empty();
		if (resultsArray) {
			resultsArray.forEach((element) => {
				const movieTitle = $("<button>")
				movieTitle.text(element.Title + " (" + element.Year + ")");
				movieTitle.attr('type', 'button');
				movieTitle.addClass('btn btn-secondary');
				movieTitle.attr('data-movie-title', element.Title);
				movieTitle.attr('data-movie-year', element.Year);
				resultsDiv.append(movieTitle);
			});
		}
	});
}

// function to pull data from omdb API for data of selected movie
function getMovieDetails(movieTitle, movieYear) {
	const queryURL =
		"http://www.omdbapi.com/?apikey=" +
		omdbKey +
		"&plot=full&t=" +
		movieTitle +
		"&y=" +
		movieYear;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
	});
}
// function to get movieDetails from data attributes and load search-result with those details
//  as parameters
function displayMovieData(event){
	const movieTitle = event.target.getAttribute('data-movie-title');
	const movieYear = event.target.getAttribute('data-movie-year');
	window.location.href = "./search-result.html?title=" + movieTitle + "&year=" + movieYear;
	// console.log(movieTitle, movieYear);
}


// function to add keyup handler once document is ready
$(function () {
	$('#movie-input').on('keyup', function (event) {
		// when key is released this function runs grabbing the text that is in the input box
		const textString = $('#movie-input').val();
		// first it checks if more than 2 characters have been typed as 2 or less gives a too many results
		// error from the API
		if (textString.length > 2) {
			// if more than two characters then it calls the searchMovieTitles function
			searchMovieTitles(textString);
		}
	});
	$('#search-results').on('click', displayMovieData);
});

// FUNCTION FOR CELEBNINJA API
function celebNinjaClosure(celebName) {
	celebName = "michael jackson"; // PLACEHOLDER

	function celebNinjaInner() {
		$.ajax({
			method: "GET",
			url: "https://api.celebrityninjas.com/v1/search?name=" + celebName,
			headers: { "X-Api-Key": "+qZ8SEACFRjRVK2XZ9RpgQ==urpaH1jT1cOiYaJ6" },
			contentType: "application/json"
		}).then((result) => {
			console.log(result);
		});
	}
	return celebNinjaInner;
}
let celebNinja = celebNinjaClosure();

function movieSearch(movieName) {
	 
  console.log(movieName);
    
       $.ajax({
         method: "GET",
         url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + movieName,
  
        contentType: "application/json"
       }).then(function (result) {
       console.log(result);
       });
     }

		//  not sure we need this document.ready function apart from for testing
  // $(document).ready(function() {
  //   var movieName = "Avatar"; 
  //    movieSearch(movieName) 
  //   });
    
   // dont think we need movieSearch2 and movieSearch3 
  
    // function movieSearch2(movieName2) {
     
    // console.log(movieName2);
      
    //      $.ajax({
    //        method: "GET",
    //        url: "https://en.wikipedia.org/api/rest_v1/page/summary/%20Pauvre_Pierrot?redirect=true" + movieName2,
    
    //       contentType: "application/json"
    //      }).then(function (result) {
    //      console.log(result);
    //      });
    //    }
    // $(document).ready(function() {
    //   var movieName2 = "Pauvre Perrot"; 
    //    movieSearch2(movieName2) 
    //   });
  
  
    //   function movieSearch3(movieName3) {
     
    //   console.log(movieName3);
        
    //        $.ajax({
    //          method: "GET",
    //          url: "https://en.wikipedia.org/api/rest_v1/page/summary/Tintin?redirect=true" + movieName3,
      
    //         contentType: "application/json"
    //        }).then(function (result) {
    //        console.log(result);
    //        });
    //      }
    //   $(document).ready(function() {
    //     var movieName3 = "Tintin"; 
    //      movieSearch3(movieName3) 
    //     });
  