import React from 'react'

const OrderDataCard = (props) => {
    const {o}= props
    return (
        <div>
            <div className="d-flex border rounded bg-light">
                <div className="p-3">
                    <img src={"http://127.0.0.1:8887/" + o.image_name} alt="" className='img rounded my-2' style={{ height: "30vh" }} />
                </div>
                <div className="fs-5 m-5 p-4">
                    <h5> {o.medicine_name === undefined && o.beauty_product_name === undefined ? o.wellness_product_name : o.wellness_product_name === undefined && o.beauty_product_name === undefined ? o.medicine_name : o.beauty_product_name}</h5>
                    <span>Category : {o.beauty_category === undefined && o.wellness_category !== undefined ? o.wellness_category : o.wellness_category === undefined && o.beauty_category !== undefined ? o.beauty_category : o.medicine_name !== '' ? 'No category' : 'xyz'} </span><br />
                    <span>Price : <span>₹ {o.amount}</span> </span><br />
                    <span>Quantity : {o.quantity}</span><br />
                    <span>Company : {o.company}</span><br />
                    {/* <button className='btn btn-warning my-4'>Buy it Again</button>
                                    <span className='text-primary p-3 fs-6'>Cancel order</span> */}
                </div>
            </div>
        </div>
    )
}

export default OrderDataCard
