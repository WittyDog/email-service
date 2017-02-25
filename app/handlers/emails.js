'use strict';

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    	// This two properties need to be defined in order to test 
        user: 'test@gmail.com',
        pass: 'azerty'
    }
});

let nodemailerOptions = {
    theme: 'default',
    product: {
        name: 'C.R.U.D',
        link: 'http://localhost:8080/users'
    }
};

module.exports.registration = (request,response) => {

	let user = request.payload;

	let mailGenerator = new Mailgen(nodemailerOptions);

	let email = {
	    body: {
	        name	: user.firstname + ' ' + user.lastname,
	        intro	: 'Welcome to C.R.U.D ! We\'re very excited to have you on board.<br><br>' +
	        		  'Your login : ' + user.login + '<br>' +
	        		  'Your password : ' + user.password,
	        action	: {
            			instructions: 'To get started with C.R.U.D, please click here:',
			            button: {
			                color: '#22BC66',
			                text: 'Access to the website',
			                link: 'http://localhost:8080/users'
			            }
        	},
	        outro	: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
	    }
	};


	let mailOptions = {
	    to 		: user.email,
	    subject	: 'Your registration has been successfull',
	    html	: mailGenerator.generate(email)
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        console.log(error);
	        response({status: "ko"});
	    }

	    console.log('Message %s sent: %s', info.messageId, info.response);
	    response({status: "ok"});
	  
	});
    
};

module.exports.password_reset = (request,response) => {

	let user = request.payload;

	let mailGenerator = new Mailgen(nodemailerOptions);

	let email = {
	    body: {
	        name	: user.firstname + ' ' + user.lastname,
	        intro	: 'You have received this email because a password reset request for your account was received. <br><br>' +
					  'Your login :' + user.login + '<br>' +
					  'Your new password : ' + user.password + '<br>',
	        action	: {
            			instructions: 'To access to your informations, please click here:',
			            button: {
			                color: '#22BC66',
			                text: 'Access to my user profile',
			                link: 'http://localhost:8080/users/' + user._id
			            }
        	},
	        outro	: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
	    }
	};


	let mailOptions = {
	    to 		: user.email,
	    subject	: 'Your password has been reset',
	    html	: mailGenerator.generate(email)
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        console.log(error);
	        response({status: "ko"});
	    }

	    console.log('Message %s sent: %s', info.messageId, info.response);
	    response({status: "ok"});
	  
	});
    
};