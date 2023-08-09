import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const OrderCard = (props) => {
    const { orderdata, dispatch, deliveryotp } = props
    const order = orderdata.orders.map((order) => {
        if (order.medicine_name !== undefined) {
            return { pname: order.medicine_name, iname: order.image_name }
        }
        if (order.wellness_product_name !== undefined) {
            return { pname: order.wellness_product_name, iname: order.image_name }
        }
        if (order.beauty_product_name !== undefined) {
            return { pname: order.beauty_product_name, iname: order.image_name }
        }
    })

    let pname = order.map((o) => { return o.pname })
    let iname = order.map((o) => { return o.iname })
    let newpro = pname[0] + '...'

    let navigate = useNavigate()

    const handleorder = () => {
        navigate('/orderdata')
        localStorage.setItem('oid', orderdata._id)
    }

    return (
        <div>
            <div className="container my-3 border rounded ">
                <div className="row p-2 border-bottom bg-light rounded-top">
                    <div className="col-9 d-flex">
                        <div className='col-3'>
                            <span>ORDAR PLACED</span><br />
                            <span>{orderdata.date.split("", 10)}</span>
                        </div>
                        <div className='col-3'>
                            <span>TOTAL</span><br />
                            <span>₹ {orderdata.order_total_amount}</span>
                        </div>
                        <div className='col-3'>
                            <span>SHIP TO</span><br />
                            <span>{orderdata.user_name}</span>
                        </div>
                    </div>
                    <div className="col-3 text-end">
                        <div>
                            <span>OREDER # {orderdata._id}</span><br />

                        </div>
                    </div>
                </div>
                <div className="row my-1">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <img src={'http://127.0.0.1:8887/' + iname[0]} alt="" className='img rounded my-2' height={"200"} />
                            </div>
                            <div className="col">
                                <h5>{newpro}</h5>
                                <span className='pt-3'>Phone No. : {orderdata.phone_number}</span><br />
                                <span className='pt-3'>Email : {orderdata.email}</span><br />
                                <span className='pt-3'>Address : {orderdata.address}, {orderdata.city}, {orderdata.state}, {orderdata.pincode}</span><br />
                                <span className='pt-3'>Payment Id : {orderdata.razorpay_payment_id}</span><br />
                                <span className='pt-3'>Dispatch Order : {orderdata.dispatch === true ? <span className='text-success'>Order Dispatch</span> : <span className='text-danger'>Order Not Dispatch</span>}</span><br />
                                <span className='pt-3'>Cancel Status : {orderdata.cancel_status === true ? <span className='text-danger'>Order Cancel</span> : <span className='text-success'>Order Not Cancel</span>}</span>
                                <div className='my-2'>
                                    <button className='btn btn-light border shadow-sm' onClick={handleorder}>View your item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 p-5 d-flex flex-column">
                        <button className='btn btn-light mx-3 border w-100 shadow-sm' disabled={orderdata.cancel_status === true} onClick={() => dispatch(orderdata._id)}>Dispatch Order</button>
                        <button className='btn btn-light mx-3 border w-100 shadow-sm my-3' disabled={orderdata.dispatch === false} onClick={() => deliveryotp(orderdata._id)}>Send OTP</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
