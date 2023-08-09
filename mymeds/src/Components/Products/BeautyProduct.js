import React, { useState, useEffect, useContext } from 'react'
import BeautyCard from '../Card/BeautyCard'
import ProtContext from '../../context/productdata/ProtContext'
import swal from 'sweetalert'
const BeautyProduct = () => {
    const context = useContext(ProtContext)
    const { beauty_product, dispalyBeauty, addtocart } = context

    const [catedata, setCatedata] = useState([])

    const getcate = async () => {
        const respons = await fetch("http://localhost:5000/beautycategory/displayClient", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {

        } else {
            setCatedata(resp)
        }
    }

    const [cid, setcid] = useState()

    const [serchcatedata, setSerchcatedata] = useState([])

    const [searchdata, setSearchdata] = useState([])

    const searchcate = async (id) => {
        const respons = await fetch("http://localhost:5000/beautyproduct/categoryAllProduct/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {
            swal({
                text: "No Product in this Category",
                icon: "error",
                buttons:false,
                timer:1500
              });
        } else {
            setSerchcatedata(resp)
            setcid(id)
        }

    }

    const searchpro = async (cid, pname) => {
        const respons = await fetch(`http://localhost:5000/beautyproduct/searchCategoryAndProduct/${cid}/${pname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {
            swal({
                text: "No Product Found",
                icon: "error",
                buttons:false,
                timer:1500
              });
        } else {
            setSearchdata(resp)
        }
        console.log(cid, pname)
    }

    useEffect(() => {
        dispalyBeauty();
        getcate();
    }, [])

    const [datatosearch, setdatatosearch] = useState({ cid: '', pname: '' })

    const searchchange = (e) => {
        setdatatosearch({ ...datatosearch, [e.target.name]: e.target.value })
        searchpro(cid,datatosearch.pname)
    }

    const handledata = () => {
        serchcatedata.length = 0
        searchdata.length =  0
        dispalyBeauty()
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-2 p-1" style={{ position: 'fixed', left: '0', height: '90vh' }}>
                    <div className='p-2 ' style={{ height: '78.5vh' }}>
                        <div className="d-flex justify-content-between">
                            <h3>Category</h3>
                            <button className="btn btn-light btn-sm border rounded" onClick={handledata}>All Products</button>
                        </div>
                        <div className="d-flex p-2" style={{ marginTop: '20px' }}>
                            <input type="text" placeholder='Search product name' name='pname' onChange={searchchange} className='form-control' />
                        </div>
                        <div className="d-inline-block w-100">
                            {catedata.map((cate) => {
                                return <div className='my-2 p-2'>
                                    <button className='btn btn-outline-light text-dark border fs-6 w-100 text-start' name='cid' value={cate._id} onClick={() => { searchcate(cate._id) }}>{cate.beauty_category_name}</button>
                                </div>
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-10" style={{ position: 'absolute', right: '0' }}>
                <div className="container">
                    <div className="row my-3">
                        {serchcatedata.length === 0 ? beauty_product.map((beauty) => {
                            return <div className="col-md-3" key={beauty._id}>
                                <BeautyCard key={beauty._id} beauty={beauty} addtocart={addtocart} />
                            </div>
                        }) : searchdata.length === 0 ? serchcatedata.map((beauty) => {
                            return <div className="col-md-3" key={beauty._id}>
                                <BeautyCard key={beauty._id} beauty={beauty} addtocart={addtocart} />
                            </div>
                        }) : searchdata.map((beauty) => {
                            return <div className="col-md-3" key={beauty._id}>
                                <BeautyCard key={beauty._id} beauty={beauty} addtocart={addtocart} />
                            </div>
                        })}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BeautyProduct
