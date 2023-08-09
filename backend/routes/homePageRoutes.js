const express=require('express');

const routes=express.Router();

const {searchData}=require('../controllers/homePageControllers');

routes.get('/searchData/:pname',searchData);

module.exports =routes;