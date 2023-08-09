import React, { useEffect, useState } from 'react'
import '../style.css'
import Cate_cart from '../card/Cate_cart'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const AddBeauty = (props) => {

    const navigate = useNavigate()
    const [errorpro, setErrorpro] = useState(false)
    const [errorfile, setErrorfile] = useState(false)
    const [errorcom, setErrorcom] = useState(false)
    const [erroramout, setErroramount] = useState(false)
    const [error, setError] = useState(false)
    // const context = useContext(ProductContext)
    // const { beauty_product, dispalyBeauty, deleteBeautyProduct } = context

    const [category, setCategory] = useState({ id: "", cat_name: "" })

    const insert_category = async (e) => {
        const { cat_name } = category

        const respons = await fetch("http://localhost:5000/beautycategory/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
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
        const respons = await fetch("http://localhost:5000/beautycategory/display", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
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

        // dispalyBeauty();
        // eslint-disable-next-line
    }, [])

    const deleteCate = async (id) => {
        const respons = await fetch("http://localhost:5000/beautycategory/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
        respons.json()
        console.log(id)
        const newcate = catedata.filter((cate) => { return cate._id !== id })
        setCatedata(newcate)
    }

    // updatecategory

    const updateCate = (cate) => {
        setCategory({ id: cate._id, cat_name: cate.beauty_category_name })
    }


    const [ucate, setUcate] = useState([])

    const upcate = async (id, cat_name) => {

        const response = await fetch('http://localhost:5000/beautycategory/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
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
    }

    const handleUpdate = (e) => {
        upcate(category.id, category.cat_name)
        getcate()
    }

    const [beautypro, setBeautypro] = useState({ product_name: "", user_file: "", amount: "", company: "", beauty_category_name: "" })

    // const [user_file, setuser_file] = useState(null);


    // const beautydata = (e) => {
    //     setBeautypro({ ...beautypro, [e.target.name]: e.target.value })
    // }
    function handlepro(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorpro(true)
        } else {
            setErrorpro(false)
        }
        setBeautypro({ ...beautypro, product_name: item })
    }

    function handleamount(e) {
        let item = e.target.value;
        if (isNaN(item) || item < 1) {
            setErroramount(true)
        } else {
            setErroramount(false)
        }
        setBeautypro({ ...beautypro, amount: item })
    }

    function handelcompany(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorcom(true)
        } else {
            setErrorcom(false)
        }
        setBeautypro({ ...beautypro, company: item })
    }

    const onCate = (cname) => {
        setBeautypro({ ...beautypro, beauty_category_name: cname })
        console.log(cname)
    }

    const beautydataimage = (e) => {
        const item = e.target.files[0];
        if (item === undefined) {
            setErrorfile(true)

        } else if (item.type === "image/png" || item.type === "image/jpeg") {
            setErrorfile(false)

        } else {
            setErrorfile(true)
        }
        console.log(e.target.files[0].name)
        // setuser_file(e.target.files[0])
        setBeautypro({ ...beautypro, user_file: item })
    }

    const insert = (e) => {
        e.preventDefault();
        if (erroramout === true || errorcom === true || errorfile === true || errorpro === true || beautypro.product_name.length === 0 || beautypro.amount === 0 || beautypro.company.length === 0) {
            setError(true)
        }
        else {
            console.log(error)
            setError(false)
            const data = new FormData();
            data.append('product_name', beautypro.product_name)
            data.append('amount', beautypro.amount)
            data.append('company', beautypro.company)
            data.append('beauty_category_name', beautypro.beauty_category_name)
            data.append('user_file', beautypro.user_file)

            fetch('http://localhost:5000/beautyproduct/insert', {
                method: "POST",
                headers:{
                    'auth-token':localStorage.getItem('token')
                },
                body: data,
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Form submitted successfully:', data);
                    // dispalyBeauty()
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                });
        }
    }

    // const [beauty_product, setBeauty_product] = useState([])

    // const dispalyBeauty = async () => {
    //     const respons = await fetch("http://localhost:5000/beautyproduct/display", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const resp = await respons.json()
    //     if (resp.success === false) {
    //         // document.getElementById('beau').text = 'No Data Found'
    //     } else {
    //         setBeauty_product(resp)
    //     }

    // }
    // const deleteBeautyProduct = async (id) => {
    //     const response = await fetch('http://localhost:5000/beautyproduct/delete/' + id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     response.json()
    //     console.log(id)
    //     const newbpro = beauty_product.filter((bpro) => { return bpro._id !== id })
    //     setBeauty_product(newbpro)
    // }

    // update 
    // const ref = useRef(null)

    // const refClose = useRef(null)


    // const [beautyPro, setBeautyPro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "", ebeauty_category_name: "" })

    // const updatePro = (currentPro) => {
    //     ref.current.click()
    //     setBeautyPro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company, ebeauty_category_name: currentPro.beauty_category_name })
    //     console.log(beautyPro.id)
    // }

    // const editproduct = () => {
    //     const data = new FormData();
    //     data.append('product_name', beautyPro.eproduct_name)
    //     data.append('amount', beautyPro.eamount)
    //     data.append('company', beautyPro.ecompany)
    //     data.append('beauty_category_name', beautyPro.ebeauty_category_name)
    //     data.append('user_file', beautyPro.euser_file)

    //     fetch('http://localhost:5000/beautyproduct/update/' + beautyPro.id, {
    //         method: "PUT",
    //         body: data,
    //     }).then((response) => response.json())
    //         .then((data) => {
    //             console.log('Form Updated successfully:', data);
    //             dispalyBeauty()
    //         })
    //         .catch((error) => {
    //             console.error('Error update form:', error);
    //         });
    // }

    // const handleClick = (e) => {
    //     editproduct(beautyPro.id, beautyPro.eproduct_name, beautyPro.eamount, beautyPro.ecompany, beautyPro.euser_file, beautyPro.ebeauty_category_name)
    //     refClose.current.click()
    // }

    // const onCateu = (cname) => {
    //     setBeautyPro({ ...beautyPro, ebeauty_category_name: cname })
    //     console.log(cname)
    // }

    // const onChangeImg = (e) => {
    //     console.log(e.target.files[0].name)
    //     // setuser_file(e.target.files[0])
    //     setBeautyPro({ ...beautyPro, euser_file: e.target.files[0] })
    // }

    // const onChange = (e) => {
    //     setBeautyPro({ ...beautyPro, [e.target.name]: e.target.value })
    // }

    // const hide = async (pid) => {
    //     const respons = await fetch('http://localhost:5000/beautyproduct/toggle/' + pid, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await respons.json()
    //     if(json.success===true){
    //         swal({
    //             text: "Successfully Hide",
    //             icon: "success",
    //             buttons:false,
    //             timer:1500
    //           });
    //     }else{
    //         swal({
    //             text: "Not hide",
    //             icon: "error",
    //             buttons:false,
    //             timer:1500
    //           });
    //     }
    //     dispalyBeauty()
    // }

    const hidecate = async (cid) => {
        const respons = await fetch('http://localhost:5000/beautycategory/toggle/' + cid, {
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
                    <h2>Beauty Product</h2>
                    <form onSubmit={insert}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control " id="product_name" name='product_name' placeholder="Enter Product Name" value={beautypro.product_name} onChange={handlepro} />
                            {errorpro ? <span className='text-danger'>Product Name Not valid</span> : ''}
                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="amount">Image</label>
                            <input type="file" className="form-control " id="user_file" name='user_file' placeholder="Choose image" onChange={beautydataimage} />
                            {errorfile ? <span className='text-danger'>File Not valid</span> : ''}

                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" className="form-control " id="amount" name='amount' placeholder="Enter Amount" value={beautypro.amount} onChange={handleamount} />
                            {erroramout ? <span className='text-danger'>Amount Not valid</span> : ''}
                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="amount">Company</label>
                            <input type="text" className="form-control" id="company" name='company' placeholder="Enter company" value={beautypro.company} onChange={handelcompany} />
                            {errorcom ? <span className='text-danger'>Company Name Not valid</span> : ''}
                        </div>
                        <div className="form-group pt-4">
                            <label htmlFor="address">Category</label>
                            <select id="cateid" className='form-control' onChange={(e) => { onCate(e.target.value) }}>
                                <option value="">--Select Category</option>
                                {catedata.map((cate) => {
                                    return <option value={cate.beauty_category_name} name="beauty_category_name">{cate.beauty_category_name}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group pt-4">
                            <button className='btn btn-secondary'>insert</button>
                        </div>
                        {error ? <span className='text-danger'>Invalid Credential</span> : ''}
                    </form>
                    <div className='text-start' style={{ marginTop: '5vh' }}>
                        <Link to="/displaybeautyproduct" className='text-decoration-none'>View All & Search product</Link>
                    </div>
                </div>

                <div className="col">
                    <h2>Beauty Category</h2>
                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input type="text" className="form-control" id="cat_name" name='cat_name' value={category.cat_name} onChange={catechange} placeholder="Enter Category" required />
                    </div>
                    <button className="btn btn-secondary border shadow-sm my-3" onClick={insert_category}>Insert</button>
                    <a href='/addbeauty' className="btn btn-primary border shadow-sm my-3 mx-3" onClick={handleUpdate}>Update</a>

                    <div className="scrollbar-cat">
                        <div >
                            {catedata.length === 0 && 'No Category to display'}
                        </div>
                        {catedata.map((cate) => {
                            return <div key={cate._id}><Cate_cart key={cate._id} cate={cate} updateCate={updateCate} deleteCate={deleteCate} hidecate={hidecate} /></div>
                        })}
                    </div>

                </div>

            </div>
            {/* <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                    <select id="cateid" className='form-control' value={beautyPro.ebeauty_category_name} onChange={(e) => { onCateu(e.target.value) }}>
                                        <option value="">--Select Category</option>
                                        {catedata.map((cate) => {
                                            return <option value={cate.beauty_category_name} name="ebeauty_category_name">{cate.beauty_category_name}</option>
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
            </div> */}
        </div>
    )
}

export default AddBeauty
