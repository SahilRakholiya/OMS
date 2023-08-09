const userModel = require('../models/user');
const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');
const orderModel = require('../models/order');

exports.countData = async (req, resp) => {
    try {

        let user_count,medicine_product_count,wellness_product_count,beauty_product_count;
        
        user_count=await userModel.countDocuments();
        medicine_product_count=await medicineModel.countDocuments();
        wellness_product_count=await wellnessProductModel.countDocuments();
        beauty_product_count=await beautyProductModel.countDocuments();
        order_count=await orderModel.countDocuments();
        // console.log(user_count,medicine_product_count,wellness_product_count,beauty_product_count);

        const all_product_count=[{
            user_count:user_count,
            medicine_product_count:medicine_product_count,
            wellness_product_count:wellness_product_count,
            beauty_product_count:beauty_product_count,
            order_count:order_count
        }]

        // console.log(all_product_count.user_count);

        resp.status(200).send(all_product_count);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}