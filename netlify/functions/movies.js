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
  console.log(moviesFromCsv[0])

  // 🔥 hw6: your recipe and code starts here!
// Get the parameters of year and genre
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

// Loop through movie data... for each one:
// for (let x = 0; x < moviesFromCsv.length; x++) {
// Store each movie from the csv in memory

let movieResults = {
  numResults: 0,
  movies: []
}

// Run a loop to go through movie data
for (let i=0; i < moviesFromCsv.length; i++) {
  // Store each movie in memory
  let movie = moviesFromCsv[i]
  // If movie has no genre or runtime ignore results
  if (movie.genres != `\\N` || movie.runtimeMinutes != `\\N`) {

    } else if (movie.genres == `${genre}` && movie.startYear == `${year}`) {
      
        // Create a new movie object containing:
        let movieInfo = {
          title: movie.primaryTitle,
          yearReleased: movie.startYear,
          genre: movie.genres
          }

        

// Push the movie data object to the final Array
movieResults.push(movieInfo)

// Count the number of results
movieResults.numResults = movieResults.movies.count

      
} else {}

  if (year == undefined || genre == undefined) {
    return {
      statusCode: 418, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Not so fast my friend!` // a string of data
    }
  }
  else {
    
    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(movieResults) // a string of data
    }
  
}
}
}