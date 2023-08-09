const express=require('express');
const routes=express.Router();
const fetchAdmin = require('../middle/fetchdata');
const {countData}=require('../controllers/dashboardControllers');

routes.get('/count',fetchAdmin,countData);

module.exports =routes;