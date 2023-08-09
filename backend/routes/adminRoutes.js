const express=require('express');
const fetchAdmin = require('../middle/fetchdata');
const routes=express.Router();

const {loginAdmin,displayAdmin,insertAdmin}=require('../controllers/adminControllers');

routes.post('/loginAdmin',loginAdmin);
routes.get('/displayAdmin',fetchAdmin,displayAdmin);
routes.post('/insertAdmin',insertAdmin); 

module.exports =routes;