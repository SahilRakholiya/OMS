const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    medicine_name : {
        type:String,
        required:true
    },
    medicine_image:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },hide_status:{
        type:Boolean,
        required:true,
        default:false
    }
},{"versionKey":false});

module.exports = mongoose.model('medicines',medicineSchema);
