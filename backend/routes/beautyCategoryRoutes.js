const express=require('express');
const routes=express.Router();
const fetchAdmin = require('../middle/fetchdata');

const {displayBeautyCategory,insertBeautyCategory,updateBeautyCategory,hideUnhideCategory,deleteBeautyCategory,displayBeautyCategoryClient,searchBeautyCategory}=require('../controllers/beautyCategoryControllers');

routes.get('/display',fetchAdmin,displayBeautyCategory);
routes.delete('/delete/:id',fetchAdmin,deleteBeautyCategory);
routes.post('/insert',fetchAdmin,insertBeautyCategory);
routes.put('/update/:id',fetchAdmin,updateBeautyCategory);
routes.get('/search/:cat_name',fetchAdmin,searchBeautyCategory);
routes.put('/toggle/:cat_id',fetchAdmin,hideUnhideCategory);
routes.get('/displayClient',displayBeautyCategoryClient);
module.exports =routes;


