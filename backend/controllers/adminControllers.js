const adminModel = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'mymeds@com/m/n/s-2023'

let success = false

exports.loginAdmin = async (req, resp) => {
    try {
        // const uname = req.body.name;
        // const pass = req.body.password;

        const { email, password } = req.body
        let admin = await adminModel.findOne({ email });
        if (!admin) {
            return resp.status(400).send({ message: "admin not found " });
        }
       
        bcrypt.compare(password,admin.password,(err,response)=>{
            if(response)
            {
                const data = {
                    admin: {
                        id: admin.id
                    }
                }
                const id = admin.id
                const authtoken = jwt.sign(data, JWT_SECRET)
                success = true
                resp.json({ success, authtoken, id })
            }
            else{
                success=false
                return resp.status(400).send({success,message:"Password is wrong"});
            }
        })
        
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayAdmin = async (req, resp) => {
    try {

        const admin = await adminModel.find({});
        if (admin == "") {
            success=false
            return resp.status(400).send({ message: "admin not found" });
        }
        resp.status(200).send(admin);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertAdmin = async (req, resp) => {
    try {
        const admin = req.body;
        if(admin.name=="" || admin.email=="" || admin.password=="" ||admin.phone_number=="")
        {   
            success=false;
            return resp.status(400).send({ success, message: "please enter data" });
            
        }
        const admin_search = await adminModel.findOne({ email: admin.email });
        if (admin_search) {
            success = false
            console.log("Email Id already exist ");
            resp.status(400).send({ success, message: "Email Id already exist \n Please Enter another Email Id" });
            return;
        }
        const hashedPassword=bcrypt.hash(admin.password,saltRounds,async(err,hash)=>{
            if(err)
            {
                console.log(err);
                return resp.status(500).send(err);
            }
            console.log(hash);

            
        const newadmin = new adminModel({
            name: admin.name,
            email: admin.email,
            password:hash,
            phone_number: admin.phone_number
        })

        result = await newadmin.save();
        const data = {
            newadmin: {
                id: newadmin.id
            }
        }
        // const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        resp.json({ success,  message:"Data insert"  })

        });
      


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}