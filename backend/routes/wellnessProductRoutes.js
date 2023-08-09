const express=require('express');
// const Time=require('Time');
const routes=express.Router();
const fetchAdmin = require('../middle/fetchdata');
// image insert
const multer=require('multer');
const temp=require('uuid');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads");
    },
    filename:function(req,file,cb)
    {
        // cb(null,file.fieldname+"-"+Date.now()+".jpg")
        cb(null, temp.v4()+file.originalname);
    }
});
const upload=multer({storage});

const {displayWellnessProduct,insertWellnessProduct,hideUnhideProduct,displayWellnessProductClient,updateWellnessProduct,deleteWellnessProduct,searchWellnessProduct,categoryAllProduct,searchCategoryAndProduct}=require('../controllers/wellnessProductControllers');

routes.get('/display',fetchAdmin,displayWellnessProduct);
routes.delete('/delete/:id',fetchAdmin,deleteWellnessProduct);
routes.post('/insert',fetchAdmin,upload.single("user_file"),insertWellnessProduct);
routes.put('/update/:id',fetchAdmin,upload.single("user_file"),updateWellnessProduct);
routes.get('/search/:pname',fetchAdmin,searchWellnessProduct);
routes.get('/categoryAllProduct/:catid',categoryAllProduct);
routes.get('/searchCategoryAndProduct/:catid/:pname',searchCategoryAndProduct);
routes.put('/toggle/:id',fetchAdmin,hideUnhideProduct);
routes.get('/displayClient',displayWellnessProductClient);
module.exports =routes;