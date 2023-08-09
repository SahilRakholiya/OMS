import React, { useState, useEffect, useRef } from 'react'
import BeautyCard from '../card/BeautyCard'
import swal from 'sweetalert'

const BeautyData = (props) => {

    const [beauty_product, setBeauty_product] = useState([])

    const dispalyBeauty = async () => {
        const respons = await fetch("http://localhost:5000/beautyproduct/display", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {

        } else {
            setBeauty_product(resp)
        }
    }

    useEffect(() => {
        dispalyBeauty()
        getcate()
    }, [])

    const deleteBeautyProduct = async (id) => {
        const response = await fetch('http://localhost:5000/beautyproduct/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await response.json()
        console.log(id)
        if (resp.success === true) {
            const newbpro = beauty_product.filter((bpro) => { return bpro._id !== id })
            setBeauty_product(newbpro)
            swal({
                text: "Delete Done",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                text: "Delete Failed",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }

    }

    const hide = async (pid) => {
        const respons = await fetch('http://localhost:5000/beautyproduct/toggle/' + pid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await respons.json()
        if (json.success === true) {
            swal({
                text: "Successfully done",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                text: "Not hide",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }
        dispalyBeauty()
    }

    const ref = useRef(null)

    const refClose = useRef(null)

    const [catedata, setCatedata] = useState([])

    const getcate = async () => {
        const respons = await fetch("http://localhost:5000/beautycategory/display", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {

        } else {
            setCatedata(resp)
        }
    }

    const [beautyPro, setBeautyPro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "", ebeauty_category_name: "" })

    // const [beauty, setBeauty] = useState([])

    const updatePro = (currentPro) => {
        ref.current.click()
        setBeautyPro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company, ebeauty_category_name: currentPro.beauty_category_name })
        console.log(beautyPro.id)
    }

    const editproduct = () => {
        const data = new FormData();
        data.append('product_name', beautyPro.eproduct_name)
        data.append('amount', beautyPro.eamount)
        data.append('company', beautyPro.ecompany)
        data.append('beauty_category_name', beautyPro.ebeauty_category_name)
        data.append('user_file', beautyPro.euser_file)

        fetch('http://localhost:5000/beautyproduct/update/' + beautyPro.id, {
            method: "PUT",
            headers: {

                'auth-token': localStorage.getItem('token')
            },
            body: data,
        }).then((response) => response.json())
            .then((data) => {
                console.log('Form Updated successfully:', data);
                dispalyBeauty()
            })
            .catch((error) => {
                console.error('Error update form:', error);
            });
    }


    const handleClick = (e) => {
        editproduct(beautyPro.id, beautyPro.eproduct_name, beautyPro.eamount, beautyPro.ecompany, beautyPro.euser_file, beautyPro.ebeauty_category_name)
        refClose.current.click()
    }

    const onCate = (cname) => {
        setBeautyPro({ ...beautyPro, ebeauty_category_name: cname })
        console.log(cname)
    }

    const onChangeImg = (e) => {
        console.log(e.target.files[0].name)
        // setuser_file(e.target.files[0])
        setBeautyPro({ ...beautyPro, euser_file: e.target.files[0] })
    }

    const onChange = (e) => {
        setBeautyPro({ ...beautyPro, [e.target.name]: e.target.value })
    }

    const [search, setSearch] = useState({ pname: '' })

    const onSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
        searchpro(search.pname)
    }

    const [searchdata, setSearchdata] = useState([])

    const searchpro = async (pname) => {
        const response = await fetch('http://localhost:5000/beautyproduct/search/' + pname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await response.json()
        if (resp.success === false) {
            swal({
                text: "Product Not Found",
                icon: "warning",
                buttons: false,
                timer: 1500
            });
        } else {
            setSearchdata(resp)
            dispalyBeauty()
        }
    }

    const handledata = () => {
        searchdata.length = 0
        dispalyBeauty()
    }

    return (
        // <div>
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-3 d-flex">
                        <div className="input-group w-50 border-color">
                            <input type="text" className="form-control form-input" aria-label="Amount (to the nearest dollar)" id='search' name='pname' onChange={onSearch} placeholder='Search Beauty product name...' />
                        </div>
                        <button className='btn mx-3 btn-outline-secondary shadow-sm' onClick={handledata}>All Data</button>
                    </div>
                </div>
                <div className='scrollbar-product'>
                    <div className="container">
                        <div className="row">
                            {
                                searchdata.length === 0 ? beauty_product.length === 0 ?
                                    <div className='container'>No data Found</div> :
                                    beauty_product.map(bpro => {
                                        return <div className="col-md-3" key={bpro._id}>
                                            <BeautyCard key={bpro._id} bpro={bpro} deleteBeautyProduct={deleteBeautyProduct} hide={hide} updatePro={updatePro} />
                                        </div>
                                    })
                                    :
                                    searchdata.map(bpro => {
                                        return <div className="col-md-3" key={bpro._id}>
                                            <BeautyCard key={bpro._id} bpro={bpro} deleteBeautyProduct={deleteBeautyProduct} hide={hide} updatePro={updatePro} />
                                        </div>
                                    })
                            }
                        </div>
                    </div>

                </div>


                {/* update product  */}
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Beauty product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="eproduct_name" name="eproduct_name" value={beautyPro.eproduct_name} aria-describedby="emailHelp" onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Image</label>
                                        <input type="file" className="form-control" id="euser_file" name="euser_file" onChange={onChangeImg} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Company</label>
                                        <input type="text" className="form-control" id="ecompany" name="ecompany" value={beautyPro.ecompany} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Amount</label>
                                        <input type="text" className="form-control" id="eamount" name="eamount" value={beautyPro.eamount} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Category</label>
                                        <select id="cateid" className='form-control' value={beautyPro.ebeauty_category_name} onChange={(e) => { onCate(e.target.value) }}>
                                            <option value="">--Select Category</option>
                                            {catedata.length === 0 ? 'No data found' : catedata.map((cate) => {
                                                return <option value={cate.beauty_category_name} name="ebeauty_category_name">{cate.beauty_category_name}</option>
                                            })}
                                        </select>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" onClick={handleClick} className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default BeautyData
