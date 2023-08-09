import React from 'react'
import './cardstyle.css'
const MedicineCard = (props) => {
    const { medi ,deleteMedicineProduct,updatePro,hide} = props
    const id = medi._id

    return (
        <div className='beauty-card-box'>
            <div className="card my-2" style={{ width: '18vw' }} >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '83%', zIndexd: '1' }}></span>
                </div>

                <img src={'http://127.0.0.1:8887/' + medi.image_name} alt="product_image" className='card-img-top' style={{ height: '25vh' }} />
                <div className="card-body p-0 m-2">
                    <h6 className="card-title">{medi.product_name.length > 20 ? medi.product_name.slice(0, 30) + '...' : medi.product_name}</h6>
                    <span>Company : {medi.company.length > 20 ? medi.company.slice(0, 20) + '...' : medi.company}</span><br />
                    <span>Amount : ₹{medi.amount}</span><br />
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-primary" onClick={()=>{updatePro(medi)}}><i className="fa-regular fa-pen-to-square" style={{ color: "#ffffff" }}></i></button>
                        <button className='btn btn-sm btn-warning' onClick={() => { hide(id) }}>{medi.hide_status === false ? "Hide" : "Unhide"}</button>
                        <button className="btn btn-sm btn-danger" onClick={()=>{deleteMedicineProduct(id)}}><i className="fa-solid fa-trash" style={{ color: "#ffffff" }}></i></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MedicineCard
