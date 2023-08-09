const express=require('express');

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

const {displayBeautyProduct,insertBeautyProduct,displayBeautyProductClient,updateBeautyProduct,hideUnhideProduct,deleteBeautyProduct,searchBeautyProduct,categoryAllProduct,searchCategoryAndProduct}=require('../controllers/beautyProductControllers');

routes.get('/display',fetchAdmin,displayBeautyProduct);
routes.delete('/delete/:id',fetchAdmin,deleteBeautyProduct);
routes.post('/insert',fetchAdmin,upload.single("user_file"),insertBeautyProduct);
routes.put('/update/:id',fetchAdmin,upload.single("user_file"),updateBeautyProduct);
routes.get('/search/:pname',fetchAdmin,searchBeautyProduct);
routes.get('/categoryAllProduct/:catid',categoryAllProduct);
routes.get('/searchCategoryAndProduct/:catid/:pname',searchCategoryAndProduct);
routes.put('/toggle/:id',fetchAdmin,hideUnhideProduct);
routes.get('/displayClient',displayBeautyProductClient);

module.exports =routes;