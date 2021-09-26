const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const passTimesResults = function(passTimes) {

  // loop through array of passover times
  for (const pass of passTimes) {
   
   // new Date(0) creates a new date instance
    const datetime = new Date(0);

    // .setUTCSeconds sets the seconds for a specified date (universal time format)
    datetime.setUTCSeconds(pass.risetime);

    // find the pass duration
    const duration = pass.duration;

    // log results
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

  }

}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimesResults(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })