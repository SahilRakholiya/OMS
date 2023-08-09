import React from 'react'

const WellnessCard = (props) => {
    const { wellness, deleteWellnessProduct, updatePro ,hide} = props
    const id = wellness._id
    // const imageurl = process.env.REACT_APP_BEAUTY_IMAGE + wellness.image_name;
    return (
        <div className='beauty-card-box'>
            <div className="card my-2" style={{ width: '18vw' }} >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '83%', zIndexd: '1' }}></span>
                </div>

                <img src={'http://127.0.0.1:8887/' + wellness.image_name} alt="product_image" className='card-img-top' style={{ height: '25vh' }} />
                
                <div className="card-body p-0 m-2">
                    <h6 className="card-title">{wellness.product_name.length > 20 ? wellness.product_name.slice(0, 30) + '...' : wellness.product_name}</h6>
                    <span>Company : {wellness.company.length > 20 ? wellness.company.slice(0, 20) + '...' : wellness.company}</span><br />
                    <span>Amount : ₹{wellness.amount}</span><br />
                    <span>Category : {wellness.wellness_category_name}</span>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-primary" onClick={() => { updatePro(wellness) }}><i className="fa-regular fa-pen-to-square" style={{ color: "#ffffff" }}></i></button>
                        <button className='btn btn-sm btn-warning' onClick={() => { hide(id) }}>{wellness.hide_status === false ? "Hide" : "Unhide"}</button>
                        <button className="btn btn-sm btn-danger" onClick={() => { deleteWellnessProduct(id) }}><i className="fa-solid fa-trash" style={{ color: "#ffffff" }}></i></button>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default WellnessCard
