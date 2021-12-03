const {nextISSTimesForMyLocation} = require("./iss_promised");

const PrintISSTimes = function(passTimes){
  
  for (const time of passTimes){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
} 


nextISSTimesForMyLocation()
  .then((passTimes) => {
    PrintISSTimes(passTimes);
  })
  .catch((error) => {
    console.log ("It didn't work: ", error.message);
  });