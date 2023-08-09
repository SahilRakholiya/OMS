import React, { useEffect } from 'react'
import './cardstyle.css'

import swal from 'sweetalert'
const BeautyCard = (props) => {
    const { bpro, deleteBeautyProduct, updatePro, hide } = props
    const id = bpro._id
    // const imageurl = process.env.REACT_APP_BEAUTY_IMAGE + bpro.image_name;

    return (
        <div className='beauty-card-box'>
            <div className="card my-2" style={{ width: '18vw' }} >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '83%', zIndexd: '1' }}></span>
                </div>

                <img src={'http://127.0.0.1:8887/' + bpro.image_name} alt="product_image" className='card-img-top' style={{ height: '25vh' }} />
                <div className="card-body p-0 m-2">
                    <h6 className="card-title">{bpro.product_name.length > 20 ? bpro.product_name.slice(0, 30) + '...' : bpro.product_name}</h6>
                    <span>Company : {bpro.company.length > 20 ? bpro.company.slice(0, 20) + '...' : bpro.company}</span><br />
                    <span>Amount : ₹{bpro.amount}</span><br />
                    <span>Category : {bpro.beauty_category_name}</span>
                    <div className="d-flex justify-content-between">
                        <button href="/" className="btn btn-sm btn-primary" onClick={() => { updatePro(bpro) }}><i className="fa-regular fa-pen-to-square" style={{ color: "#ffffff" }}></i></button>
                        <button className='btn btn-sm btn-warning' onClick={() => { hide(id) }}>{bpro.hide_status === false ? "Hide" : "Unhide"}</button>
                        <button href="/" className="btn btn-sm btn-danger" onClick={() => { deleteBeautyProduct(id) }}><i className="fa-solid fa-trash" style={{ color: "#ffffff" }}></i></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BeautyCard