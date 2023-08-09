const userModel = require('../models/user');
const cartModel = require('../models/cart');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mymeds@com/m/n/s-2023'
const bcrypt = require('bcrypt');
const saltRounds = 10;

let success = false
exports.loginuser = async (req, resp) => {
    try {
        // const uname = req.body.name;
        // const pass = req.body.password;

        const { email, password } = req.body
        let user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(400).send({ message: "User not found " });
        }
        // const user_find = await userModel.findOne({ email, password });
        // if (!user_find) {
        //     return resp.status(400).send({ message: "Please enter correct password" });
        // }
        // console.log(user.password);
        // console.log(password);
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const id = user.id
                const authtoken = jwt.sign(data, JWT_SECRET)
                success = true
                resp.json({ success, authtoken, id })

                
                // bcrypt.hash(authtoken, saltRounds, async (err, hash) => {
                //     if (err) {
                //         console.log(err);
                //         return resp.status(500).send(err);
                //     }
                //     console.log(hash);
                //     success = true
                //     resp.json({ success, hash, id })
                // })
              
            }
            else {
                success = false
                return resp.status(400).send({ success, message: "Password is wrong" });
            }
        })

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayuser = async (req, resp) => {
    try {

        const user = await userModel.find({});
        if (user == "") {
            return resp.status(400).send({ message: "Users not found" });
        }
        resp.status(200).send(user);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}
exports.insertuser = async (req, resp) => {
    try {
        const user = req.body;

        const user_search = await userModel.findOne({ email: user.email });
        if (user_search) {
            success = false
            console.log("Email Id already exist ");
            resp.status(400).send({ success, message: "Email Id already exist \n Please Enter another Email Id" });
            return;
        }
        const hashedPassword = bcrypt.hash(user.password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
                return resp.status(500).send(err);
            }
            console.log(hash);


            const newuser = new userModel({
                name: user.name,
                email: user.email,
                password: hash,
                // otp: user.otp,
                phone_number: user.phone_number,
                address: user.address,
                pincode: user.pincode,
                state: user.state,
                city: user.city
            })

            result = await newuser.save();
            const data = {
                newuser: {
                    id: newuser.id
                }
            }
            // const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            resp.json({ success, message: "Data insert" })
        });



        // userModel.findOne({ name: user.name }, async (err, user_search) => {
        //     if (err) {
        //         console.error(err);
        //         resp.status(500).send(err);
        //         return;
        //     }
        //     if (user_search) {
        //         success = false
        //         console.log("User Name already exist ");
        //         resp.status(400).send({ success, message: "User Name already exist \n Please Enter another User Name" });
        //         return;
        //     }

        // });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}
// updated password
exports.updateuser = async (req, resp) => {
    try {

        const mail = req.params.email;

        const data = req.body

        // if(password=="")
        // {
        //     success=false
        //     return resp.status(404).send({ success, message: "Please enter the password" });
        // }

        let user = await userModel.findOne({ email: mail })
        if (!user) {
            success = false
            return resp.status(404).send({ success, message: "Not Found" })
        }

        const hashedPassword = bcrypt.hash(data.password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
                return resp.status(500).send(err);
            }
            const result = await userModel.updateOne({ _id: user._id }, { $set: { password: hash } })
            if (result.modifiedCount != 0) {
                success = true
                return resp.status(200).send({ success, message: "successully change password" })
            }
            success = false
            resp.status(400).send({ success, message: "password not changed" })
        });


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateaddress = async (req, resp) => {
    try {
        const { address, pincode, state, city, email, phone_number } = req.body
        // new note object 

        const newaddress = {};
        if (email) { newaddress.email = email }
        if (phone_number) { newaddress.phone_number = phone_number }
        if (address) { newaddress.address = address }
        if (pincode) { newaddress.pincode = pincode }
        if (state) { newaddress.state = state }
        if (city) { newaddress.city = city }

        // find the note to be updated and update it

        let user = await userModel.findById(req.params.id)
        if (!user) {
            success = false
            return resp.status(404).send({ success, message: "Not Found" })
        }

        user = await userModel.findByIdAndUpdate(req.params.id, { $set: newaddress })

        resp.json({ user })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deleteuser = async (req, resp) => {
    try {
        // const id=req.params.id;
        const user_find = await userModel.findOne({ _id: req.params.id });

        if (user_find == null) {
            return resp.status(400).send({ message: "Users not found" });
        }
        const user_name = user_find.name;

        // How to remove cart collection beauty product data
        // 1.

        // const user_find = await userModel.find({_id:req.params.id}).select('_id');
        // console.log(user_find);
        // const temp=await cartModel.deleteMany({user_id:{$in:user_find}});


        // 2.

        /* Most imp thing is when we can store user id in _id variable 
        at that time must sure variable name must be _id when we use $in when we delete*/

        // console.log(user_id_find);

        // delete in cart collection
        await cartModel.deleteMany({ user_id: req.params.id });


        // delete in user collection
        const user = await userModel.deleteOne({ _id: req.params.id });
        resp.status(200).send({ message: `${user_name} was deleted` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayuserdata = async (req, resp) => {
    try {
        let user = await userModel.findById(req.params.id)
        if (!user) {
            return resp.status(404).send("Not Found")
        }
        resp.send(user);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.searchuser = async (req, resp) => {
    try {
        const email = req.params.email;

        const filter = { email: new RegExp(email) };

        let user = await userModel.find(filter)

        if (!user) {
            success = false;
            return resp.status(404).send({ success, message: "User Not Found" })
        }

        resp.send(user);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

