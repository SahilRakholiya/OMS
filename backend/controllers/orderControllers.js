const userModel = require('../models/user');
const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');
const orderModel = require('../models/order');


// For Admin side
let success = false
exports.insertOrder = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const order = req.body;
        let neworder
        if (order.total_amount == 0) {
            success = false
            return resp.status(400).send({ success, message: "Please add to cart product" });
        }

        const user_find = await userModel.findOne({ _id: uid });
        if (user_find == null) {
            success = false
            return resp.status(400).send({ success, message: "Please enter valid user." });
        }

        if (order.all_cart_data.amount == order.total_amount) {
            neworder = new orderModel({
                user_id: user_find._id,
                user_name: user_find.name,
                orders: order.all_cart_data,
                date: Date.now(),
                email: user_find.email,
                phone_number: user_find.phone_number,
                address: user_find.address,
                pincode: user_find.pincode,
                state: user_find.state,
                city: user_find.city,
                order_total_amount: order.total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id
            })
        } else {
            const map_data = order.all_cart_data.filter((data) => {
                if (data.hide_status == false) {
                    return data;
                }
            })
            map_data.filter((data) => data != undefined)
            neworder = new orderModel({
                user_id: user_find._id,
                user_name: user_find.name,
                orders: map_data,
                date: Date.now(),
                email: user_find.email,
                phone_number: user_find.phone_number,
                address: user_find.address,
                pincode: user_find.pincode,
                state: user_find.state,
                city: user_find.city,
                order_total_amount: order.total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id
            })
        }
        result = await neworder.save();
        resp.status(200).send(result);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayUserOrder = async (req, resp) => {
    try {

        const uid = req.params.userid;

        const find_user_in_database = await userModel.findOne({ _id: uid });
        if (find_user_in_database == null) {

            return resp.status(400).send({ message: "No User Found" });
        }

        const find_user_data = await orderModel.find({ user_id: uid, cancel_status: false })
            .populate('user_id', 'name')

        if (find_user_data == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }


        const filter_data = find_user_data.map((order) => {
            return {
                _id: order._id,
                user_name: order.user_name,
                orders: order.orders,
                date: order.date,
                email: order.email,
                phone_number: order.phone_number,
                address: order.address,
                pincode: order.pincode,
                state: order.state,
                city: order.city,
                dispatch: order.dispatch,
                order_total_amount: order.order_total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id,
                otp: order.otp
            }
        })
        resp.send(filter_data);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayUserAllData = async (req, resp) => {
    try {

        const oid = req.params.orderid

        const find_user_data = await orderModel.find({ _id: oid })

        if (find_user_data == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }

        const filter_data = find_user_data.map((order) => {
            return {

                orders: order.orders
            }
        })
        resp.send(filter_data);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayAllUserOrder = async (req, resp) => {
    try {

        const find_order = await orderModel.find({})
            // .populate('user_id', '_id')

        if (find_order == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }

        const filter_data = find_order.map((order) => {
            return {
                _id: order._id,
                user_id: order.user_id._id,
                user_name: order.user_name,
                orders: order.orders,
                date: order.date,
                email: order.email,
                phone_number: order.phone_number,
                address: order.address,
                pincode: order.pincode,
                state: order.state,
                city: order.city,
                dispatch: order.dispatch,
                order_total_amount: order.order_total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id,
                otp: order.otp,
                cancel_status: order.cancel_status
            }
        })
        resp.status(200).send(filter_data);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.dispatchOrder = async (req, resp) => {
    try {
        const oid = req.params.orderid;

        const order_find = await orderModel.findOne({ _id: oid });
        if (order_find == "") {
            let success = false;
            return resp.status(400).send({ success, message: "Order not found" });
        }
        if (order_find.dispatch == true) {
            let success = true;
            return resp.status(200).send({ success, message: "Order Already Dispatch" });
        }
        // console.log(order_find);
        // resp.send(order_find);

        const filter = { _id: oid };
        const update = { $set: {} };
        update.$set.dispatch = true;

        const result = await orderModel.updateOne(filter, update);
        if (result.modifiedCount != 0) {
            return resp.status(200).send({ message: "Order dispatch" });
        }

        resp.status(400).send({ message: "Order not dispatch" });


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.displayUserOrderdata = async (req, resp) => {
    try {

        const oid = req.params.orderid

        const find_user_data = await orderModel.find({ _id: oid })

        if (find_user_data == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }
        console.log(find_user_data)
        const [dispatch] = find_user_data.map((order) => {
            return {
                dispatch: order.dispatch,
                otp: order.otp
            }
        }
        )
        resp.status(200).send(dispatch);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.searchorder = async (req, resp) => {
    try {

        const uname = req.params.uname;
        const filter = { user_name: new RegExp(uname, 'i') };

        const find_user_data = await orderModel.find(filter)

        if (find_user_data == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }


        const filter_data = find_user_data.map((order) => {
            return {
                _id: order._id,
                user_name: order.user_name,
                orders: order.orders,
                date: order.date,
                email: order.email,
                phone_number: order.phone_number,
                address: order.address,
                pincode: order.pincode,
                state: order.state,
                city: order.city,
                dispatch: order.dispatch,
                order_total_amount: order.order_total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id,
                otp: order.otp
            }
        })
        resp.send(filter_data);



    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.cancelorder = async (req, resp) => {
    try {
        const oid = req.params.orderid;

        const order_find = await orderModel.findOne({ _id: oid });
        if (order_find == "") {
            let success = false;
            return resp.status(400).send({ success, message: "Order not found" });
        }
        if (order_find.dispatch == true) {
            let success = false;
            return resp.status(200).send({ success, message: "Order Dispatch" });
        }
        // console.log(order_find);
        // resp.send(order_find);

        const filter = { _id: oid };
        const update = { $set: {} };
        update.$set.cancel_status = true;

        const result = await orderModel.updateOne(filter, update);
        let success = false;
        if (result.modifiedCount != 0) {
            success = true;
            return resp.status(200).send({ success, message: "Order Cancel" });
        }

        resp.status(400).send({ success, message: "Order not dispatch" });


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.cancelorderDisplay = async (req, resp) => {
    try {

        const uid = req.params.userid;

        const find_user_in_database = await userModel.findOne({ _id: uid });
        if (find_user_in_database == null) {
            success = false
            return resp.status(400).send({ success, message: "No User Found" });
        }

        const find_user_data = await orderModel.find({ user_id: uid, cancel_status: true })

        if (find_user_data == null) {
            success = false
            return resp.status(400).send({ success, message: "No Order Found" });
        }


        const filter_data = find_user_data.map((order) => {
            return {
                _id: order._id,
                user_name: order.user_name,
                orders: order.orders,
                date: order.date,
                email: order.email,
                phone_number: order.phone_number,
                address: order.address,
                pincode: order.pincode,
                state: order.state,
                city: order.city,
                dispatch: order.dispatch,
                order_total_amount: order.order_total_amount,
                razorpay_order_id: order.razorpay_order_id,
                razorpay_payment_id: order.razorpay_payment_id,
                otp: order.otp
            }
        })
        resp.send(filter_data);
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}