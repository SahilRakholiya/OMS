const express = require('express');

const routes = express.Router();

const { optgenerate, dispatchEmail,orderoptgenerate,forgetpassotp } = require('../controllers/emailControllers');

routes.get('/otp/:email', optgenerate);
routes.get('/orderotp/:orderid', orderoptgenerate);
routes.get('/dispatch/:orderid', dispatchEmail);
routes.get('/forgetpassotp/:email', forgetpassotp)
module.exports = routes;