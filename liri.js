var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var authorizationReference = require("./keys.js");
var authorization = authorizationReference.twitterKeys;

var consumer_key = authorization.consumer_key;
var consumer_secret = authorization.consumer_secret;
var access_token_key = authorization.access_token_key;
var access_token_secret = authorization.access_token_secret;

var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

if (process.argv[2] === "my-tweets") {

    var params = {screen_name: 'KatFuetterer'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("TWEET " + i + ": " + tweets[i].text);
            }
        }
    });
}

if (process.argv[2] === "spotify-this-song") {

    var arguments = process.argv;
    var track = [];

    for (var i = 3; i < arguments.length; i++) {
        track.push(arguments[i]);
    }

    spotify.search({ type: 'track', query: track }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
            console.log("TITLE: " + data.tracks.items[0].name);
            console.log("ALBUM NAME: " + data.tracks.items[0].album.name);
            console.log("SPOTIFY URL" + data.tracks.items[0].preview_url);
        }
    });
}

if (process.argv[2] === "movie-this") {

    var arguments = process.argv;
    var movie = [];

    for (var i = 3; i < arguments.length; i++) {
        movie.push(arguments[i]);
    }

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("TITLE: " + JSON.parse(body).Title);
            console.log("YEAR RELEASED: " + JSON.parse(body).Released);
            console.log("IMDB RATING: " + JSON.parse(body).imdbRating);
            console.log("COUNTRY PRODUCED: " + JSON.parse(body).Country);
            console.log("LANGUAGE: " + JSON.parse(body).Language);
            console.log("PLOT: " + JSON.parse(body).Plot);
            console.log("ACTORS: " + JSON.parse(body).Actors);
            console.log("ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[1].Value);
            console.log("ROTTEN TOMATOES URL: " + JSON.parse(body).Ratings[1].Source);
        }
    })
}

if (process.argv[2] === "do-what-it-says") {

}