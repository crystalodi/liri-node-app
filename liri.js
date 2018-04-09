require("dotenv").config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var spotify_module = require("node-spotify-api");
var twitter_module = require("twitter");
var spotify = new spotify_module(keys.spotify);
var client = new twitter_module(keys.twitter);
var nodeArguments = process.argv;
var liriCommand = getLiriCommand();
var liriAction = getLiriAction();
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
  default:
    console.log("invalid command");
}

function getMyTweets() {
  var requestObj = {screen_name: "crystal12351508", count:20}
  client.get("statuses/user_timeline", requestObj).then(function(tweets){
    for(var i = 0; i < tweets.length; i++) {
      console.log("Created At: " + tweets[i]["created_at"]);
      console.log("Tweet: " + tweets[i]["text"]);
      if(i < tweets.length - 1) {
        console.log("-----------------------------------");
      }
    }
  }).catch(function(error){
    if(error) {
      console.log(error);
    }
  })
}

function spotifyThisSong() {
  var searchObj = {
    type: "track",
    query: !liriAction ? "The Sign Ace of Base" : liriAction,
    limit: 1
  }
  spotify.search(searchObj).then(function(response){
    var songInfo = response.tracks.items;
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
    if(error) {
      console.log(error);
    }
  });
}

function getLiriAction() {
  var action = ""
  if(nodeArguments[3]) {
    for(var i = 3; i < nodeArguments.length; i++) {
      action = action + " " + nodeArguments[i];
    }
    action = action.trim();
  }
  return action;
}

function getLiriCommand() {
  var command = nodeArguments[2] ? nodeArguments[2].toLowerCase().trim() : "";
  if(command !== "do-what-it-says") {
    return command;
  }
  var data;
  try {
    data = fs.readFileSync("random.txt", "utf8");
    console.log(data)
    var commandArray = data.split("|");
    console.log(commandArray);
    var randomIndex = Math.floor(Math.random() * commandArray.length);
    var commandNode = commandArray[randomIndex].split(",");
    var command = commandNode[0];
    nodeArguments[2] = commandNode[0];
    nodeArguments[3] = !commandNode[1] ? "" : commandNode[1];
    return command;
  } catch (error) {
    if(error.code) {
      console.log("Error reading file");
    }
  }
}
