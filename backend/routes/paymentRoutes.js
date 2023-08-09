const express=require('express');
const routes=express.Router();


const {placeOrder,verifyToken}=require('../controllers/paymentControllers');

routes.post('/order',placeOrder);
routes.post('/verify',verifyToken);

module.exports =routes;