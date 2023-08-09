const express=require('express');
const routes=express.Router();
const fetchuser = require('../middle/fetchdata');
const fetchAdmin = require('../middle/fetchdata');

const {displayfeedback,insertfeedback,updatefeedback,deletefeedback,searchfeedback}=require('../controllers/feedbackControllers');

routes.get('/display',fetchAdmin,displayfeedback);
routes.delete('/delete/:id',deletefeedback);
routes.post('/insert/:id',fetchuser,insertfeedback);
// routes.put('/update/:email',updatefeedback);
routes.get('/search/:uname',fetchAdmin,searchfeedback);

module.exports =routes;


