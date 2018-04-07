require("dotenv").config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var spotify_module = require("node-spotify-api");
var twitter_module = require("twitter");
var spotify = new spotify_module(keys.spotify);
var client = new twitter_module(keys.twitter);
var nodeArguments = process.argv;
var liriCommand = nodeArguments[2];
var liriAction = "";
//put actions in an array and join on " "
var actionArray = [];
if(nodeArguments[3]) {
  for(var i = 3; i < nodeArguments.length; i++) {
    liriAction = liriAction + " " + nodeArguments[i];
  }
  liriAction = liriAction.trim();
}
if(liriCommand) {
  liriCommand = liriCommand.toLowerCase();
} 
else {
  return console.log("Please provide a command");
}
switch(liriCommand) {
  case "my-tweets":
    getMyTweets();
  break
  case "spotify-this-song":
    spotifyThisSong();
  break
  case "movie-this":
    movieThis();
  break
  case "do-what-it-says":
    doWhatItSays();
  break
  default:
    console.log("invalid command");
}

function getMyTweets() {
  console.log("tweets");
}

function spotifyThisSong() {
  var searchObj = {
    type: 'track',
    query: !liriAction ? "The Sign Ace of Base" : liriAction,
    limit: 1
  }
  spotify.search(searchObj).then(function(response){
    var songInfo = response.tracks.items;
    console.log(JSON.stringify(songInfo, null, 2))
    for(var i = 0; i < songInfo.length; i++) {
      var artists = songInfo[i]["artists"];
      var artistString = "";
      for(var j = 0; j < artists.length; j++) {
        artistString = artistString + " " + artists[j]["name"];
      }
      artistString = artistString.trim()
      console.log("Artist(s): " + artistString);
      console.log("Preview Song: " + songInfo[i]["preview_url"]);
      console.log("Album: " + songInfo[i]["name"])
    }
  }).catch(function(err){
    console.log(err);
  });
}

function movieThis() {
  if(!liriAction) {
    liriAction = "Mr. Nobody";
  }
  var searchTerm = liriAction.replace(/ /g, '+')
  var url = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + keys.ombd;
  request(url, function(error, response, body){
    if(response.statusCode === 200 && !error) {
      var responseBody = JSON.parse(body);
      console.log("Movie Title: " + responseBody.Title);
      console.log("Release Year: " + responseBody.Year);
      console.log("IMBD Rating: " + responseBody.imdbRating);
      var ratingsArray = responseBody.Ratings;
      for(var i = 0; i < ratingsArray.length; i++) {
        if(ratingsArray[i]["Source"] === "Rotten Tomatoes") {
          console.log("Rotten Tomatoes Rating: " + ratingsArray[i]["Value"]);
          break;
        }
      }
      console.log("Country Produced In: " + responseBody.Country);
      console.log("Movie Plot: " + responseBody.Plot);
      console.log("Actors: " + responseBody.Actors);
    }
  });
}

function doWhatItSays() {
  console.log("do");
}

