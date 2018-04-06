require("dotenv").config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var spotify_module = require("node-spotify-api");
var twitter_module = require("twitter");
var spotify = new spotify_module(keys.spotify);
var client = new twitter_module(keys.twitter);
console.log(spotify);
console.log(client)
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
console.log(liriAction.length);
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
  console.log("spotify");
}

function movieThis() {
  console.log("movie");
}

function doWhatItSays() {
  console.log("do");
}

