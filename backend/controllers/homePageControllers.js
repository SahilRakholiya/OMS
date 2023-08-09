const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');
exports.searchData = async (req, resp) => {
    try {
        if(!req.params){
            console.log("req.params.pname");

        }
        const medicine_filter={medicine_name:new RegExp(req.params.pname,'i')};
        const wellness_filter={wellness_product_name:new RegExp(req.params.pname,'i')};
        const beauty_filter={beauty_product_name:new RegExp(req.params.pname,'i')};

        const search_pname=req.params.pname;

        const searchResults=await Promise.all([
            medicineModel.find(medicine_filter),
            wellnessProductModel.find(wellness_filter)
            .populate('wellness_category_id', 'wellness_category_name'),
            beautyProductModel.find(beauty_filter)
            .populate('beauty_category_id', 'beauty_category_name')

        ])
        const mergeResult=searchResults.flat();

        const all_data = mergeResult.map((product) => {
            if (product.medicine_name) {
                return {
                    _id: product._id,
                    pname: product.medicine_name,
                    image_name:product.medicine_image,
                    amount: product.amount,
                    company:product.company,
                    hide_status:product.hide_status
                }
            }
            else {
                if (product.wellness_product_name)
                    return {
                        _id: product._id,
                        pname: product.wellness_product_name,
                        image_name:product.wellness_image,
                        amount: product.amount,
                        company:product.company,
                        category_name:product.wellness_category_id.wellness_category_name,
                        hide_status:product.hide_status                    
                    }
                else {
                    if (product.beauty_product_name)
                        return {
                            _id: product._id,
                            pname: product.beauty_product_name,
                            image_name:product.beauty_image,
                            amount: product.amount,
                            company:product.company,
                            category_name:product.beauty_category_id.beauty_category_name,
                            hide_status:product.hide_status                        
                        }
                }
            }
        })

        if(mergeResult=="")
        {
            success=false
            return resp.status(400).send({success,message:"data not found"});
        }
        success=true;
        resp.status(200).send({success,all_data});

       
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}