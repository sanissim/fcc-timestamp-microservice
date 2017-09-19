// server.js

var http = require("http");
var url = require("url");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var date = "";

function dateParse (input){
  
  var result = {unix: null, natural: null};
  
  if (1*input){
    date = new Date(parseInt(input)*1000)
    result.unix = +input;
    result.natural = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  }

  else if (Date.parse(input)) {
    date = new Date(Date.parse(input));
    result.unix = Date.parse(input)/1000;
    result.natural = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  }
  
  return result
};

http.createServer(function(req, res){
  
  var urlStuff = url.parse(req.url.slice(1), true);
  var timeString = urlStuff.pathname
  
  if(timeString){
    timeString = timeString.replace(/%20/g, " ");
  };
  
  res.end(JSON.stringify(dateParse(timeString)));
  
}).listen(8080);
