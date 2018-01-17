# LIRI
Language Interpretation and Recognition Interface is command line node app that takes in certain parameters and gives you back data.

## Install 

Retrieving data is possible via requests from the Twitter, Spotify and OMDB APIs for this app. Following Node packages must be installed before using it:

* [Twitter](twitter)
* [Spotify](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)

```
npm install
```
This will install all necessary packages for the app.

## Usage

#### **Javascript**

*Make a separate javascript file to keep all the api keys in.*

```javascript
//Twitter keys  
var twitterKeys = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
};

//Spotify keys
var spotifyKeys = {
    id: '',
    secret: ''
};

//Export the modules for accessibility
module.exports = {
    twitterKeys: twitterKeys,
    spotifyKeys: spotifyKeys
}
```

## Commands
***Twitter***
```
node liri.js my-tweets
```

*This command will list last 20 tweets of a select account.*

***Spotify***
```
node liri.js spotify-this-song '<song name>'
```

*This command will list some information about a song. If the info is not available, 'Ace of Base - The Sign' is the song to be displayed.*

***OMDB***

```
node liri.js movie-this '<movie name>'
```

*This command will list some information about a movie. If the info is not available, 'Mr. Nobody' is the movie to be displayed.*

```
node liri.js do-what-it-says
```

*This command will read a text file, and display data based on the parameters saved in this text file.*