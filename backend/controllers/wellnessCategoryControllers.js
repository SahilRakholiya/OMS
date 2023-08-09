const wellnessCategoryModel = require('../models/wellness_category');
const wellnessProductModel = require('../models/wellness_product');
const cartModel = require('../models/cart');

const fs = require('fs');
const path = require('path');
const wellness_product = require('../models/wellness_product');
const cart = require('../models/cart');
const { Console } = require('console');

let success = false

exports.displayWellnessCategory = async (req, resp) => {
    try {

        const well_cat = await wellnessCategoryModel.find({});
        if (well_cat == "") {
            success = false
            return resp.status(400).send({ success, message: "Wellness Category not found" });
        }
        resp.status(200).send(well_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertWellnessCategory = (req, resp) => {
    try {
        const well_cat = req.body;
        wellnessCategoryModel.findOne({ wellness_category_name: well_cat.cat_name }, async (err, well_cat_search) => {
            if (err) {
                console.error(err);
                resp.status(500).send(err);
                return;
            }
            if (well_cat_search) {
                console.log("Category Name already exist ");
                resp.status(400).send({ message: "Category Name already exist " });
                return;
            }
            const newWellCat = new wellnessCategoryModel({
                wellness_category_name: well_cat.cat_name
            })

            result = await newWellCat.save();
            resp.status(200).send(result);

        })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateWellnessCategory = async (req, resp) => {
    try {
        const well_cat_id = req.params.id;

        const well_cat_search = await wellnessCategoryModel.findOne({ _id: well_cat_id });


        if (!well_cat_search) {
            return resp.status(400).send({ message: "Wellness Category not found" });
        }


        const check_find_name = await wellnessCategoryModel.findOne({ wellness_category_name: req.body.cat_name });

        if (check_find_name) {
            return resp.status(400).send({ message: "Please enter unique Wellness category name" });
        }

        wellnessCategoryModel.updateOne({ _id: well_cat_id }, {
            $set: {
                wellness_category_name: req.body.cat_name
            }
        }, (err, well_cat_update) => {
            resp.status(500).send(well_cat_update);
        })

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteWellnessCategory = async (req, resp) => {
    try {
        // const id=req.params.id;
        const well_cat_id = await wellnessCategoryModel.findOne({ _id: req.params.id });
        if (well_cat_id == null) {
            return resp.status(400).send({ message: "Wellness category not found" });
        }

        const well_cat_name = well_cat_id.wellness_category_name;

        // console.log(well_cat_id._id);
        const well_product_find = await wellnessProductModel.find({ wellness_category_id: well_cat_id._id });
        if (well_product_find != null) {
            // resp.send(beauty_product_find);

            const i_names = well_product_find.map(products => ({
                product_image: products.wellness_image,
                i_path: path.join(__dirname, '../', 'uploads', products.wellness_image)
            }))

            // resp.send(i_names);

            i_names.map(image_name =>

                // console.log(i_path);

                fs.unlink(image_name.i_path, (err) => {
                    if (err) {
                        success = false
                        return resp.status(400).send({ success, message: err });
                    }
                })
            )
        }

        // How to remove cart collection wellness product data
        // 1.

        // const well_product_find = await wellnessProductModel.find({ wellness_category_id: well_cat_id._id }).select('_id');
        // console.log(well_product_find);
        // const temp=await cartModel.deleteMany({wellness_product_id:{$in:well_product_find}});


        // 2.

        /* Most imp thing is when we can store wellness product id in _id variable 
        at that time must sure variable name must be _id when we use $in when we delete*/

        // const well_product_id_find=well_product_find.map(product=>({
        //     _id:product._id
        // }));

        // console.log(well_product_id_find);

        // delete in cart collection
        // await cartModel.deleteMany({wellness_product_id:{$in:well_product_id_find}});
        const cart_find = await cartModel.find({});
        const find_data = [];
        if (cart_find != null) {
            well_product_find.map((wellness_product) => {

                cart_find.map((cart) => {
                    temp = cart.all_cart_data.map((product) => {
                        if (product.wellness_product_id != undefined) {
                            if (product.wellness_product_id.equals(wellness_product._id)) {
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

        // delete in wellness product
        await wellnessProductModel.deleteMany({ wellness_category_id: well_cat_id });

        // delete in wellness category
        const well_cat = await wellnessCategoryModel.deleteOne({ _id: req.params.id });

        resp.status(200).send({ message: `${well_cat_name} was deleted` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchWellnessCategory = async (req, resp) => {
    try {
        const well_cat_name = req.params.cat_name;
        const well_cat = await wellnessCategoryModel.find({ wellness_category_name: well_cat_name });

        if (well_cat == "") {
            // resp.status(400).send({message:"Users not found"});
            success = false
            resp.status(400).send({ success, message: "Wellness category not found" });
            return;
        }

        resp.status(200).send(well_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.hideUnhideCategory = async (req, resp) => {
    try {
        let success = false;
        const wellness_category_id = req.params.cat_id;
        // const cart_find = await cartModel.findOne({ wellness_product_id: req.params.id });

        const wellness_category_find = await wellnessCategoryModel.findOne({ _id: wellness_category_id });
        // fs.unlinkSync(well_product_image);

        if (wellness_category_find == null) {
            return resp.status(400).send({ message: "Wellness category not found" });
        }

        const wellness_product_find = await wellnessProductModel.find({ wellness_category_id: wellness_category_id });

        // console.log(wellness_product_find);
        // resp.send(wellness_product_find);
        let result;
        let update_wellness_product = [];
        let update_cart_data = [];
        if (wellness_category_find.hide_status == false) {

            result = await wellnessCategoryModel.updateOne(
                {
                    _id: wellness_category_id
                },
                {
                    $set: {
                        hide_status: true
                    }
                }
            )

            wellness_product_find.map(async (product) => {
                if (product.hide_status == false) {

                    update_wellness_product.push({
                        pid: product._id
                    });
                    await wellnessProductModel.updateOne(
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

            update_wellness_product.map(async (find_product) => {
                if (cart_find != null) {
                    cart_find.map((cart) => {
                        cart.all_cart_data.map((product) => {
                            if (product.wellness_product_id != undefined) {
                                if (product.wellness_product_id.equals(find_product.pid)) {
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
        else if (wellness_category_find.hide_status == true) {

            result = await wellnessCategoryModel.updateOne(
                {
                    _id: wellness_category_id
                },
                {
                    $set: {
                        hide_status: false
                    }
                }
            )

            wellness_product_find.map(async (product) => {
                if (product.hide_status == true) {

                    update_wellness_product.push({
                        pid: product._id
                    });
                    await wellnessProductModel.updateOne(
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

            update_wellness_product.map(async (find_product) => {
                if (cart_find != null) {
                    cart_find.map((cart) => {
                        cart.all_cart_data.map((product) => {
                            if (product.wellness_product_id != undefined) {
                                if (product.wellness_product_id.equals(find_product.pid)) {
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
            return resp.status(200).send({ success, message: `${wellness_category_find.wellness_category_name} was updated` });
        }
        resp.status(400).send({ success, message: `${wellness_category_find.wellness_category_name} was not updated` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayWellnessCategoryClient = async (req, resp) => {
    try {

        const well_cat = await wellnessCategoryModel.find({ });
        if (well_cat == "") {
            return resp.status(400).send({ message: "Wellness Category not found" });
        }
        resp.status(200).send(well_cat);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}