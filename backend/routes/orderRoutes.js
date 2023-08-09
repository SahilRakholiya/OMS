const express=require('express');
const routes=express.Router();
const fetchuser = require('../middle/fetchdata');
const fetchAdmin = require('../middle/fetchdata');

const {insertOrder,displayUserOrder,displayUserAllData,cancelorderDisplay,cancelorder,displayUserOrderdata,displayAllUserOrder,searchorder,dispatchOrder}=require('../controllers/orderControllers');

// For Client side

routes.post('/insert/:userid',insertOrder);
routes.get('/displayOrder/:userid',fetchuser,displayUserOrder);                
routes.get('/displayOrderdata/:orderid',fetchuser,displayUserOrderdata);                
routes.get('/displayOrderAllData/:orderid',fetchAdmin,displayUserAllData);
routes.get('/displayAllUserOrder',fetchAdmin,displayAllUserOrder);
routes.put('/dispatch/:orderid',fetchAdmin,dispatchOrder);
routes.get('/search/:uname',fetchAdmin,searchorder);
routes.put('/cancel/:orderid',fetchuser,cancelorder);
routes.get('/cancelOrderDisplay/:userid',fetchuser,cancelorderDisplay);
module.exports =routes;


