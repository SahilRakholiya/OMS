import axios from 'axios'
import React from 'react'

const CartCard = (props) => {

    const { cartdata, deletecart, increment, decrement } = props


    let uid = localStorage.getItem('id');

    const handleRazorPay = (data, cartdata) => {
        const option = {
            key: 'rzp_test_AtkRmtoEgSyEGF',
            amount: data.amount * 100,
            currency: data.currency,
            name: 'MyMeds',
            order_id: data.id,

            handler: function (response) {
                console.log(response)
                axios.post('http://localhost:5000/payment/verify', { response: response })
                    .then((resp) => {
                        console.log(resp);
                        if (resp.data.success === true) {
                            const orderdata = {
                                "all_cart_data": cartdata,
                                "total_amount": cartdata.amount,
                                "razorpay_order_id": resp.data.razorpay_order_id,
                                "razorpay_payment_id": resp.data.razorpay_payment_id
                                
                            }
                            axios.post(`http://localhost:5000/order/insert/${uid}`, orderdata)
                        }
                    })
                    .catch((error) => { console.log(error) })
            }
        }
        const rzp = new window.Razorpay(option)
        rzp.open()
    }


    const handlePayment = (catadata) => {
        const _data = { amount: catadata.amount }
        axios.post('http://localhost:5000/payment/order', _data)
            .then(res => {
                console.log(res.data)
                handleRazorPay(res.data.data, catadata)
            })
            .catch(error => {
                console.log(error)
            })
    }

    let cat = false
    return (
        <div>
            <div className="container my-3 border rounded ">
                <div className="row my-1 p-2">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <img src={"http://127.0.0.1:8887/" + cartdata.image_name} alt="" className='img rounded my-2' height={"200"} />
                            </div>
                            <div className="col">
                                <h5> {cartdata.medicine_name === undefined && cartdata.beauty_product_name === undefined ? cartdata.wellness_product_name : cartdata.wellness_product_name === undefined && cartdata.beauty_product_name === undefined ? cartdata.medicine_name : cartdata.beauty_product_name}</h5>
                                <span>Company : {cartdata.company}</span><br />
                                <span>Category : {cartdata.beauty_category === undefined &&cartdata.wellness_category!==undefined ? cartdata.wellness_category : cartdata.wellness_category === undefined && cartdata.beauty_category !==undefined?  cartdata.beauty_category : cartdata.medicine_name !== '' ? 'No category':'xyz' }</span><br />
                                <span>Price : <span>₹ {cartdata.amount}</span> </span><br />
                                {cartdata.hide_status === true ? <span className='card-text text-danger'>Out of Stock</span> : <span className='card-text text-success'>In Stock</span>}

                                <div className="d-flex border rounded justify-content-between" style={{ width: "175px" }}>
                                    <span className='my-1' style={{ paddingLeft: '12px' }}>Quntity</span>
                                    <div className='border-start'>
                                        <button className='btn-pm' disabled={cartdata.hide_status === true} onClick={() => { increment(cartdata._id) }}><i className="fa-regular fa-plus"></i></button>
                                        <input type="number" name="" id="number" className='form-input' value={cartdata.quantity} readOnly />
                                        <button className='btn-pm' disabled={cartdata.hide_status === true} onClick={() => { decrement(cartdata._id) }}><i className="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>

                                <div className='my-1'>
                                    <button className='btn btn-warning shadow-sm' disabled={cartdata.hide_status === true} onClick={() => handlePayment(cartdata)}>Process to Buy</button>
                                    <span className='text-primary mx-3' style={{ cursor: 'pointer' }} onClick={() => { deletecart(cartdata._id) }}>Delete</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard
