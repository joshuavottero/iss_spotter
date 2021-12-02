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
  console.log(ip);
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
    console.log(error);
    console.log(Htmlbody);
    if (Htmlbody["latitude"] && Htmlbody["longitude"]) {
      coords["latitude"] = Htmlbody["latitude"];
      coords["longitude"] = Htmlbody["longitude"];
      return callback(null, coords);
    } else {
      return callback("no ip found", null);
    }
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };