require("dotenv").config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);
console.log(client);
if(process.argv[2]) {
  var liriCommand = process.argv[2].toLowerCase();
} 
else {
  return console.log("Please provide a command");
}

switch(liriCommand) {
  case "my-tweets":

  break
  case "spotify-this-song":
  
  break
  case "movie-this":
  
  break
  case "do-what-it-says":

  break
  default:
    console.log("invalid command");
}
