var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var keys = require("./keys.js");

// Argument variables are declared
var arg_1 = process.argv[2];
var arg_2 = process.argv[3];

// Starts the app
// Takes the first argument and decides which function to call
function startApp() {
	switch (arg_1) {
		case 'spotify-this-song':
			getMusic();
			break;
		case 'my-tweets':
			getTweets();
			break;
		case 'movie-this':
			getMovie();
			break;
		case 'do-what-it-says':
			readRandom();
			break;
	}
}

// Twitter App =========================================
function getTweets() {
	// Initiates an object that holds all the necessary keys
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'BitmezkiBuSevda'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			// Sets the variable "length" which determines how many times the "for loop" works. 
			var length = 0;
			tweets.length > 20 ? length = 20 : length = tweets.length;
		    // Displays 20 or less tweets depending on the availability.
		    for (var i = 0; i < length; i++) {
		   		console.log("Tweet " + (i + 1) + "....Created at: " + tweets[i].created_at);
		   		console.log(tweets[i].text);
		   		console.log("------------------------------------------------------------------------");
		    }
		}
	});
}

// Spotify App =========================================
function getMusic() {
	// Initiates an object that holds all the necessary keys
	var spotify = new Spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
	});
	// If second argument is not available, it is set to a default value
	if (!process.argv[3] || arg_2 === '') {
		arg_2 = 'The sign - ace of base';
	}

	spotify.search({ type: 'track', query: arg_2 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		// If data is availabe, lists them
		if (data.tracks.items.length > 0) {
			for (var i = 0; i < data.tracks.items.length; i++) {
				console.log("Version " + (i + 1) + "--------------------------------------");
				console.log("Artist name: " + data.tracks.items[i].artists[0].name);
				console.log("Song name: " + data.tracks.items[i].name);
				data.tracks.items[i].preview_url === null ? console.log("A preview is not available...") : console.log("Preview link: " + data.tracks.items[i].preview_url);
				console.log("Album name: " + data.tracks.items[i].album.name);
				console.log("-------------------------------------------------------------");
			}
		} else {
			console.log("No such song available...");
		}
	});
}

// OMDB App =============================================
function getMovie() {
	// If second argument is not available, it is set to a default value
	if (!process.argv[3]) {
		arg_2 = 'Mr. Nobody';
	}

	request("http://www.omdbapi.com/?t=" + arg_2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			// Displays info for a selected movie
			JSON.parse(body).Title ? console.log("Title: " + JSON.parse(body).Title) : console.log("Title: Not available...");
			JSON.parse(body).Year ? console.log("Year: " + JSON.parse(body).Year) : console.log("Year: Not available...");
			JSON.parse(body).imdbRating ? console.log("IMDB Rating: " + JSON.parse(body).imdbRating) : console.log("IMDB Rating: Not available...");
			JSON.parse(body).Ratings && JSON.parse(body).Ratings[1] ? console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value) : console.log("Rotten Tomatoes Rating: Not available...");
			JSON.parse(body).Country ? console.log("Countries: " + JSON.parse(body).Country) : console.log("Countries: Not available...");
			JSON.parse(body).Language ? console.log("Languages: " + JSON.parse(body).Language) : console.log("Languages: Not available...");
			JSON.parse(body).Plot ? console.log("Plot: " + JSON.parse(body).Plot) : console.log("Plot: Not available...");
			JSON.parse(body).Actors ? console.log("Actors: " + JSON.parse(body).Actors) : console.log("Actors: Not available...");			
		}
	});
}	

// Do What It Says ===================================
function readRandom() {
	// Reads random.txt file, and assignes the values from the file to the arguments
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log("Error occured: " + err);
		}

		var dataArr = data.split(',');

		arg_1 = dataArr[0];
		arg_2 = dataArr[1];
		process.argv[3] = true; 

		startApp();
	})
}

// Start the App here ===================================
startApp();