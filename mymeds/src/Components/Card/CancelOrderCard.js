import React from 'react'

const CancelOrderCard = (props) => {
    const { orderdata } = props

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
    return (
        <div>
            <div className="container my-3 border rounded ">
                <div className="row p-2 border-bottom bg-light rounded-top">
                    <div className="col-9 d-flex">
                        <div className='col-3'>
                            <p>ORDER PLACED</p>
                            <p>{orderdata.date.split("", 10)}</p>
                        </div>
                        <div className='col-3'>
                            <p>TOTAL</p>
                            <p>₹ {orderdata.order_total_amount}</p>
                        </div>
                        <div className='col-3'>
                            <p>SHIP TO</p>
                            <p>{orderdata.user_name}</p>
                        </div>
                    </div>
                    <div className="col-3 text-end">
                        <div>
                            <p>ORDER # {orderdata._id}</p>
                        </div>
                    </div>
                </div>
                <div className="row my-1">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <img src={'http://127.0.0.1:8887/' + iname[0]} alt="" className='img rounded my-2' height={"200"} />
                            </div>
                            <div className="col my-4">
                                <h5>{newpro}</h5>
                                <span className='pt-3'>Phone No. : {orderdata.phone_number}</span><br />
                                <span className='pt-3'>Email : {orderdata.email}</span><br />
                                <span className='pt-3'>Address : {orderdata.address}, {orderdata.city}, {orderdata.state}, {orderdata.pincode}</span><br />
                                <span className='pt-3'>Payment Id : {orderdata.razorpay_payment_id}</span><br />
                                <span className='pt-3'>Order Status : <span className='text-danger'>Cancelled Order</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CancelOrderCard
