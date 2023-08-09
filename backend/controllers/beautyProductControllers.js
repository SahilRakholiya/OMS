const beautyProductModel = require('../models/beauty_product');
const beautyCategoryModel = require('../models/beauty_category');
const cartModel = require('../models/cart');

const fs = require('fs');
const path = require('path');
let success = false
exports.displayBeautyProduct = async (req, resp) => {
    try {

        // 1. method
        const beauty_product = await beautyProductModel.find().populate('beauty_category_id', 'beauty_category_name');

        const all_products = beauty_product.map(products => ({
            _id: products._id,
            product_name: products.beauty_product_name,
            image_name: products.beauty_image,
            amount: products.amount,
            company: products.company,
            beauty_category_name: products.beauty_category_id.beauty_category_name,
            i_path: path.join(__dirname, '../', 'uploads', products.beauty_image),
            hide_status: products.hide_status
        }))
        if (all_products == "") {
            success = false
            return resp.status(400).send({ success, message: "Beauty Product not found" });
        }

        resp.send(all_products);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertBeautyProduct = async (req, resp) => {
    try {
        const beauty_product = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        } else {
            return resp.status(400).send({ message: "Please upload the images " });
        }

        // console.log(beauty_product_find);
        const beauty_name = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name });
        // console.log(beauty_name);

        const beauty_product_find = await beautyProductModel.findOne({ beauty_product_name: beauty_product.product_name, beauty_category_id: beauty_name._id, company: beauty_product.company });

        if (!beauty_name || beauty_product_find) {

            // image remove from the folder because error is generated
            const i_path = path.join(__dirname, '../', 'uploads', image_name);
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });
            if (beauty_product_find) {
                return resp.status(400).send({ message: "This company already add same category and same name of product " });
            }

            if (!beauty_name) {
                return resp.status(400).send({ message: "Invalid category name" });
            }
        }


        const newbeauty_product = new beautyProductModel({
            beauty_product_name: beauty_product.product_name,
            beauty_image: image_name,
            amount: beauty_product.amount,
            company: beauty_product.company,
            beauty_category_id: beauty_name._id
        })

        result = await newbeauty_product.save();
        resp.status(200).send(result);
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// update product name
exports.updateBeautyProduct = async (req, resp) => {
    try {
        const beauty_product = req.body;
        const beauty_product_id = req.params.id;

        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        }
        const beauty_product_find = await beautyProductModel.findOne({ _id: beauty_product_id });


        if (!beauty_product_find) {
            if (req.file) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', image_name);
                // console.log(i_path);
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });
            }
            return resp.status(400).send({ message: "Beauty Product not found" });
        }

        const filter = { _id: beauty_product_id };
        const update = { $set: {} };
        // console.log(beauty_product);

        let check_unique_data;


        if (beauty_product.product_name) {
            if (beauty_product.beauty_category_name && !beauty_product.company) {
                const beauty_cat_id = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name })
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product.product_name, beauty_category_id: beauty_cat_id._id, company: beauty_product_find.company });
                if (check_unique_data) {
                    // console.log(check_unique_data);
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ph1");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            if (beauty_product.company && !beauty_product.beauty_category_name) {
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product.product_name, beauty_category_id: beauty_product_find.beauty_category_id, company: beauty_product.company });
                if (check_unique_data) {

                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }

                    console.log("ph2");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            if (beauty_product.company && beauty_product.beauty_category_name) {
                const beauty_cat_id = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name })
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product.product_name, beauty_category_id: beauty_cat_id._id, company: beauty_product.company });
                if (check_unique_data) {

                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }

                    console.log("ph3");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }
            if (!beauty_product.company && !beauty_product.beauty_category_name) {
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product.product_name, beauty_category_id: beauty_product_find.beauty_category_id, company: beauty_product_find.company });
                if (check_unique_data) {

                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }

                    console.log("ph4");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            update.$set.beauty_product_name = beauty_product.product_name;
        }

        if (beauty_product.amount) {

            update.$set.amount = beauty_product.amount;
        }

        if (beauty_product.company) {
            if (beauty_product.beauty_category_name && !beauty_product.product_name) {
                const beauty_cat_id = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name })
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product_find.beauty_product_name, beauty_category_id: beauty_cat_id._id, company: beauty_product.company });
                if (check_unique_data) {

                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ch1");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }


            if (!beauty_product.beauty_category_name && !beauty_product.product_name) {

                console.log("h1");
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product_find.beauty_product_name, beauty_category_id: beauty_product_find.beauty_category_id, company: beauty_product.company });
                // console.log(beauty_product_find);
                console.log(beauty_product.company);
                if (check_unique_data) {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    // console.log(check_unique_data);
                    console.log("ch4");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            // if(beauty_product.product_name)
            // {
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product.beauty_product_name,beauty_category_id:beauty_product_find.beauty_category_id,company:beauty_product.company});
            //     if(check_unique_data)
            //     {
            //         console.log("ch2");
            //         return resp.status(400).send({ message: "This company have already available this category product Name \n so enter unique company name" });
            //     }
            // }

            // if(beauty_product.product_name && beauty_product.beauty_category_name)
            // {
            //     const beauty_cat_id = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name })
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product.product_name,beauty_category_id:beauty_cat_id._id,company:beauty_product.company});
            //     if(check_unique_data)
            //     {
            //         console.log("ch3");
            //         return resp.status(400).send({ message: "This company have already available this category product Name" });
            //     }
            // }


            update.$set.company = beauty_product.company;
        }

        if (beauty_product.beauty_category_name) {
            const beauty_cat_id = await beautyCategoryModel.findOne({ beauty_category_name: beauty_product.beauty_category_name })
            if (beauty_cat_id == null) {
                if (req.file) {
                    // image remove from the folder because error is generated
                    const i_path = path.join(__dirname, '../', 'uploads', image_name);
                    // console.log(i_path);
                    fs.unlink(i_path, (err) => {
                        if (err) {
                            success = false
                            return resp.status(400).send({ success, message: err });
                        }
                    });
                }

                return resp.status(400).send({ message: "Invalid category name" });

            }

            // if(beauty_product.product_name)
            // {
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product_find.product_name,beauty_category_id:beauty_cat_id._id,company:beauty_product.company});
            //     if(check_unique_data)
            //     {
            //         console.log("cth1");
            //         return resp.status(400).send({ message: "This company have already available this category product Name \n so enter unique company name" });
            //     }
            // }


            // if(beauty_product.company && beauty_product.product_name)
            // {
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product.product_name,beauty_category_id:beauty_cat_id._id,company:beauty_product.company});
            //     if(check_unique_data)
            //     {
            //         console.log("cth3");
            //         return resp.status(400).send({ message: "This company have already available this category product Name" });
            //     }
            // }
            // if(!(beauty_product.company && beauty_product.product_name))
            // {
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product_find.product_name,beauty_category_id:beauty_cat_id.beauty_category_id,company:beauty_product_find.company});
            //     if(check_unique_data)
            //     {
            //         console.log(check_unique_data);
            //         console.log("cth4");
            //         return resp.status(400).send({ message: "This company have already available this category product Name" });
            //     }
            // }
            // if(beauty_product.company)
            // {
            //     check_unique_data=await beautyProductModel.findOne({beauty_product_name:beauty_product.beauty_product_name,beauty_category_id:beauty_product_find.beauty_category_id,company:beauty_product.company});
            //     if(check_unique_data)
            //     {
            //         console.log("cth2");
            //         return resp.status(400).send({ message: "This company have already available this category product Name \n so enter unique company name" });
            //     }
            // }

            if (!beauty_product.company && !beauty_product.product_name) {
                check_unique_data = await beautyProductModel.findOne({ beauty_product_name: beauty_product_find.beauty_product_name, beauty_category_id: beauty_cat_id._id, company: beauty_product_find.company });
                if (check_unique_data) {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("cth4");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }

            }

            update.$set.beauty_category_id = beauty_cat_id._id;

        }
        if (req.file) {
            const i_path = path.join(__dirname, '../', 'uploads', beauty_product_find.beauty_image);
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });

            update.$set.beauty_image = image_name;
        }

        const result = await beautyProductModel.updateOne(filter, update);
        // console.log(result.acknowledged);
        if (result.modifiedCount != 0 && result.acknowledged != false) {
            return resp.status(200).send({ message: "Data updated successfully" });
        }
        resp.status(400).send({ message: "Data Not updated" });


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteBeautyProduct = async (req, resp) => {
    try {
        const beauty_product_id = req.params.id;
        const beauty_product_name = await beautyProductModel.findOne({ _id: beauty_product_id });
        // fs.unlinkSync(beauty_product_image);
        const cart_find = await cartModel.findOne({ beauty_product_id: req.params.id });

        if (beauty_product_name == null) {
            return resp.status(400).send({ message: "beauty Product not found" });
        }
        if (cart_find != null) {
            await cartModel.deleteMany({ beauty_product_id: req.params.id });
        }

        const beauty_product_image = beauty_product_name.beauty_image;
        const i_path = path.join(__dirname, '../', 'uploads', beauty_product_image);
        // console.log(i_path);
        fs.unlink(i_path, (err) => {
            if (err) {
                success = false
                return resp.status(400).send({ success, message: err });
            }
        });
        const beauty_product = await beautyProductModel.deleteOne({ _id: beauty_product_id });
        // if(beauty_product.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"beauty Product not found"});
        // }
        // console.log(beauty_product_name.beauty_product_name);
        success = true
        resp.status(200).send({ success })

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.searchBeautyProduct = async (req, resp) => {
    try {

        // 1. method

        const filter = { beauty_product_name: new RegExp(req.params.pname, 'i') };
        const beauty_product = await beautyProductModel.find(filter).populate('beauty_category_id', 'beauty_category_name');

        const all_products = beauty_product.map(products => ({
            _id: products._id,
            product_name: products.beauty_product_name,
            image_name: products.beauty_image,
            amount: products.amount,
            company: products.company,
            beauty_category_name: products.beauty_category_id.beauty_category_name,
            i_path: path.join(__dirname, '../', 'uploads', products.beauty_image),
            hide_status: products.hide_status
        }))


        if (all_products == "") {
            success = false
            return resp.status(400).send({ success, message: "Beauty Product not found" });
        }
        resp.status(200).send(all_products);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.categoryAllProduct = async (req, resp) => {
    try {

        // 1. method
        const catid = req.params.catid;

        const beauty_product = await beautyProductModel.find({ beauty_category_id: catid }).populate('beauty_category_id', 'beauty_category_name');

        const all_products = beauty_product.map(products => ({
            _id: products._id,
            product_name: products.beauty_product_name,
            image_name: products.beauty_image,
            amount: products.amount,
            company: products.company,
            beauty_category_name: products.beauty_category_id.beauty_category_name,
            i_path: path.join(__dirname, '../', 'uploads', products.beauty_image),
            hide_status:products.hide_status
        }))


        if (all_products == "") {
            success = false
            return resp.status(400).send({ success, message: "Beauty Product not found" });
        }
        resp.status(200).send(all_products);



    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.searchCategoryAndProduct = async (req, resp) => {
    try {

        const catid = req.params.catid;
        const pname = req.params.pname


        // 1. method
        const filter = { beauty_product_name: new RegExp(pname, 'i'), beauty_category_id: catid };
        const beauty_product = await beautyProductModel.find(filter).populate('beauty_category_id', 'beauty_category_name');

        const all_products = beauty_product.map(products => ({
            _id: products._id,
            product_name: products.beauty_product_name,
            image_name: products.beauty_image,
            amount: products.amount,
            company: products.company,
            beauty_category_name: products.beauty_category_id.beauty_category_name,
            i_path: path.join(__dirname, '../', 'uploads', products.beauty_image),
            hide_status: products.hide_status
        }))


        if (all_products == "") {
            success = false
            return resp.status(400).send({ success, message: "Beauty Product not found" });
        }
        resp.status(200).send(all_products);



    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.hideUnhideProduct = async (req, resp) => {
    try {
        let success = false;
        const beauty_product_id = req.params.id;
        const beauty_product_find = await beautyProductModel.findOne({ _id: beauty_product_id });
        const beauty_category_find = await beautyCategoryModel.findOne({ _id: beauty_product_find.beauty_category_id });
        // fs.unlinkSync(beauty_product_image);

        if (beauty_product_find == null) {
            success = false
            return resp.status(400).send({ success, message: "beauty Product not found" });
        }

        let result;
        if (beauty_product_find.hide_status == false) {
            result = await beautyProductModel.updateOne(
                {
                    _id: beauty_product_id
                },
                {
                    $set: {
                        hide_status: true
                    }
                }
            )

            const cart_find = await cartModel.find({ "all_cart_data.beauty_product_id": beauty_product_id });
            if (cart_find != null) {
                cart_find.map(async (cart) => {
                    cart.all_cart_data.map(async (product) => {
                        if (product.beauty_product_id == beauty_product_id) {
                            let new_total_amount = cart.total_amount - product.amount;
                            const result = await cartModel.updateOne(
                                {
                                    _id: cart._id,
                                    "all_cart_data.beauty_product_id": beauty_product_id
                                },
                                {
                                    $set: {
                                        "all_cart_data.$.hide_status": true,
                                        total_amount: new_total_amount
                                    }
                                }
                            )
                        }
                    })
                })
            }
        }
        else if (beauty_product_find.hide_status == true) {
            if (beauty_category_find.hide_status == true) {
                return resp.status(400).send({ success, message: `${beauty_category_find.beauty_category_name} category Hide status is true so not change the product hide status false` });
            }
            else {
                result = await beautyProductModel.updateOne(
                    {
                        _id: beauty_product_id
                    },
                    {
                        $set: {
                            hide_status: false
                        }
                    }
                )


                const cart_find = await cartModel.find({ "all_cart_data.beauty_product_id": beauty_product_id });
                if (cart_find != null) {
                    cart_find.map(async (cart) => {
                        cart.all_cart_data.map(async (product) => {
                            if (product.beauty_product_id == beauty_product_id) {
                                let new_total_amount = cart.total_amount + product.amount;
                                const result = await cartModel.updateOne(
                                    {
                                        _id: cart._id,
                                        "all_cart_data.beauty_product_id": beauty_product_id
                                    },
                                    {
                                        $set: {
                                            "all_cart_data.$.hide_status": false,
                                            total_amount: new_total_amount
                                        }
                                    }
                                )
                            }
                        })
                    })
                }
            }
        }

        if (result.modifiedCount != 0) {
            success = true;
            return resp.status(200).send({ success, message: `${beauty_product_find.beauty_product_name} was updated` });
        }
        success = false
        resp.status(400).send({ success, message: `${beauty_product_find.beauty_product_name} was not updated` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}
exports.displayBeautyProductClient = async (req, resp) => {
    try {

        // 1. method
        const beauty_product = await beautyProductModel.find().populate('beauty_category_id', 'beauty_category_name');

        const all_products = beauty_product.map((products) => {

            return {
                _id: products._id,
                product_name: products.beauty_product_name,
                image_name: products.beauty_image,
                amount: products.amount,
                company: products.company,
                beauty_category_name: products.beauty_category_id.beauty_category_name,
                i_path: path.join(__dirname, '../', 'uploads', products.beauty_image),
                hide_status: products.hide_status
            }


        })
        const all_filter_products = all_products.filter((product) => product != null)
        if (all_filter_products == "") {
            success = false
            return resp.status(400).send({ success, message: "Beauty Product not found" });
        }

        resp.send(all_filter_products);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}