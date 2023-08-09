import React from 'react'

const SearchCard = (props) => {

    const { addtocart, search } = props
    console.log(search)
    return (
        <div>
            <div className="contianer border rounded p-2 my-2" style={{ width: '20vw' }} >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '83%', zIndexd: '1' }}></span>
                </div>

                <img src={'http://127.0.0.1:8887/' + search.image_name} className="card-img-top rounded" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{search.pname.slice(0, 20) + '...'}</h5>
                    <span className='card-text'>Company : {search.company.slice(0, 15) + '...'}</span><br />
                    <span className='card-text'>Category : {search.category_name}</span><br />
                    <span className='card-text'>Price : ₹{search.amount}</span><br />
                    {search.hide_status === true ? <span className='card-text text-danger'>Out of Stock</span> : <span className='card-text text-success'>In Stock</span>}
                    <button className="btn btn-sm btn-warning w-100" disabled={search.hide_status === true} onClick={() => { addtocart(search._id) }}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
