// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
// Get the parameters of year and genre
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
// Define URL
// let url = `http://localhost:8888/.netlify/functions/movies?year=${year}&genre=${genre}`


// // Fetch the url, wait for a response and store the response in memory
// let response = await fetch(url)

// // Ask for the json formatted response and store it in memory
// let filteredMovies = await response.json()
// Create a new object to hold the movie count and data
let movieResults = {}

// Create an empty array for the movies
movieResults.movies = []


// Loop through movie data... for each one:
for (let x = 0; x < moviesFromCsv.length; x++) {
// Store each movie from the csv in memory
let movie = moviesFromCsv[x]

  // If movie has no genre or runtime ignore results
  if (movie.genres == `\\N` || movie.runtimeMinutes == `\\N`) {

  // Otherwise....
    } else {

// Create a new movie object containing:
let movieInfo = {
    // [Movies] containing the primary title, year released and movie genre
title: movie.primaryTitle,
yearReleased: movie.startYear,
genre: movie.genres

    }
// Push the movie data object to the final Array
movieResults.movies.push(movieInfo)


}
}

// add the number of movie results to the movie results object
movieResults.numResults = movieResults.movies.length

  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 418, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `nopeeeee` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {

    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(movieResults) // a string of data
    }
  }
}