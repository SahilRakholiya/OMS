const express=require('express');
const routes=express.Router();


// image insert
const multer=require('multer');
const temp=require('uuid');
const fetchAdmin = require('../middle/fetchdata');

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



const {displaymedicine,insertmedicine,updatemedicine,searchmedicineClient,deletemedicine,displaymedicineClient,hideUnhideProduct,searchmedicine}=require('../controllers/medicineControllers');

routes.get('/display',fetchAdmin,displaymedicine);
routes.delete('/delete/:id',fetchAdmin,deletemedicine);
routes.post('/insert',fetchAdmin,upload.single("user_file"),insertmedicine);
routes.put('/update/:id',fetchAdmin,upload.single("user_file"),updatemedicine);
routes.get('/search/:mname',fetchAdmin,searchmedicine);
routes.put('/toggle/:id',fetchAdmin,hideUnhideProduct);
routes.get('/displayClient',displaymedicineClient);
routes.get('/searchClient/:mname',searchmedicineClient);                                   // .
module.exports =routes;


