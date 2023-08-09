const express=require('express');
const routes=express.Router();
const fetchuser = require('../middle/fetchdata');
const {displayAllUsercart,searchAllUsercart,displaycart,insertcart,incrementQuantity,decrementQuantity,deletecart,searchcart}=require('../controllers/cartControllers');

// for Admin side

routes.get('/displayAllUsercart',displayAllUsercart);
routes.get('/searchAllUsercart/:pname',searchAllUsercart);
// routes.delete('/delete/:id',deletecart);


// For Client side

routes.get('/display/:userid',fetchuser,displaycart);
routes.post('/insert/:userid',fetchuser,insertcart);
routes.put('/incrementQuantity/:userid/:blockid',fetchuser,incrementQuantity);
routes.put('/decrementQuantity/:userid/:blockid',fetchuser,decrementQuantity);
// routes.put('/update/:id',updatecart);
routes.delete('/delete/:userid/:blockid',fetchuser,deletecart);
routes.get('/search/:userid',fetchuser,searchcart);

module.exports =routes;