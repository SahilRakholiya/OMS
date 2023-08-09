import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CartCard from './Card/CartCard';
import ProtContext from '../context/productdata/ProtContext';
import Footer from './Footer';
import axios from 'axios';
const Cart = () => {

    const context = useContext(ProtContext)
    const { cart_data, displaycart, deletecart, decrement, increment } = context

    let navigate = useNavigate();

    useEffect(() => {
        document.title = "MyMeds - Cart"
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            displaycart()
        }
        // eslint-disable-next-line
    }, [])

    let uid = localStorage.getItem('id');

    const handleRazorPay = (data, cartdata) => {

        let t_amount, all_data;

        cartdata.map((pro) => {
            all_data = pro.all_cart_data;
            t_amount = pro.total_amount;
        })

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
                                "all_cart_data": all_data,
                                "total_amount": t_amount,
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
        let _data;
        catadata.map((pro) => {
            _data = { amount: pro.total_amount }
        })
        axios.post('http://localhost:5000/payment/order', _data)
            .then(res => {
                console.log(res.data)
                handleRazorPay(res.data.data, catadata)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="container">
                <p>MyMeds.com &gt; Cart</p>
                <h2>Shopping Cart</h2>
                <div className="container">
                    {cart_data.length === 0 ? "No data found" : cart_data.map(cart => {
                        return cart.all_cart_data.map((cartdata) => {
                            return <div key={cartdata._id}>
                                <CartCard key={cartdata._id} cartdata={cartdata} deletecart={deletecart} decrement={decrement} increment={increment} />
                            </div>
                        })
                    })}
                </div>
                <br />
                <div className='container '>
                    <div className='d-flex justify-content-end'>
                        <span className='text-danger fw-bold p-2 fs-5'>Total Price : ₹ {cart_data.map(cartdata => {
                            return cartdata.total_amount
                        })}</span>
                        <button className="btn btn-success" onClick={() => handlePayment(cart_data)}>Process To Buy</button>
                    </div>
                </div>
                <br />
            </div>
            <Footer />
        </>
    )
}

export default Cart
