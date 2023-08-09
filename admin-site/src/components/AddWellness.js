import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WellnessCateCard from '../card/WellnessCateCard'

import swal from 'sweetalert'
// import WellnessCard from '../card/WellnessCard'
// import ProductContext from '../context/ProductContext'


const AddWellness = () => {
    const navigate = useNavigate()
    const [errorpro, setErrorpro] = useState(false)
    const [errorfile, setErrorfile] = useState(false)
    const [errorcom, setErrorcom] = useState(false)
    const [erroramout, setErroramount] = useState(false)
    const [error, setError] = useState(false)

    const [category, setCategory] = useState({ id: "", cat_name: "" })

    const insert_category = async (e) => {
        const { cat_name } = category

        const respons = await fetch("http://localhost:5000/wellnesscategory/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ cat_name })
        })
        const json = respons.json()
        console.log(json)
        getcate()
    }

    const catechange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

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

    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        } else {

            getcate();
        }

    }, [])

    const deleteCate = async (id) => {
        const respons = await fetch("http://localhost:5000/wellnesscategory/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        respons.json()
        console.log(id)
        const newcate = catedata.filter((cate) => { return cate._id !== id })
        setCatedata(newcate)
    }

    // updatecategory

    const [ucate, setUcate] = useState([])

    const upcate = async (id, cat_name) => {

        const response = await fetch('http://localhost:5000/wellnesscategory/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ cat_name })
        })
        response.json();
        let newcate = JSON.parse(JSON.stringify(ucate))
        for (let index = 0; index < ucate.length; index++) {
            const element = ucate[index];
            if (element._id === id) {
                newcate[index].cat_name = cat_name
                break;
            }
        }
        setUcate(newcate);
        console.log(newcate)
    }

    const updateCate = (cate) => {
        // ref.current.click()
        setCategory({ id: cate._id, cat_name: cate.wellness_category_name })
        console.log(category.id)
    }

    const handleUpdate = () => {
        upcate(category.id, category.cat_name)
        getcate();
    }


    const [wellnesspro, setWellnesspro] = useState({ product_name: "", user_file: "", amount: "", company: "", wellness_category_name: "" })

    function handlepro(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorpro(true)
        } else {
            setErrorpro(false)
        }
        setWellnesspro({ ...wellnesspro, product_name: item })
    }

    function handleamount(e) {
        let item = e.target.value;
        if (isNaN(item) || item < 1) {
            setErroramount(true)
        } else {
            setErroramount(false)
        }
        setWellnesspro({ ...wellnesspro, amount: item })
    }

    function handelcompany(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorcom(true)
        } else {
            setErrorcom(false)
        }
        setWellnesspro({ ...wellnesspro, company: item })
    }

    const onCate = (cname) => {
        setWellnesspro({ ...wellnesspro, wellness_category_name: cname })
        console.log(cname)
    }

    const wellnessdataimage = (e) => {
        const item = e.target.files[0];
        if (item === undefined) {
            setErrorfile(true)

        } else if (item.type === "image/png" || item.type === "image/jpeg" || item.type === "image/jpg") {
            setErrorfile(false)

        } else {
            setErrorfile(true)
        }
        console.log(e.target.files[0].name)
        // setuser_file(e.target.files[0])
        setWellnesspro({ ...wellnesspro, user_file: item })
    }

    const insert = (e) => {
        e.preventDefault();
        if (erroramout === true || errorcom === true || errorfile === true || errorpro === true || wellnesspro.product_name.length === 0 || wellnesspro.amount === 0 || wellnesspro.company.length === 0) {
            setError(true)
            console.log(error)
        } else {
            setError(false)
            const data = new FormData();
            data.append('product_name', wellnesspro.product_name)
            data.append('amount', wellnesspro.amount)
            data.append('company', wellnesspro.company)
            data.append('wellness_category_name', wellnesspro.wellness_category_name)
            data.append('user_file', wellnesspro.user_file)

            fetch('http://localhost:5000/wellnessproduct/insert', {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: data,
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Form submitted successfully:', data);
                    // displayWellness()
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                });


        }
        setWellnesspro({ product_name: '', company: '', amount: '' })
    }


    // const [wellness_product, setWellness_product] = useState([])

    // const displayWellness = async () => {
    //     const respons = await fetch("http://localhost:5000/wellnessproduct/display", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const resp = await respons.json()
    //     if (resp.success === false) {
    //         // document.getElementById('beau').text = 'No Data Found'
    //     } else {
    //         setWellness_product(resp)
    //     }

    // }
    // const deleteWellnessProduct = async (id) => {
    //     const response = await fetch('http://localhost:5000/wellnessproduct/delete/' + id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     response.json()
    //     console.log(id)
    //     const newwpro = wellness_product.filter((wpro) => { return wpro._id !== id })
    //     setWellness_product(newwpro)
    // }

    // // update 
    // const [uwellnesspro, setUwellnesspro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "", ewellness_category_name: "" })
    // const updatedata = useRef(null)
    // const closedata = useRef(null)
    // const updatePro = (currentPro) => {
    //     updatedata.current.click()
    //     setUwellnesspro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company, ewellness_category_name: currentPro.wellness_category_name })
    // }

    // const editproduct = () => {
    //     const data = new FormData();
    //     data.append('product_name', uwellnesspro.eproduct_name)
    //     data.append('amount', uwellnesspro.eamount)
    //     data.append('company', uwellnesspro.ecompany)
    //     data.append('wellness_category_name', uwellnesspro.ewellness_category_name)
    //     data.append('user_file', uwellnesspro.euser_file)

    //     fetch('http://localhost:5000/wellnessproduct/update/' + uwellnesspro.id, {
    //         method: "PUT",
    //         body: data,
    //     }).then((response) => response.json())
    //         .then((data) => {
    //             console.log('Form Updated successfully:', data);
    //             displayWellness()
    //         })
    //         .catch((error) => {
    //             console.error('Error update form:', error);
    //         });
    // }


    // const handleClick = (e) => {
    //     editproduct(uwellnesspro.id, uwellnesspro.eproduct_name, uwellnesspro.eamount, uwellnesspro.ecompany, uwellnesspro.euser_file, uwellnesspro.ewellness_category_name)
    //     closedata.current.click()
    // }

    // const onCateu = (cname) => {
    //     setUwellnesspro({ ...uwellnesspro, ewellness_category_name: cname })
    //     console.log(cname)
    // }

    // const onChange = (e) => {
    //     setUwellnesspro({ ...uwellnesspro, [e.target.name]: e.target.value })
    // }

    // const onChangeImg = (e) => {
    //     console.log(e.target.files[0].name)
    //     // setuser_file(e.target.files[0])
    //     setUwellnesspro({ ...uwellnesspro, euser_file: e.target.files[0] })
    // }

    const hidecate = async (cid) => {
        const respons = await fetch('http://localhost:5000/wellnesscategory/toggle/' + cid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
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
        getcate()
    }
    return (
        <div className='container'>
            <div className="row my-2">
                <div className="col">
                    <h2>Wellness Product</h2>
                    <form onSubmit={insert}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" id="product_name" name='product_name' placeholder="Enter Product Name" value={wellnesspro.product_name} onChange={handlepro} />
                            {errorpro ? <span className='text-danger'>Product Name Not valid</span> : ''}

                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="amount">Image</label>
                            <input type="file" className="form-control" id="user_file" name='user_file' placeholder="Choose image" onChange={wellnessdataimage} />
                            {errorfile ? <span className='text-danger'>File Not valid</span> : ''}

                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" className="form-control" id="amount" name='amount' placeholder="Enter Amount" value={wellnesspro.amount} onChange={handleamount} />
                            {erroramout ? <span className='text-danger'>Amount Not valid</span> : ''}

                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="Company">Company</label>
                            <input type="text" className="form-control" id="company" name='company' placeholder="Enter company" value={wellnesspro.company} onChange={handelcompany} />
                            {errorcom ? <span className='text-danger'>Copany Name Not valid</span> : ''}
                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="cate">Category</label>
                            <select id="cateid" className='form-control' onChange={(e) => { onCate(e.target.value) }}>
                                <option value="">--Select Category</option>
                                {catedata.map((cate) => {
                                    return <option value={cate.wellness_category_name} name="wellness_category_name">{cate.wellness_category_name}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group pt-4">
                            <button className='btn btn-secondary'>insert</button>
                        </div>
                        {error ? <span className='text-danger'>Invalid Credential</span> : ''}

                    </form>
                    <div className='text-start' style={{ marginTop: '5vh' }}>
                        <Link to="/displaywellnessproduct" className='text-decoration-none'>View All & Search product</Link>
                    </div>
                </div>

                {/* update  */}

                {/* <button ref={updatedata} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                        <select id="cateid" className='form-control' value={uwellnesspro.ewellness_category_name} onChange={(e) => { onCateu(e.target.value) }}>
                                            <option value="">--Select Category</option>
                                            {catedata.length === 0 ? 'No data found' : catedata.map((cate) => {
                                                return <option value={cate.wellness_category_name} name="ewellness_category_name">{cate.wellness_category_name}</option>
                                            })}
                                        </select>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closedata} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className="col">
                    <h2>Wellness Category</h2>
                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input type="text" className="form-control" id="cat_name" name='cat_name' value={category.cat_name} onChange={catechange} placeholder="Enter Category" required />
                    </div>
                    <button className="btn btn-secondary border shadow-sm my-3" onClick={insert_category}>Insert</button>
                    <a href='/addwellness' className="btn btn-primary border shadow-sm my-3 mx-3" onClick={handleUpdate}>Update</a>

                    <div className="scrollbar-cat">
                        <div >
                            {catedata.length === 0 && 'No Category to display'}
                        </div>
                        {catedata.map((cate) => {
                            return <div key={cate._id}><WellnessCateCard key={cate._id} cate={cate} updateCate={updateCate} hidecate={hidecate} deleteCate={deleteCate} /></div>
                        })}
                    </div>

                </div>
            </div>


            {/* 
            <div className="scrollbar">
                <div className="container row">
                    {wellness_product.length === 0 ? 'No data found' :
                        wellness_product.map((wellness) => {
                            return <div className="col-md-3" key={wellness._id}>
                                <WellnessCard key={wellness._id} wellness={wellness} deleteWellnessProduct={deleteWellnessProduct} updatePro={updatePro} />
                            </div>
                        })
                    }
                </div>
            </div> */}
        </div>
    )
}

export default AddWellness
