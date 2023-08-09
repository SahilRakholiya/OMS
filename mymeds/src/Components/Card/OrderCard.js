import axios from 'axios'
import { saveAs } from 'file-saver'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const OrderCard = (props) => {
    const { orderdata,cancel } = props

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
    const handletrack = () => {
        navigate('/trackorder')
        localStorage.setItem('oid', orderdata._id)
    }

    const ref = useRef(null)

    const refClose = useRef(null)
    const [feedbackdata, setfeeddata] = useState({ topic: '', description: '' })

    const onChange = (e) => {
        setfeeddata({ ...feedbackdata, [e.target.name]: e.target.value })
    }

    let uid = localStorage.getItem('id')

    const handleToClick = async (e) => {
        e.preventDefault();
        const { topic, description } = feedbackdata
        const response = await fetch(`http://localhost:5000/feedback/insert/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ topic, description })
        })
        const respo = await response.json()
        if (respo.success === false) {
            swal({
                text: respo.data.message,
                icon: "warning",
                buttons: false,
                timer: 1500
            });
            refClose.current.click()
        } else {
            swal({
                text: "Feedback successfully submited",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        }
        setfeeddata({ topic: '', description: '' })
        refClose.current.click()
    }

    const feedback = (e) => {
        ref.current.click()
    }

    function handleinvoice(id) {
        axios.get(`http://localhost:5000/pdf/invoice_download/${id}`, { responseType: 'blob' })
            .then((response) => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Invoice_${id}.pdf`);
                document.body.appendChild(link);
                link.click();
                // const pdfBlob = new Blob([response.data],{type:'applicatoin/pdf'})
                // saveAs(pdfBlob,`Invoice_${id}.pdf`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

   
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
                            <button className='btn btn-trasparent text-primary p-0 m-0 border-0' onClick={() => { handleinvoice(orderdata._id) }}>Invoice</button>
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
                                <span className='pt-3'>Dispatch Order : {orderdata.dispatch === true ? <span className='text-success'>Order Dispatch</span> : <span className='text-danger'>Order Not Dispatch</span>}</span>
                                <div className='my-2'>
                                    {/* <button className='btn btn-warning shadow-sm'>Buy it again</button> */}
                                    <button className='btn btn-light mx-3 border shadow-sm' onClick={handleorder}>View your item</button>
                                    <button className='btn btn-transparent border-0 text-danger' onClick={()=>{cancel(orderdata._id)}}>Cancel order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 p-5 d-flex flex-column">
                        <button className='btn btn-light mx-3 border w-100 shadow-sm' onClick={handletrack}>Track package</button>
                        <button className='btn btn-light mx-3 border w-100 my-3 shadow-sm' onClick={feedback} >feedback</button>
                    </div>
                </div>
            </div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">FeedBack</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <input type="text" className="form-control" id="topic" name="topic" value={feedbackdata.topic} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows="4" cols="50" className="form-control" id="description" name="description" value={feedbackdata.description} onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleToClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
