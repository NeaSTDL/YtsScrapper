/******************
/  Routes/root.js /
******************/
var controllers = require('./../../controllers/parser.js');

module.exports = function (app) {
  
	// http://localhost:8000/sites/nyaa [POST] 
  app.get('/site/google/', function (req, res) {
  	console.log("GET request received!");
  	console.log(req.query);

    controllers.parseGoogle(req.query, function(parsedData){
    	res.send(parsedData);
    });
  });

  app.get('/site/yts/', function (req, res) {
  	console.log("GET request received!");
  	console.log(req.query);

    controllers.parseYTS(req.query, function(parsedData){
    	res.send(parsedData);
    });
  });
}