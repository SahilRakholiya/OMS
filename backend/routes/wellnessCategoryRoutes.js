const express=require('express');
const routes=express.Router();
const fetchAdmin = require('../middle/fetchdata');


const {displayWellnessCategory,insertWellnessCategory,displayWellnessCategoryClient,hideUnhideCategory,updateWellnessCategory,deleteWellnessCategory,searchWellnessCategory}=require('../controllers/wellnessCategoryControllers');

routes.get('/display',fetchAdmin,displayWellnessCategory);
routes.delete('/delete/:id',fetchAdmin,deleteWellnessCategory);
routes.post('/insert',fetchAdmin,insertWellnessCategory);
routes.put('/update/:id',fetchAdmin,updateWellnessCategory);
routes.get('/search/:cat_name',fetchAdmin,searchWellnessCategory);
routes.get('/displayClient',displayWellnessCategoryClient);
routes.put('/toggle/:cat_id',fetchAdmin,hideUnhideCategory);
module.exports =routes;


