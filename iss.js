const request = require("request");



const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, Response, body) => {
    if (error !== null) {
      return callback(error, null);
    }
    
    if (Response.statusCode !== 200) {
      const msg = `Status Code ${Response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body);
  
    if (ip["ip"]) {
      return callback(null, ip["ip"]);
    } else {
      return callback("no ip found", null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  const url = `https://api.freegeoip.app/json/${ip}?apikey=4fd75430-53c2-11ec-9fea-6195bd3ac7aa`;
  request(url, (error, Response, body) => {
    if (error !== null) {
      return callback(error, null);
    }
    
    if (Response.statusCode !== 200) {
      const msg = `Status Code ${Response.statusCode} when fetching corrdinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const Htmlbody = JSON.parse(body);
    let coords = {};
    //console.log(Htmlbody);
    if (Htmlbody["latitude"] && Htmlbody["longitude"]) {
      coords["latitude"] = Htmlbody["latitude"];
      coords["longitude"] = Htmlbody["longitude"];
      return callback(null, coords);
    } else {
      return callback("no ip found", null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords["latitude"]}&lon=${coords["longitude"]}`;
  request(url, (error, Response, body) => {
    if (error !== null) {
      return callback(error, null);
    }
    
    if (Response.statusCode !== 200) {
      const msg = `Status Code ${Response.statusCode} when fetching corrdinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
      
    }
    //console.log(body["response"]);

    const passes = JSON.parse(body).response;
   
    if (passes) {
      return callback(null, {passes});
    } else {
      return callback("no response found", null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, corrds) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(corrds, (error, times) =>{
        if (error) {
          return callback(error, null);
        }
        callback(null, times);

      });
    });
  });
};






module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };