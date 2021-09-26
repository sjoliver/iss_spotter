// requires & runs the main fetch function

const { nextISSTimesForMyLocation } = require('./iss');

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

nextISSTimesForMyLocation((error, passTimes) => {

  // error handling
  if (error) {
    return console.log("It didn't work!", error);
  }

  // success, print out the deets!
  passTimesResults(passTimes);
});



// OLD CODE FOR TESTING
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('24.85.237.189', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// fetchISSFlyOverTimes({latitude: '31234', longitude: '-1241'}, (error, times) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", times);
// });
