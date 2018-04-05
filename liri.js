require("dotenv").config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var spotify_module = require("node-spotify-api");
var twitter_module = require("twitter");
var spotify = new spotify_module(keys.spotify);
var client = new twitter_module(keys.twitter);

console.log(spotify);
console.log(client);
var liriCommand = process.argv[2]
if(liriCommand) {
  liriCommand = liriCommand.toLowerCase();
} 
else {
  return console.log("Please provide a command");
}

switch(liriCommand) {
  case "my-tweets":
    console.log("tweets");
  break
  case "spotify-this-song":
    console.log("spotify");
  break
  case "movie-this":
    console.log("movie");
  break
  case "do-what-it-says":
    console.log("do");
  break
  default:
    console.log("invalid command");
}
