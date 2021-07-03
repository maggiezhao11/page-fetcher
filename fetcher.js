const request = require('request');
const fs = require('fs');
let userInput = process.argv.slice(2);
let address = userInput[0];
let path = userInput[1];

const fetcher = function(callback) {
  request(address, function(error, response, body) {
    // inside the request callback ...
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
    // if we get here, all's well and we got the data
    const data = body;
    //console.log("data:", data);
    if (data) {
      callback(data);
    }

  });
};

fetcher(function(result) {
  console.log('fetcher result length', result.length);
  fs.writeFile(path, result, err => {
    //console.log("writing file:")
    if (err) {
      console.error(err);
      return;
    }
  });
});





//console.log(`Downloaded and saved result.length  bytes to ${path}`)