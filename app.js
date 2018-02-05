const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var path = require("path");

/* Middlewares */
app.use(express.static('public'));
app.use('/public', express.static(__dirname + "/public"));
app.use('/photos',express.static(path.join(__dirname, 'public/photos')));
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});

app.post('/contact-form', function (req, res) {
    const body = req.body; // your request body


    var nodemailer = require('nodemailer');

	function sendMail()
	{
		var nodemailer = require('nodemailer');

		var transporter = nodemailer.createTransport({
	    host: process.env.EMAIL_HOST, //Config var stored on heroku
	    port: 587,
	    secure: false, // upgrade later with STARTTLS
	    auth: {
	        user: process.env.EMAIL_USERNAME, //config vars stored on heroku
	        pass: process.env.EMAIL_PW
			}
		});

		const mailOptions = {
		  from: 'sammamishsolar@gmail.com', // sender address
		  to: 'info@solx2.com', // list of receivers
		  subject: 'SOLX2: New Contact Request from: ' + body.email, // Subject line
		  html: '<p>Name: ' + body.name + '<br>' +
		  		'Email: ' + body.email + '<br>'+
		  		'Phone Number: ' + body.phonenumber + '<br>' +
		  		'<br>Message: ' + body.comment + '</p>'// plain text body
		};

		transporter.sendMail(mailOptions, function (err, info) {
		   if(err)
		   {
		   	console.log(err);
		 	 res.redirect(400,'back');
		   }
		     
		   else
		   {
		   	 console.log("SUCCESS");
		 	 res.redirect(202,'back');


		   }

		   
		});
		}

		sendMail();
	});

/* 3, 2, 1, Launch ! */
app.listen(process.env.PORT || 3000, function() {
});