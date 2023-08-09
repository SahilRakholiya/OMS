const beautyCategoryModel = require('../models/beauty_category');
const beautyProductModel = require('../models/beauty_product');
const cartModel=require('../models/cart');

const fs = require('fs');
const path = require('path');

let success = false
exports.displayBeautyCategory = async (req, resp) => {
    try {
        const beauty_cat = await beautyCategoryModel.find({});
        if (beauty_cat == "") {
            success=false
            return resp.status(400).send({ success,message: "Beauty Category not found" });
        }
        resp.status(200).send(beauty_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertBeautyCategory = (req, resp) => {
    try {
        const beauty_cat = req.body;
        beautyCategoryModel.findOne({ beauty_category_name: beauty_cat.cat_name }, async (err, beauty_cat_search) => {
            if (err) {
                console.error(err);
                resp.status(500).send(err);
                return;
            }
            if (beauty_cat_search) {
                console.log("Category Name already exist ");
                resp.status(400).send({ message: "Category Name already exist " });
                return;
            }
            const newBeautyCat = new beautyCategoryModel({
                beauty_category_name: beauty_cat.cat_name
            })

            result = await newBeautyCat.save();
            resp.status(200).send(result);

        })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateBeautyCategory = async (req, resp) => {
    try {
        const beauty_cat_id = req.params.id;

        const beauty_cat_search = await beautyCategoryModel.findOne({ _id: beauty_cat_id });

        const check_find_name=await beautyCategoryModel.findOne({beauty_category_name:req.body.cat_name});

        if(check_find_name)
        {
            return resp.status(400).send({ message: "Please enter unique beauty category name" });
        }
        if (!beauty_cat_search) {
            return resp.status(400).send({ message: "Beauty Category not found" });
        }
        beautyCategoryModel.updateOne({ _id: beauty_cat_id }, {
            $set: {
                beauty_category_name: req.body.cat_name
            }
        }, (err, beauty_cat_update) => {
            resp.status(500).send(beauty_cat_update);
        })

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteBeautyCategory = async (req, resp) => {
    try {
        // const id=req.params.id;
        const beauty_cat_id = await beautyCategoryModel.findOne({ _id: req.params.id });
        if (beauty_cat_id == null) {
            return resp.status(400).send({ message: "Beauty category not found" });
        }
        const beauty_cat_name = beauty_cat_id.beauty_category_name;

        const beauty_product_find = await beautyProductModel.find({ beauty_category_id: beauty_cat_id._id});
        if (beauty_product_find != null) {
            // resp.send(beauty_product_find);

            const i_names = beauty_product_find.map(products => ({
                product_image: products.beauty_image,
                i_path: path.join(__dirname, '../', 'uploads', products.beauty_image)
            }))

            // resp.send(i_names);

            i_names.map(image_name =>

                // console.log(i_path);

                fs.unlink(image_name.i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                })
            )
        }


        // How to remove cart collection beauty product data
        // 1.

        // const well_product_find = await beautyProductModel.find({ beauty_category_id: well_cat_id._id }).select('_id');
        // console.log(well_product_find);
        // const temp=await cartModel.deleteMany({beauty_product_id:{$in:well_product_find}});


        // 2.

        /* Most imp thing is when we can store beauty product id in _id variable 
        at that time must sure variable name must be _id when we use $in when we delete*/
        
        // const beauty_product_id_find=beauty_product_find.map(product=>({
        //     _id:product._id
        // }));

        // console.log(beauty_product_id_find);

        // delete in cart collection
        // await cartModel.deleteMany({beauty_product_id:{$in:beauty_product_id_find}});
        const cart_find = await cartModel.find({});
        const find_data = [];
        if (cart_find != null) {
            beauty_product_find.map((beauty_product) => {

                cart_find.map((cart) => {
                    temp = cart.all_cart_data.map((product) => {
                        if (product.beauty_product_id != undefined) {
                            if (product.beauty_product_id.equals(beauty_product._id)) {
                                find_data.push({
                                    cid: cart._id,
                                    bid: product._id,
                                    amount: product.amount
                                })
                            }
                        }
                    })
                })
            })
        }
        // console.log(find_data);

        find_data.map(async (product) => {
            const cart = await cartModel.findOne({ _id: product.cid });
            await cartModel.updateOne(
                {
                    _id: cart._id
                },
                {
                    $inc: {
                        total_amount: -product.amount
                    },
                    $pull: {
                        all_cart_data: {
                            _id: product.bid
                        }
                    },

                }
            )
        });

        // delete in beauty product collection
        await beautyProductModel.deleteMany({ beauty_category_id: beauty_cat_id });

        // delete in beuaty category collection
        const beauty_cat = await beautyCategoryModel.deleteOne({ _id: req.params.id });

        resp.status(200).send({ message: `${beauty_cat_name} was deleted` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.searchBeautyCategory = async (req, resp) => {
    try {
        const beauty_cat_name = req.params.cat_name;
        const beauty_cat = await beautyCategoryModel.find({ beauty_category_name: beauty_cat_name });

        if (beauty_cat == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "Beauty category not found" });
            return;
        }

        resp.status(200).send(beauty_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}
exports.hideUnhideCategory = async (req, resp) => {
    try {
        let success = false;
        
        const beauty_category_id = req.params.cat_id;
        // const cart_find = await cartModel.findOne({ beauty_product_id: req.params.id });

        const beauty_category_find = await beautyCategoryModel.findOne({ _id: beauty_category_id });
        // fs.unlinkSync(well_product_image);

        if (beauty_category_find == null) {
            return resp.status(400).send({ message: "beauty category not found" });
        }

        const beauty_product_find = await beautyProductModel.find({ beauty_category_id: beauty_category_id });

        // console.log(beauty_product_find);
        // resp.send(beauty_product_find);
        let result;
        let update_beauty_product = [];
        let update_cart_data = [];
        if (beauty_category_find.hide_status == false) {

            result = await beautyCategoryModel.updateOne(
                {
                    _id: beauty_category_id
                },
                {
                    $set: {
                        hide_status: true
                    }
                }
            )

            beauty_product_find.map(async (product) => {
                if (product.hide_status == false) {

                    update_beauty_product.push({
                        pid: product._id
                    });
                    await beautyProductModel.updateOne(
                        {
                            _id: product._id
                        },
                        {
                            $set: {
                                hide_status: true
                            }
                        }
                    )
                }
            })

            const cart_find = await cartModel.find({});

            update_beauty_product.map(async (find_product) => {
                if (cart_find != null) {
                    cart_find.map((cart) => {
                        cart.all_cart_data.map((product) => {
                            if (product.beauty_product_id != undefined) {
                                if (product.beauty_product_id.equals(find_product.pid)) {
                                    update_cart_data.push({
                                        cid: cart._id,
                                        bid: product._id,
                                        amount: product.amount
                                    })
                                }
                            }
                        })
                    })
                }
            })

            update_cart_data.map(async (product) => {
                const cart = await cartModel.findOne({ _id: product.cid });
                await cartModel.updateOne(
                    {
                        _id: product.cid,
                        "all_cart_data._id": product.bid
                    },
                    {
                        $inc: {
                            total_amount: -product.amount
                        },
                        $set: {
                            "all_cart_data.$.hide_status": true
                        }


                    }
                )
            });

        }
        else if (beauty_category_find.hide_status == true) {

            result = await beautyCategoryModel.updateOne(
                {
                    _id: beauty_category_id
                },
                {
                    $set: {
                        hide_status: false
                    }
                }
            )

            beauty_product_find.map(async (product) => {
                if (product.hide_status == true) {

                    update_beauty_product.push({
                        pid: product._id
                    });
                    await beautyProductModel.updateOne(
                        {
                            _id: product._id
                        },
                        {
                            $set: {
                                hide_status: false
                            }
                        }
                    )
                }
            })
           
            const cart_find = await cartModel.find({});

            update_beauty_product.map(async (find_product) => {
                if (cart_find != null) {
                    cart_find.map((cart) => {
                        cart.all_cart_data.map((product) => {
                            if (product.beauty_product_id != undefined) {
                                if (product.beauty_product_id.equals(find_product.pid)) {
                                    update_cart_data.push({
                                        cid: cart._id,
                                        bid: product._id,
                                        amount: product.amount
                                    })
                                }
                            }
                        })
                    })
                }
            })

            update_cart_data.map(async (product) => {
                const cart = await cartModel.findOne({ _id: product.cid });
                await cartModel.updateOne(
                    {
                        _id: product.cid,
                        "all_cart_data._id": product.bid
                    },
                    {
                        $inc: {
                            total_amount: product.amount
                        },
                        $set: {
                            "all_cart_data.$.hide_status": false
                        }

                    }
                )
            });
        }


        if (result.modifiedCount != 0) {
            success = true;
            return resp.status(200).send({ success, message: `${beauty_category_find.beauty_category_name} was updated` });
        }
        resp.status(400).send({ success, message: `${beauty_category_find.beauty_category_name} was not updated` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayBeautyCategoryClient = async (req, resp) => {
    try {

        const beauty_cat = await beautyCategoryModel.find({});
        if (beauty_cat == "") {
            return resp.status(400).send({ message: "Beauty Category not found" });
        }
        resp.status(200).send(beauty_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}