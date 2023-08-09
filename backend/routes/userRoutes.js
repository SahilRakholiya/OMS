const express=require('express');
const routes=express.Router();
const fetchuser = require('../middle/fetchdata');
const fetchAdmin = require('../middle/fetchdata');

const {loginuser,displayuser,insertuser,updateuser,deleteuser,searchuser,updateaddress,displayuserdata}=require('../controllers/userControllers');


routes.post('/login',loginuser);
routes.get('/display',fetchAdmin,displayuser);
routes.delete('/delete/:id',deleteuser);
routes.post('/insert',insertuser);
routes.put('/update/:email',updateuser);
routes.get('/search/:email',fetchAdmin,searchuser);
routes.get('/searchdata/:id',fetchuser,displayuserdata);
routes.put('/updateaddress/:id',fetchuser,updateaddress);


module.exports =routes;


