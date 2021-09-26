// contains logic for fetching data from each API endpoint

//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"

const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
  
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const address = JSON.parse(body).ip;
    callback(null, address);
  });
};

// takes in an IP address and returns the latitude and longitude for it

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };
    
    callback(null, coords);
  });
};

//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
//  * Input:
//  *   - An object with keys `latitude` and `longitude`
//  *   - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly over times as an array of objects (null if error). Example:
//  *     [ { risetime: 134564234, duration: 600 }, ... ]


// input: latitude/longitute pair, an altitude, and how many results to return
// output: get same inputs back, a time stamp when the API ran, a success/failure message, list of passes
// each pass has a duration in seconds & a rise time as a unix time stamp

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}lon=${coords.longitude}`, (error, response, body) => {

    // error handling - error present
    if (error) {
      callback(error, null);
      return;
    }

    // error handling - repsonse codes
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    // parse out the response portion of the body
    const passes = JSON.parse(body).response;
    callback(error, passes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 
const nextISSTimesForMyLocation = function(callback) {
  
  
// callback(error, results);
}




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };