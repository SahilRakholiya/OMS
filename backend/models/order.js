const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    user_name: {
        type: String,
        required: true,
        ref: 'users'
    },
    orders: [{
        medicine_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'medicines'
        },
        medicine_name: {
            type: String,
        },
        wellness_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'wellness_products'
        },
        wellness_product_name: {
            type: String
        },
        beauty_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'beauty_products'
        },
        beauty_product_name: {
            type: String
        },

        // offer_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'offers'
        // },
        quantity: {
            type: Number,
            required: true
        },
        image_name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        wellness_category: {
            type: String
        },
        beauty_category: {
            type: String
        },
        company: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    dispatch: {
        type: Boolean,
        required: true,
        default: false
    },
    otp: {
        type: Boolean,
        required: true,
        default: false
    },
    order_total_amount: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    cancel_status: {
        type: Boolean,
        required: true,
        default: false
    }
}, { "versionKey": false });

module.exports = mongoose.model('orders', orderSchema);