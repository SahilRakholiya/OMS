import React from 'react'

const WellnessCateCard = (props) => {
    const { cate ,deleteCate ,updateCate,hidecate} = props
    const id = cate._id
    return (
        <div className='d-flex border rounded p-2 justify-content-between my-2'>
            <span className='p-1'>Category Name : {cate.wellness_category_name}</span>
            <div>
                <button className="btn btn-sm btn-primary" onClick={()=>{updateCate(cate)}}><i className="fa-regular fa-pen-to-square" style={{ color: "#ffffff" }}></i></button>
                <button className='btn btn-sm btn-warning mx-3' onClick={() => { hidecate(id) }}>{cate.hide_status === false ? "Hide" : "Unhide"}</button>
                <button className="btn btn-sm btn-danger mx-3"onClick={()=>{deleteCate(id)}}><i className="fa-solid fa-trash" style={{ color: "#ffffff" }}></i></button>
            </div>
        </div>
  )
}

export default WellnessCateCard
