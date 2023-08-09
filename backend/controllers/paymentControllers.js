const Razorpay = require('razorpay');
var crypto = require("crypto");
const KEY_ID = 'rzp_test_AtkRmtoEgSyEGF';
const KEY_SECRET = '0Sj3VILbZMkCdQvp4Kf9xn1s';

exports.placeOrder = async (req, resp) => {
    try {
        var instance = new Razorpay({
            key_id: KEY_ID,
            key_secret: KEY_SECRET,
        });

        var options = {
            amount: req.body.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, (err, order) => {
            if (err) {
                return resp.status(500).send({ message: "Server error" });

            }
            return resp.status(200).send({ data: order, message: "Order created" });

        });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.verifyToken = async (req, resp) => {
    try {
        console.log(req.body)
        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        // console.log("sig received ", req.body.response.razorpay_signature);
        // console.log("sig generated ", expectedSignature);
        let success = true;

        if (expectedSignature === req.body.response.razorpay_signature) {
            razorpay_order_id = req.body.response.razorpay_order_id;
            razorpay_payment_id = req.body.response.razorpay_payment_id;
            return resp.status(200).send({ success, razorpay_order_id, razorpay_payment_id, message: 'Sign valid ' });

        }
        else {
            success = false;
            return resp.status(400).send({ success, message: 'Sign invalid ' });

        }

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}