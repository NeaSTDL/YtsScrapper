var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
    app = express();

// Load all route configurations
require('./routes')(app);

// Use necessary packages settings
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Run server 
app.listen( config.port , function(){
	console.log('Local server ready and running on http://localhost:' + config.port + '/');
});