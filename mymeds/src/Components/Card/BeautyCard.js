import React from 'react'

const BeautyCard = (props) => {
  const { beauty, addtocart } = props


  return (
    <div>
      <div className="contianer border rounded p-2 my-2" style={{ width: '18vw' }} >
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger" style={{ left: '83%', zIndexd: '1' }}></span>
        </div>

        <img src={'http://127.0.0.1:8887/' + beauty.image_name} className="card-img-top rounded" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{beauty.product_name.slice(0, 20) + '...'}</h5>
          <span className='card-text'>Company : {beauty.company.slice(0, 15) + '...'}</span><br />
          <span className='card-text'>Category : {beauty.beauty_category_name}</span><br />
          <span className='card-text'>Price : ₹{beauty.amount}</span><br />
          {beauty.hide_status === true ? <span className='card-text text-danger'>Out of Stock</span> : <span className='card-text text-success'>In Stock</span>}
          <button className="btn btn-sm btn-warning w-100" disabled={beauty.hide_status===true} onClick={() => { addtocart(beauty._id) }}>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default BeautyCard

