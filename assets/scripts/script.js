const omdbKey = "e2bf0e18";

// TEST CLOSURE
// function makeFunc(nameInput) {
// 	function displayName() {
// 		console.log(nameInput);
// 	}
// 	return displayName;
// }

// const myFunc = makeFunc("Mohseen");
// myFunc();

// // TEST CLOSURE 2
// function makeAdder(x) {
// 	return function (y) {
// 		return x + y;
// 	};
// }

// const add5 = makeAdder(5);
// const add10 = makeAdder(10);

// console.log(add5(2)); // 7
// console.log(add10(2)); // 12

// FUNCTION FOR CELEBNINJA API
function celebNinjaClosure(celebName) {
	function celebNinjaInner() {
		$.ajax({
			method: "GET",
			url: "https://api.celebrityninjas.com/v1/search?name=" + celebName,
			headers: { "X-Api-Key": "+qZ8SEACFRjRVK2XZ9RpgQ==urpaH1jT1cOiYaJ6" },
			contentType: "application/json"
		}).then((result) => {
			console.log(result[0].name);
			console.log(result[0].birthday);
			console.log(result[0].net_worth);
			console.log(result[0].height);
		});
	}
	return celebNinjaInner;
}

// NEED TO SET THE VALUE OF celebNinjaClosure when assigning it
let celebNinja = celebNinjaClosure("tom hanks");
celebNinja();

// function to pull data from omdb API for searching
function searchMovieTitles(searchString) {
	const queryURL =
		"http://www.omdbapi.com/?apikey=" + omdbKey + "&s=" + searchString + "*";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		const resultsArray = response.Search;
		const resultsMenu = $("#search-menu");
		resultsMenu.empty();
		if (resultsArray) {
			resultsArray.forEach((element) => {
				const movieTitle = $("<a>");
				movieTitle.text(element.Title + " (" + element.Year + ")");
				// movieTitle.attr("type", "button");
				movieTitle.addClass("dropdown-item");
				movieTitle.attr("data-movie-title", element.Title);
				movieTitle.attr("data-movie-year", element.Year);
				resultsMenu.append(movieTitle);
			});
		}
		// }).then(function (response) {
		// 	const resultsArray = response.Search;
		// 	const resultsDiv = $("#search-results");
		// 	resultsDiv.empty();
		// 	if (resultsArray) {
		// 		resultsArray.forEach((element) => {
		// 			const movieTitle = $("<button>");
		// 			movieTitle.text(element.Title + " (" + element.Year + ")");
		// 			movieTitle.attr("type", "button");
		// 			movieTitle.addClass("btn btn-secondary search-item");
		// 			movieTitle.attr("data-movie-title", element.Title);
		// 			movieTitle.attr("data-movie-year", element.Year);
		// 			resultsDiv.append(movieTitle);
		// 		});
		// 	}
	});
}

// function to find actor details from wikipedia
// function actorSearch(actor) {
// 	return Q(
// 		$.ajax({
// 			method: "GET",
// 			url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + actor,
// 			contentType: "application/json"
// 		})
// 	);
// }
// console.log(actorSearch("tom_hanks"));

// function actorSearch(actor, cardNum) {
// 	$.ajax({
// 		method: "GET",
// 		url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + actor,
// 		contentType: "application/json"
// 	}).then(function (result) {
// 		const actorProfile = {
// 			actorName: result.title,
// 			thumbnail: result.thumbnail.source,
// 			bio: result.extract
// 		};

// 		// Extracting card label
// 		let card = `.card-${cardNum}`;
// 		let cardTitle = `.card-title${cardNum}`;
// 		let cardImg = `.card-img-${cardNum}`;

// 		// assign card properties
// 		$(cardTitle).text(`${actorProfile.actorName}`);
// 	});
// }

// let actorProfile = {};

function actorSearch(actor, cardNum) {
	$.ajax({
		method: "GET",
		url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + actor,
		contentType: "application/json"
	}).then(function (result) {
		actorResult = {
			actorName: result.title,
			thumbnail: result.thumbnail.source,
			bio: result.extract
		};
		// Object.assign(actorProfile, actorResult);

		// Extracting card label
		let card = `.card-${cardNum}`;
		let cardTitle = `.card-title-${cardNum}`;
		let cardImg = `.card-img-${cardNum}`;

		// assign card properties
		$(cardImg).attr("src", actorResult.thumbnail);
		$(cardTitle).text(actorResult.actorName);
		// $(cardImg).attr("src", actorProfile.thumbnail);
		// $(cardTitle).text(actorProfile.actorName);

		// click event handler for movie modal cards
		function actorModalOpen(event) {
			event.preventDefault();
			console.log("MODAL OPEN");
			$("#actorModal").modal("show");
			$("#movieSearchModal").modal("hide");

			// add data to actor modal
			$(".name").text(actorResult.actorName);
			$(".more-info").text(actorResult.bio);
		}
		$(card).on("click", actorModalOpen);

		// deals with closing actor modal
		$("#actorModal").on("hide.bs.modal", function () {
			$("#movieSearchModal").modal("show");
		});
	});
}

