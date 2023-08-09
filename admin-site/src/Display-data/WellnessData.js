import React, { useState, useEffect, useRef } from 'react'
import WellnessCard from '../card/WellnessCard'
import swal from 'sweetalert'
const WellnessData = (props) => {
    const [wellness_product, setWellness_product] = useState([])

    useEffect(() => {
        displayWellness()
        getcate()
    }, [])

    const displayWellness = async () => {
        const respons = await fetch("http://localhost:5000/wellnessproduct/display", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {
            // document.getElementById('beau').text = 'No Data Found'
        } else {
            setWellness_product(resp)
        }

    }
    const deleteWellnessProduct = async (id) => {
        const response = await fetch('http://localhost:5000/wellnessproduct/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const repo = await response.json()
        console.log(id)
        if (repo.success === true) {
            const newwpro = wellness_product.filter((wpro) => { return wpro._id !== id })
            setWellness_product(newwpro)
            swal({
                text: "Delete Done",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                text: "Failed To Delete",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }
    }

    const ref = useRef(null)

    const refClose = useRef(null)

    const [catedata, setCatedata] = useState([])

    const getcate = async () => {
        const respons = await fetch("http://localhost:5000/wellnesscategory/display", {
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

    const [uwellnesspro, setUwellnesspro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "", ewellness_category_name: "" })

    const updatePro = (currentPro) => {
        ref.current.click()
        setUwellnesspro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company, ewellness_category_name: currentPro.wellness_category_name })
    }

    const editproduct = () => {
        const data = new FormData();
        data.append('product_name', uwellnesspro.eproduct_name)
        data.append('amount', uwellnesspro.eamount)
        data.append('company', uwellnesspro.ecompany)
        data.append('wellness_category_name', uwellnesspro.ewellness_category_name)
        data.append('user_file', uwellnesspro.euser_file)

        fetch('http://localhost:5000/wellnessproduct/update/' + uwellnesspro.id, {
            method: "PUT",
            headers: {

                'auth-token': localStorage.getItem('token')
            },
            body: data,
        }).then((response) => response.json())
            .then((data) => {
                console.log('Form Updated successfully:', data);
                displayWellness()
            })
            .catch((error) => {
                console.error('Error update form:', error);
            });
    }


    const handleClick = (e) => {
        editproduct(uwellnesspro.id, uwellnesspro.eproduct_name, uwellnesspro.eamount, uwellnesspro.ecompany, uwellnesspro.euser_file, uwellnesspro.ewellness_category_name)
        refClose.current.click()
    }

    const onCate = (cname) => {
        setUwellnesspro({ ...uwellnesspro, ewellness_category_name: cname })
        console.log(cname)
    }

    const onChange = (e) => {
        setUwellnesspro({ ...uwellnesspro, [e.target.name]: e.target.value })
    }

    const onChangeImg = (e) => {
        console.log(e.target.files[0].name)
        // setuser_file(e.target.files[0])
        setUwellnesspro({ ...uwellnesspro, euser_file: e.target.files[0] })
    }

    // search 
    const [search, setSearch] = useState({ pname: '' })

    const onSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
        searchpro(search.pname)
    }

    const [searchdata, setSearchdata] = useState([])
    const searchpro = async (pname) => {
        const response = await fetch('http://localhost:5000/wellnessproduct/search/' + pname, {
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
            displayWellness()
        }
    }

    const handledata = () => {
        searchdata.length = 0
        displayWellness()
    }

    const hide = async (pid) => {
        const respons = await fetch('http://localhost:5000/wellnessproduct/toggle/' + pid, {
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
        displayWellness()
    }
    return (
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
                        <div className="row" >
                            {
                                searchdata.length === 0 ? wellness_product.length === 0 ?
                                    <div className='container'>No data Found</div> :
                                    wellness_product.map((wellness) => {
                                        return <div className="col-md-3" key={wellness._id}>
                                            <WellnessCard key={wellness._id} wellness={wellness} deleteWellnessProduct={deleteWellnessProduct} updatePro={updatePro} hide={hide} />
                                        </div>
                                    })
                                    :
                                    searchdata.map((wellness) => {
                                        return <div className="col-md-3" key={wellness._id}>
                                            <WellnessCard key={wellness._id} wellness={wellness} deleteWellnessProduct={deleteWellnessProduct} updatePro={updatePro} hide={hide} />
                                        </div>
                                    })
                            }
                        </div>
                    </div>
                </div>

                {/* update  */}
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
                                        <input type="text" className="form-control" id="eproduct_name" name="eproduct_name" value={uwellnesspro.eproduct_name} aria-describedby="emailHelp" onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Image</label>
                                        <input type="file" className="form-control" id="euser_file" name="euser_file" onChange={onChangeImg} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Company</label>
                                        <input type="text" className="form-control" id="ecompany" name="ecompany" value={uwellnesspro.ecompany} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Amount</label>
                                        <input type="text" className="form-control" id="eamount" name="eamount" value={uwellnesspro.eamount} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Category</label>
                                        <select id="cateid" className='form-control' value={uwellnesspro.ewellness_category_name} onChange={(e) => { onCate(e.target.value) }}>
                                            <option value="">--Select Category</option>
                                            {catedata.length === 0 ? 'No data found' : catedata.map((cate) => {
                                                return <option value={cate.wellness_category_name} name="ewellness_category_name">{cate.wellness_category_name}</option>
                                            })}
                                        </select>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WellnessData
