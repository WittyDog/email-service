'use strict';

const handler = require('../handlers/emails');
const baseurl = '/emails/';

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : baseurl + 'registration',
            config: {
                plugins: {
                    'hapi-io': 'registration'
                } 
            },
            handler: handler.registration
            
        },
        {
            method : 'POST',
            path   : baseurl + 'password-reset',
            config: {
                plugins: {
                    'hapi-io': 'password-reset'
                } 
            },
            handler: handler.password_reset
            
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'emails-routes'
};