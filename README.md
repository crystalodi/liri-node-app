# Liri Node App
## About
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. This app utilizes the following Node Modules: file system, twitter, node-spotify-api, and request

## Install
* Install the LTS (Latest Stable Release) version of NodeJS from [here](https://nodejs.org/en/download/).

* Clone [this](https://github.com/crystalodi/liri-node-app) repository to your computer

* Navigate to the file directory where you cloned the repository and run the command `npm install` from a terminal window

## How to use
Run liri from another command window using the command `node liri.js <liri-action-here>`

## Commands
* `node liri.js do-what-it-says` Reads from random.txt and extracts a command at random and runs the function associated with it.

* `node liri.js my-tweets` Uses twitter api to retrieve 20 tweets from [this](https://twitter.com/crystal12351508) twitter account.

* `node liri.js spotify-this-song <song title here>` Uses spotify api to retrieve Album Information, Artist Information, Song Preview MP3, and Song Title for the `song title` entered along with the command. If no `song title` has been entered, it will default to the "The Sign" by Ace of Base.

* `node liri.js movie-this <movie title here>` Uses request module and ombd api to retrieve information about `movie title` like Rotten Tomatoes Rating, IMBD rating, Synopsis, Actors, and Filming Location


