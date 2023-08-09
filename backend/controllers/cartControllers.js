const cartModel = require('../models/cart');
const userModel = require('../models/user');
const medicineModel = require('../models/medicine'); 3
const wellnessCategoryModel = require('../models/wellness_category');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');
const path = require('path');
const { model } = require('mongoose');

let success = false
// For Admin side 
exports.displayAllUsercart = async (req, resp) => {
    try {

        const cart = await cartModel.find()
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');

        if (cart == "") {
            return resp.status(400).send({ message: "No Products are Available" });
        }

        const all_cart_data = cart.map(product => {
            if (product.medicine_id) {
                return {
                    _id: product._id,
                    name: product.user_id.name,
                    medicine_name: product.medicine_id.medicine_name,
                    amount: product.amount
                }
            }
            else {
                if (product.wellness_product_id)
                    return {
                        _id: product._id,
                        name: product.user_id.name,
                        wellness_product_name: product.wellness_product_id.wellness_product_name,
                        amount: product.amount
                    }
                else {
                    if (product.beauty_product_id)
                        return {
                            _id: product._id,
                            name: product.user_id.name,
                            beauty_product_name: product.beauty_product_id.beauty_product_name,
                            amount: product.amount
                        }
                }
            }
        })

        resp.status(200).send(all_cart_data);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.searchAllUsercart = async (req, resp) => {
    try {
        const pname = req.params.pname;

        const cart_find = await cartModel.find()
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');
        // console.log(user_cart);

        const all_cart = cart_find.map(cart => {
            if (cart.medicine_id != null && cart.medicine_id.medicine_name == pname) {
                return {
                    _id: cart._id,
                    name: cart.user_id.name,
                    medicine_name: cart.medicine_id.medicine_name,
                    amount: cart.amount
                }
            }
            else {
                if (cart.wellness_product_id != null && cart.wellness_product_id.wellness_product_name == pname)
                    return {
                        _id: cart._id,
                        name: cart.user_id.name,
                        wellness_product_name: cart.wellness_product_id.wellness_product_name,
                        amount: cart.amount
                    }
                else {
                    if (cart.beauty_product_id != null && cart.beauty_product_id.beauty_product_name == pname)
                        return {
                            _id: cart._id,
                            name: cart.user_id.name,
                            beauty_product_name: cart.beauty_product_id.beauty_product_name,
                            amount: cart.amount
                        }
                }
            }
        })

        const cart_filter = all_cart.filter(cart => cart != null);
        if (cart_filter == "") {
            return resp.status(400).send({ message: "Product not found" });
        }

        // console.log(cart_filter);
        resp.status(200).send(cart_filter);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


// if admin require perticular user cart product delete then this api call


// exports.deletecart = async (req, resp) => {
//     try {
//         const cart_find = await cartModel.findOne({ _id: req.params.id });

//         if (cart_find == null) {
//             return resp.status(400).send({ message: "Product not found" });
//         }
//         // console.log(cart_find);
//         let product="";
//         if(cart_find.medicine_id)
//         {
//             const medicine_product = await medicineModel.findOne({_id:cart_find.medicine_id});
//             if(medicine_product==null)
//             {
//                 return resp.status(400).send({ message: "Medicine Not found " });
//             }

//             // console.log(medicine_product);
//             product=medicine_product.medicine_name;
//         }
//         else{
//             if(cart_find.wellness_product_id)
//             {
//                 const wellness_product=await wellnessProductModel.findOne({_id:cart_find.wellness_product_id});
//                 if(wellness_product==null)
//                 {
//                     return resp.status(400).send({ message: "Wellness Product Not found " });
//                 }

//                 product=wellness_product.wellness_product_name;
//             }
//             else{
//                 if(cart_find.beauty_product_id)
//                 {
//                     const beauty_product=await beautyProductModel.findOne({_id:cart_find.beauty_product_id});
//                     if(beauty_product==null)
//                     {
//                         return resp.status(400).send({ message: "Beauty Product Not found " });
//                     }

//                     product=beauty_product.beauty_product_name;                    
//                 }
//             }
//         }

//         const cart = await cartModel.deleteOne({ _id: req.params.id });

//         resp.status(200).send({ message: `${product} was deleted` });    // .

//     } catch (err) {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }





// For Client side
exports.displaycart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const user = await userModel.find({ _id: uid });
        const cart = await cartModel.find({ user_id: uid })
            // .populate('user_id', 'name')
            .populate('all_cart_data.medicine_id', 'medicine_name medicine_image company ')
            .populate('all_cart_data.wellness_product_id', 'wellness_product_name wellness_image company ')
            .populate({
                path: 'all_cart_data.wellness_product_id',
                populate: {
                    path: 'wellness_category_id'
                }
            })
            .populate('all_cart_data.beauty_product_id', 'beauty_product_name beauty_image company')
            .populate({
                path: 'all_cart_data.beauty_product_id',
                populate: {
                    path: 'beauty_category_id'
                }
            })
        // .select('_id medicine_id wellness_product_id beauty_product_id quantity amount');

        if (user == "") {
            // resp.status(400).send({message:"Users not found"});
            success = false;
            resp.status(400).send({ success,message: "user not found" });
            return;
        }

        if (cart == "") {
            success = false
            return resp.status(400).send({ success,message: "No Products are Available" });
        }
        // resp.send(cart);
        // return  console.log(cart);

        const all_cart_data = cart.map(product => {
            // console.log(product)
            const all_data = product.all_cart_data.map((cart) => {
                if (cart.medicine_id) {
                    return {
                        _id: cart._id,
                        // name: cart.user_id.name,
                        medicine_id: cart.medicine_id._id,
                        medicine_name: cart.medicine_id.medicine_name,
                        quantity: cart.quantity,
                        image_name: cart.medicine_id.medicine_image,
                        amount: cart.amount,
                        company: cart.medicine_id.company,
                        i_path: path.join(__dirname, '../', 'uploads', cart.medicine_id.medicine_image),
                        hide_status: cart.hide_status
                    }
                }
                else {
                    if (cart.wellness_product_id ) {
                        // const well_cat_name= wellnessCategoryModel.findOne({_id:product.wellness_product_id.wellness_category_id});
                        // console.log(well_cat_name.wellness_category_name);
                        return {
                            _id: cart._id,
                            // name: product.user_id.name,
                            wellness_product_id: cart.wellness_product_id._id,
                            wellness_product_name: cart.wellness_product_id.wellness_product_name,
                            quantity: cart.quantity,
                            image_name: cart.wellness_product_id.wellness_image,
                            amount: cart.amount,
                            company: cart.wellness_product_id.company,
                            wellness_category: cart.wellness_product_id.wellness_category_id.wellness_category_name,
                            i_path: path.join(__dirname, '../', 'uploads', cart.wellness_product_id.wellness_image),
                            hide_status: cart.hide_status
                        }
                    }

                    else {
                        if (cart.beauty_product_id) {
                            return {
                                _id: cart._id,
                                // name: product.user_id.name,
                                beauty_product_id: cart.beauty_product_id._id,
                                beauty_product_name: cart.beauty_product_id.beauty_product_name,
                                quantity: cart.quantity,
                                image_name: cart.beauty_product_id.beauty_image,
                                amount: cart.amount,
                                company: cart.beauty_product_id.company,
                                beauty_category: cart.beauty_product_id.beauty_category_id.beauty_category_name,
                                i_path: path.join(__dirname, '../', 'uploads', cart.beauty_product_id.beauty_image),
                                hide_status: cart.hide_status
                            }
                        }

                    }
                }

            })
            return {
                _id: product._id,
                all_cart_data: all_data,
                total_amount: product.total_amount
            }

        })

        // const t_amount = all_cart_data.reduce((sum, product) => sum + product.amount, 0)

        // const final_product_data = {
        //     all_cart_data,
        //     t_amount
        // }
        // final_product_data.all_cart_data.map((product) => {
        //     console.log(product);
        // })


        // all_cart_data.map((product) => {
        //     console.log(all_cart_data)
        //     // product.all_cart_data.map((cart)=>{
        //     //     console.log(cart);
        //     // });

        // })

        const filter_data=all_cart_data.map((cart)=>{
            const product_filter=cart.all_cart_data.filter((product)=>product!=null);

            return {
                _id: cart._id,
                all_cart_data: product_filter,
                total_amount: cart.total_amount
            }
        })

        resp.status(200).send(filter_data);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.insertcart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const pid = req.body.p_id;

        const user_find = await userModel.findOne({ _id: uid });
        // const cart_user_find = await cartModel.findOne({user_id:user_find._id});
        // .populate('user_id','name')
        // .populate('medicine_id','medicine_name')
        // .populate('wellness_product_id','wellness_product_name')
        // .populate('beauty_product_id','beauty_product_name')

        if (user_find == null) {
            return resp.status(400).send({ message: "Please enter valid user." });
        }

        const cid = await cartModel.findOne({ user_id: uid });


        if (cid == null) {
            const newcart = new cartModel({
                user_id: uid
            })
            const medicine = await medicineModel.findOne({ _id: pid });
            if (medicine) {
                const check = await cartModel.findOne({ user_id: uid, medicine_id: pid })

                if (check == null) {
                    newcart.all_cart_data = [{
                        medicine_id: medicine._id,
                        amount: medicine.amount
                    }]
                    newcart.total_amount = medicine.amount
                }
                else {
                    return resp.status(400).send({ message: "Medicine already availble in to the cart " });
                }
            }
            else {
                const wellness_product = await wellnessProductModel.findOne({ _id: pid });

                if (wellness_product) {
                    const check = await cartModel.findOne({ user_id: uid, wellness_product_id: pid })

                    if (check == null) {
                        newcart.all_cart_data = [{
                            wellness_product_id: wellness_product._id,
                            amount: wellness_product.amount
                        }];

                        newcart.total_amount = wellness_product.amount;
                    }
                    else {
                        return resp.status(400).send({ message: "Wellness Product already availble in to the cart " });
                    }
                }
                else {
                    const beauty_product = await beautyProductModel.findOne({ _id: pid });
                    if (beauty_product) {
                        const check = await cartModel.findOne({ user_id: uid, beauty_product_id: pid })
                        if (check == null) {
                            newcart.all_cart_data = [{
                                beauty_product_id: beauty_product._id,
                                amount: beauty_product.amount,
                            }]
                            newcart.total_amount = beauty_product.amount;
                        }
                        else {
                            return resp.status(400).send({ message: "Beauty Product already availble in to the cart " });
                        }
                    }
                    else {
                        return resp.status(400).send({ message: "Please select Medicine or wellness product or beauty products" });
                    }
                }
            }
            result = await newcart.save();
            resp.status(200).send(result);

        }
        else {
            let add_cart, t_amount;
            const medicine = await medicineModel.findOne({ _id: pid });
            if (medicine) {
                const check = cid.all_cart_data.find((data) => data.medicine_id == pid);
                if (!check) {
                    add_cart = {
                        medicine_id: medicine._id,
                        amount: medicine.amount,
                    };
                    t_amount = cid.total_amount + medicine.amount;
                }
                else {
                    return resp.status(400).send({ message: "Medicine already availble in to the cart " });
                }
            }
            else {
                const wellness_product = await wellnessProductModel.findOne({ _id: pid });

                if (wellness_product) {
                    const check = cid.all_cart_data.find((data) => data.wellness_product_id == pid);

                    if (!check) {
                        add_cart = {
                            wellness_product_id: wellness_product._id,
                            amount: wellness_product.amount,
                        };
                        t_amount = cid.total_amount + wellness_product.amount;
                    }
                    else {
                        return resp.status(400).send({ message: "Wellness Product already availble in to the cart " });
                    }
                }
                else {
                    const beauty_product = await beautyProductModel.findOne({ _id: pid });
                    if (beauty_product) {
                        const check = cid.all_cart_data.find((data) => data.beauty_product_id == pid);
                        if (!check) {
                            add_cart = {
                                beauty_product_id: beauty_product._id,
                                amount: beauty_product.amount,
                            };
                            t_amount = cid.total_amount + beauty_product.amount;
                        }
                        else {
                            return resp.status(400).send({ message: "Beauty Product already availble in to the cart " });
                        }
                    }
                    else {
                        return resp.status(400).send({ message: "Please select Medicine or wellness product or beauty products" });
                    }
                }
            }
            const result = await cartModel.updateOne(
                {
                    _id: cid._id
                },
                {
                    $push: {
                        all_cart_data: add_cart
                    },
                    $set: {
                        total_amount: t_amount
                    }

                }
            )
            if (result.modifiedCount != 0) {
                return resp.status(200).send({ message: "Product add to cart" });
            }
            resp.status(400).send({ message: "Product Not add to cart" });


        }

        // const medicine = await medicineModel.findOne({ _id: pid });
        // if (medicine) {
        //     const check = await cartModel.findOne({ user_id: uid, medicine_id: medicine._id })

        //     if (check == null) {
        //         newcart.medicine_id = medicine._id;
        //         newcart.amount = medicine.amount;

        //     }
        //     else {
        //         return resp.status(400).send({ message: "Medicine already availble in to the cart " });
        //     }
        // }
        // else {
        //     const wellness_product = await wellnessProductModel.findOne({ _id: pid });

        //     if (wellness_product) {
        //         const check = await cartModel.findOne({ user_id: uid, wellness_product_id: wellness_product._id })

        //         if (check == null) {
        //             newcart.wellness_product_id = wellness_product._id;
        //             newcart.amount = wellness_product.amount;

        //         }
        //         else {
        //             return resp.status(400).send({ message: "Wellness Product already availble in to the cart " });
        //         }
        //     }
        //     else {
        //         const beauty_product = await beautyProductModel.findOne({ _id: pid });
        //         if (beauty_product) {
        //             const check = await cartModel.findOne({ user_id: uid, beauty_product_id: beauty_product._id })

        //             if (check == null) {
        //                 newcart.beauty_product_id = beauty_product._id;
        //                 newcart.amount = beauty_product.amount;

        //             }
        //             else {
        //                 return resp.status(400).send({ message: "Beauty Product already availble in to the cart " });
        //             }
        //         }
        //         else {
        //             return resp.status(400).send({ message: "Please select Medicine or wellness product or beauty products" });
        //         }
        //     }
        // }




    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}




exports.incrementQuantity = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const bid = req.params.blockid;

        // console.log(cid,bid);

        const data = await cartModel.findOne({ user_id: uid });
        if (data == null) {
            return resp.status(400).send({ message: "cart id is not valid" });
        }


        const check = data.all_cart_data.find((data) => data._id ==bid);


        // new quantity
        console.log(check);
        let update_quantity = check.quantity + 1;

        // caluculate new price
        const one_quantity_price = check.amount / check.quantity;
        let update_amount = one_quantity_price * update_quantity;

        // new total amount
        let t_amount,add_cart;

        if (check!=null) {
            add_cart = {
                quantity: update_quantity,
                amount: update_amount,
            };
            // console.log(data.total_amount,update_amount,check.amount)
            t_amount = data.total_amount + update_amount - check.amount;
        }
        // console.log(t_amount);
        else {
            return resp.status(400).send({ message: "Please enter valid id" });
        }

        // console.log(cid);
        const result = await cartModel.updateOne(
            {
                user_id: uid,
                "all_cart_data._id":bid
            },
            {
                $set: {
                    "all_cart_data.$.amount":update_amount,
                    "all_cart_data.$.quantity":update_quantity,
                    total_amount: t_amount
                }

            }
        )

        if (result.modifiedCount != 0) {
            return resp.status(200).send({ message: "quantity updated" });
        }
        resp.status(400).send({ message: "quantity not updated" });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.decrementQuantity = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const bid = req.params.blockid;
        
        const data = await cartModel.findOne({ user_id: uid });
        if (data == null) {
            return resp.status(400).send({ message: "cart id is not valid" });
        }

        const check = data.all_cart_data.find((data) => data._id ==bid);


        // new quantity
        let update_quantity = check.quantity - 1;

        // caluculate new price
        const one_quantity_price = check.amount / check.quantity;
        let update_amount = one_quantity_price * update_quantity;

        // new total amount
        let t_amount,add_cart;

        if (check!=null) {
            if(check.quantity ==1){
                success=false
                return resp.status(400).send(success)
            }
            add_cart = {
                quantity: update_quantity,
                amount: update_amount,
            };
            // console.log(data.total_amount,update_amount,check.amount)
            t_amount = data.total_amount + update_amount - check.amount;
        }
        // console.log(t_amount);
        else {
            return resp.status(400).send({ message: "Please enter valid id" });
        }

        // console.log(cid);
        const result = await cartModel.updateOne(
            {
                user_id: uid,
                "all_cart_data._id":bid
            },
            {
                $set: {
                    "all_cart_data.$.amount":update_amount,
                    "all_cart_data.$.quantity":update_quantity,
                    total_amount: t_amount
                }

            }
        )


        // // new quantity
        // let update_quantity = data.quantity - 1;

        // // caluculate new price
        // const one_quantity_price = data.amount / data.quantity;
        // let update_amount = one_quantity_price * update_quantity;

        // const result = await cartModel.updateOne(
        //     {
        //         _id: cid
        //     },
        //     {
        //         $set: {
        //             quantity: update_quantity,
        //             amount: update_amount
        //         }

        //     }
        // )

        if (result.modifiedCount != 0) {
            return resp.status(200).send({ message: "quantity updated" });
        }
        resp.status(400).send({ message: "quantity not updated" });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// updated name

// exports.updatecart = async (req, resp) => {
//     try {
//         const cart_id = req.params.id;

//         const cart_search = await cartModel.findOne({ _id: cart_id });

//         if (!cart_search) {
//             return resp.status(400).send({ message: "cart not found" });
//         }

//         cartModel.updateOne({ _id: cart_id }, {
//             $set: {
//                 cart_name: req.body.name
//             }
//         }, (err, cart_update) => {
//             resp.status(500).send(cart_update);
//         })

//     } catch (err) {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }
exports.deletecart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const bid = req.params.blockid;

        // const user_cart = await cartModel.findOne({ user_id: uid });


        const cart_find = await cartModel.findOne({ user_id: uid, "all_cart_data._id": bid });
        if (cart_find == null) {
            return resp.status(400).send({ message: "Product not found" });
        }


        let amount = cart_find.all_cart_data.map((product) => {
            if(product._id==bid)
            {
                return product.amount;
            }
        })

        let [new_amount]=amount.filter(data=>data!=undefined);

        let new_total_amount = cart_find.total_amount - [new_amount];
        console.log(new_total_amount);

        const result = await cartModel.updateOne(
            {
                user_id: uid
            },
            {
                $pull: {
                    all_cart_data: {
                        _id: bid
                    }
                },
                $set: {
                    total_amount: new_total_amount
                }
            }
        )

        if (result.modifiedCount != 0) {
            return resp.status(200).send({ message: "Product deleted" });    // .
        }
        resp.status(400).send({ success,message: "Product Not deleted" });    // .

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.searchcart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const pname = req.body.product_name;

        const user_cart = await cartModel.find({ user_id: uid })
            .populate('all_cart_data.medicine_id', 'medicine_name medicine_image company ')
            .populate('all_cart_data.wellness_product_id', 'wellness_product_name wellness_image company ')
            .populate({
                path: 'all_cart_data.wellness_product_id',
                populate: {
                    path: 'wellness_category_id'
                }
            })
            .populate('all_cart_data.beauty_product_id', 'beauty_product_name beauty_image company')
            .populate({
                path: 'all_cart_data.beauty_product_id',
                populate: {
                    path: 'beauty_category_id'
                }
            })
        // .select('_id medicine_id wellness_product_id beauty_product_id quantity amount');
        // console.log(user_cart);
        if (user_cart == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "user not found" });
            return;
        }
        const cart_search = user_cart.map(product => {
            const all_data = product.all_cart_data.map((cart) => {
                if (cart.medicine_id != null && cart.medicine_id.medicine_name == pname) {
                    // console.log(cart.medicine_id,cart.medicine_id.medicine_name,pname);
                    return {
                        _id: cart._id,
                        // name: product.user_id.name,
                        medicine_id: cart.medicine_id._id,
                        medicine_name: cart.medicine_id.medicine_name,
                        quantity: cart.quantity,
                        image_name: cart.medicine_id.medicine_image,
                        amount: cart.amount,
                        company: cart.medicine_id.company,
                        i_path: path.join(__dirname, '../', 'uploads', cart.medicine_id.medicine_image)

                    }
                }
                else {
                    if (cart.wellness_product_id != null && cart.wellness_product_id.wellness_product_name == pname)
                        return {
                            _id: cart._id,
                            // name: product.user_id.name,
                            wellness_product_id: cart.wellness_product_id._id,
                            wellness_product_name: cart.wellness_product_id.wellness_product_name,
                            quantity: cart.quantity,
                            image_name: cart.wellness_product_id.wellness_image,
                            amount: cart.amount,
                            company: cart.wellness_product_id.company,
                            wellness_category: cart.wellness_product_id.wellness_category_id.wellness_category_name,
                            i_path: path.join(__dirname, '../', 'uploads', cart.wellness_product_id.wellness_image)

                        }
                    else {
                        if (cart.beauty_product_id != null && cart.beauty_product_id.beauty_product_name == pname)
                            return {
                                _id: cart._id,
                                // name: product.user_id.name,
                                beauty_product_id: cart.product.beauty_product_id._id,
                                beauty_product_name: cart.beauty_product_id.beauty_product_name,
                                quantity: cart.quantity,
                                image_name: cart.beauty_product_id.beauty_image,
                                amount: cart.amount,
                                company: cart.beauty_product_id.company,
                                beauty_category: cart.beauty_product_id.beauty_category_id.beauty_category_name,
                                i_path: path.join(__dirname, '../', 'uploads', 'beauty_product', cart.beauty_product_id.beauty_image)

                            }
                    }
                }

            })
            return {
                _id: product._id,
                all_cart_data: all_data,
                total_amount: product.total_amount
            }
        })

        const cart_filter = cart_search.map((product) => {
            const filtercart = product.all_cart_data.filter((cart) => cart != null);
            return {
                _id: product._id,
                all_cart_data: filtercart,
                total_amount: product.total_amount
            }

        });
        if (cart_filter == "") {
            return resp.status(400).send({ message: "Product not found" });
        }

        // console.log(cart_filter);
        resp.status(200).send(cart_filter);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}