// function to pull data from omdb API for data of selected movie
function getMovieDetails(movieTitle, movieYear) {
	const movieURL =
		"http://www.omdbapi.com/?apikey=" +
		omdbKey +
		"&plot=full&t=" +
		movieTitle +
		"&y=" +
		movieYear;
	$.ajax({
		url: movieURL,
		method: "GET"
	}).then(function (response) {
		let posterURL = response.Poster;
		let movieTitle = response.Title;
		let movieYear = response.Year;
		let runtime = response.Runtime;
		let moviePlot = response.Plot;
		let movieRatedTag = response.Rated;
		let movieRatings = response.Ratings;
		let actors = response.Actors.split(",");

		// Set movie modal row 1 properties/values
		$("#modal-movie-poster").attr("src", posterURL);
		$(".c2-r1-c1").text(`${movieTitle} (${movieYear})`);
		$(".c2-r1-c2").text(`Rated: ${movieRatedTag}`);
		$(".c2-r1-c3").text(`Runtime: ${runtime}`);
		$(".plot-content").text(`${moviePlot}`);

		let ratingsArrayLength = movieRatings.length;
		for (let i = 1; i < ratingsArrayLength + 1; i++) {
			// Extracting column label
			let column = `.c2-r4-c${i}`;

			// assign column text
			$(column).text(
				`${movieRatings[i - 1].Source}: ${movieRatings[i - 1].Value}`
			);
		}
		// Set movie modal row 2 properties/values using Wiki API
		for (let i = 1; i < 4; i++) {
			actorSearch(actors[i - 1], i);
		}
	});
	// Display modal
	$("#movieSearchModal").modal("show");
}
// function to get movieDetails from data attributes and load search-result with those details
//  as parameters
function goToSearchResult(event) {
	$(".movie-input").val("");
	$("#search-menu").css("display", "none");

	const movieTitle = event.target.getAttribute("data-movie-title");
	const movieYear = event.target.getAttribute("data-movie-year");

	// OMDB API to get the modal row 1 details
	getMovieDetails(movieTitle, movieYear);
}
// function goToSearchResult(event) {
// 	const movieTitle = event.target.getAttribute("data-movie-title");
// 	const movieYear = event.target.getAttribute("data-movie-year");
// 	window.location.href =
// 		"./search-result.html?title=" + movieTitle + "&year=" + movieYear;
// 	// console.log(movieTitle, movieYear);
// 	getMovieDetails(movieTitle, movieYear);
// }

function returnSearchResults(event) {
	// when key is released this function runs grabbing the text that is in the input box
	const textString = $(".movie-input").val();
	// Sets dropdown display default as "none" to solve empty dropdown display bug while API is being called
	$("#search-menu").css("display", "none");

	// first it checks if more than 2 characters have been typed as 2 or less gives too many results
	// error from the API
	if (textString.length > 2 && event.keyCode !== 27) {
		// if more than two characters then it calls the searchMovieTitles function
		searchMovieTitles(textString);

		// Solve bug: code runs before API call is completed
		setTimeout(() => {
			if ($("#search-menu").children().length == 0) {
				$("#search-menu").css("display", "none");
			} else {
				$("#search-menu").css("display", "block");
			}
		}, 500);
	} else if (textString.length < 3) {
		$("#search-menu").empty();
	} else if (event.keyCode == 27) {
		$(this).val("");
		$("#search-menu").empty();
	}
}

// Saving movie to favourites carousel
function saveMovie(e) {
	console.log(e.parent());
}

// Document Ready Event Handlers
$(function () {
	// Keyup event listener for movie search input field
	$(".movie-input").on("keyup", returnSearchResults);

	// Click event listener for movie search menu dropdown item selection
	$("#search-menu").on("click", goToSearchResult);

	// Bug: dropdown menu disappears when selecting search menu items
	// $(".movie-input").on("click", returnSearchResults);
	// $(".movie-input").focusout((e) => {
	// 	if (e.target !== $("#search-menu")) {
	// 		$("#search-menu").css("display", "none");
	// 	} else {
	// 		$("#search-menu").css("display", "block");
	// 	}
	// });

	// WHAT IS THIS? Is this to set the new page URL?
	if (window.location.search !== "") {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const movieTitle = urlParams.get("title");
		const movieYear = urlParams.get("year");
		getMovieDetails(movieTitle, movieYear);
	}

	$("#movie-fav-save-btn").on("click", saveMovie);
});

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
