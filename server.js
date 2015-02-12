//REQUIRES
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require("./lib/models/usersModel.js");
var Client = require("./lib/models/clientsModel.js");

var port = 9999;

var app = express();
var mongoUri = 'mongodb://localhost:27017/clients-users';  //don't need to list port if using default mongoDB port

//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//ENDPOINTS
app.post("/api/users", function(req, res) {
	// User.create(req.body)
	// 	.then(function(response) {
	// 		res.status(200).json(response);
	// 	}, function(error) {
	// 		res.status(418).json(error);
	// 	});
	
	var user = new User(req.body);
	user.save(function(response, err) {
		if(!err) {
			res.status(200).json(user);
		} else {
			res.status(418).json(err);
		};
	});
});

app.get("/api/users", function(req, res) {
	User.find({}, function(err, docs) {
		if(!err) {
			if(docs.length === 0) {
				res.status(404).send("No documents found!!");
			} else {
				res.status(200).json(docs);
			}
		} else {
			res.status(418).json(err);
		};
	});
});

app.post("/api/clients", function(req, res) {
	var client = new Client(req.body);
	client.save(function(response, err) {
		if(!err) {
			res.status(200).json(client);
		} else {
			res.status(418).json(err);
		};
	});
});

app.get("/api/clients", function(req, res) {
	Client.find({}, function(err, docs) {
		if(!err) {
			if(docs.length === 0) {
				res.status(404).send("No documents founc!!");
			} else {
				res.status(200).json(docs);
			}
		} else {
			res.status(418).json(err);
		};
	});
});

mongoose.connect(mongoUri);

mongoose.connection.once('open', function() {
	console.log('Connected to DB at ' + mongoUri);
});

app.listen(port, function() {
	console.log("You're on port " + port);
});
