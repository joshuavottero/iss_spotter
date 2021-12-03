const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("it didn't work", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, coords) => {
    console.log(error, coords);

    fetchISSFlyOverTimes(coords, (error, times) => {
      if (error) {
        console.log("it didn't work", error);
        return;
      }
      console.log("the times ISS is overhead:", times);
    });
  });
  
});












