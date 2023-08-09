const nodemailer = require("nodemailer");
const orderModel = require('../models/order');
require('dotenv').config();
let success = false

exports.optgenerate = async (req, resp) => {
  try {

    // let testAccount = await nodemailer.createTestAccount();

    let email = req.params.email;

    const otp = Math.floor((Math.random() * 1000000) + 1);
    console.log(otp);
    // console.log(email);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.user_razor_pay, // generated ethereal user
        pass: process.env.pass_razor_pay, // generated ethereal password 
      },
    });
    // "Fred Foo 👻" 
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.user_razor_pay, // sender address
      to: email, // list of receivers
      subject: "OTP", // Subject line
      text: "<h3>MyMeds</h3>", // plain text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><h2>MyMeds</h2></a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing our web site. you are account opening request received. please use this otp to sign up your account</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Once again thank you for choosing our site,<br />MyMeds</p>
            </div>
          </div>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    resp.send({ otp, message: "Otp send successfully" })
    // resp.send(otp);
  } catch (err) {
    console.error(err);
    resp.status(500).send(err);
  }
}


exports.forgetpassotp = async (req, resp) => {
  try {

    let testAccount = await nodemailer.createTestAccount();

    let email = req.params.email;

    const otp = Math.floor((Math.random() * 1000000) + 1);
    console.log(otp);
    // console.log(email);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.user_razor_pay, // generated ethereal user
        pass: process.env.pass_razor_pay, // generated ethereal password
      },
    });
    // "Fred Foo 👻" 
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.user_razor_pay, // sender address
      to: email, // list of receivers
      subject: "forget password OTP", // Subject line
      text: "<h3>MyMeds</h3>", // plain text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><h2>MyMeds</h2></a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Are you sure to change your password. if yes then use this otp</p>
              <p>Your Account is : ${email} </p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Once again thank you for choosing our site,<br />MyMeds</p>
            </div>
          </div>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    resp.send({ otp, message: "Otp send successfully" })
    // resp.send(otp);
  } catch (err) {
    console.error(err);
    resp.status(500).send(err);
  }
}

exports.dispatchEmail = async (req, resp) => {
  try {


    const oid = req.params.orderid;
    const user_order = await orderModel.findOne({ _id: oid });
    // console.log(user_order.email);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.user_razor_pay, // generated ethereal user
        pass: process.env.pass_razor_pay, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: process.env.user_razor_pay, // sender address
      to: user_order.email, // list of receivers
      subject: "Order", // Subject line
      text: "<h3>MyMeds</h3>", // plain text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><h2>MyMeds</h2></a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Order Id : ${user_order._id} </p>
            <p>email : ${user_order.email} </p>
            <p>Phone no : ${user_order.phone_number} </p>
            <p>Address : ${user_order.address}, ${user_order.city}, ${user_order.state}, ${user_order.pincode}</p>
            <p>Total Amount : ${user_order.order_total_amount} </p>
            <p>Payment id : ${user_order.razorpay_payment_id} </p>
            <h2 style="background: green;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Order Dispatch</h2>
            <p style="font-size:0.9em;">Once again thank you for choosing our site,<br />MyMeds</p>
          </div>
        </div>`, // html body
    });

    resp.send({ success, message: "Email send successfully" })
  } catch (err) {
    console.error(err);
    resp.status(500).send(err);
  }
}



exports.orderoptgenerate = async (req, resp) => {
  try {
    const oid = req.params.orderid;
    const user_order = await orderModel.findOne({ _id: oid });


    if (user_order.dispatch === false) {
      success = false
      return resp.status(400).send({ success, message: "order not dispatch" })
    }

    if (user_order.otp == true) {
      let success = true;
      return resp.status(200).send({ success, message: "otp Already send" });
    }
    // console.log(order_find);
    // resp.send(order_find);

    const filter = { _id: oid };
    const update = { $set: {} };
    update.$set.otp = true;

    const result = await orderModel.updateOne(filter, update);

    const otp = Math.floor((Math.random() * 1000000) + 1);
    console.log(otp);
    // console.log(email);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.user_razor_pay, // generated ethereal user
        pass: process.env.pass_razor_pay, // generated ethereal password
      },
    });
    // "Fred Foo 👻" 
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.user_razor_pay, // sender address
      to: user_order.email, // list of receivers
      subject: "Delivery OTP", // Subject line
      text: "<h3>MyMeds</h3>", // plain text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><h2>MyMeds</h2></a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing our web site.please use this otp when you receive product.</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="color: red">Do not share otp</p>
              <p style="font-size:0.9em;">Once again thank you for choosing our site,<br />MyMeds</p>
            </div>
          </div>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    if (result.modifiedCount != 0) {
      success = true
      return resp.status(200).send({ message: "Otp send successfully" })
    }
    success = false
    resp.status(400).send({ success, message: "Otp not send" });

    // resp.send(otp);
  } catch (err) {
    console.error(err);
    resp.status(500).send(err);
  }
}

