const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("it didn't work", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);

//   fetchCoordsByIP(ip, (error, coords) => {
//     console.log(error, coords);

//     fetchISSFlyOverTimes(coords, (error, times) => {
//       if (error) {
//         console.log("it didn't work", error);
//         return;
//       }
//       console.log("the times ISS is overhead:", times);
//     });
//   });
  
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if(error){
    return console.log("It didn't work", error);
  }
  for (const time of passTimes["passes"]){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }

});












