import React, { useEffect, useState, useRef } from 'react'
import '../style.css'
// import MedicineCard from '../card/MedicineCard'
import { Link, useNavigate } from 'react-router-dom'


const AddMedicine = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
       if(!localStorage.getItem('id')){
        navigate('/')
       }
    }, [])


    const [medicinepro, setMedicinepro] = useState({ product_name: "", user_file: "", amount: "", company: "" })

    const [errorpro, setErrorpro] = useState(false)
    const [errorfile, setErrorfile] = useState(false)
    const [errorcom, setErrorcom] = useState(false)
    const [erroramout, setErroramount] = useState(false)
    const [error, setError] = useState(false)

    function handlepro(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorpro(true)
        } else {
            setErrorpro(false)
        }
        setMedicinepro({ ...medicinepro, product_name: item })
    }

    function handleamount(e) {
        let item = e.target.value;
        if (isNaN(item) || item < 1) {
            setErroramount(true)
        } else {
            setErroramount(false)
        }
        setMedicinepro({ ...medicinepro, amount: item })
    }

    function handelcompany(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item) || item.length === 0) {
            setErrorcom(true)
        } else {
            setErrorcom(false)
        }
        setMedicinepro({ ...medicinepro, company: item })
    }

    const medicinedataimage = (e) => {
        const item = e.target.files[0];
        if (item === undefined) {
            setErrorfile(true)

        } else if (item.type === "image/png" || item.type === "image/jpeg" || item.type === "image/jpg") {
            setErrorfile(false)

        } else {
            setErrorfile(true)
        }
        console.log(e.target.files[0].name)
        setMedicinepro({ ...medicinepro, user_file: item })
    }

    const insert = (e) => {
        e.preventDefault();
        if (erroramout === true || errorcom === true || errorfile === true || errorpro === true || medicinepro.product_name.length === 0 || medicinepro.amount === 0 || medicinepro.company.length === 0) {
            setError(true)
            console.log(error)
        } else {
            setError(false)
            const data = new FormData();
            data.append('product_name', medicinepro.product_name)
            data.append('amount', medicinepro.amount)
            data.append('company', medicinepro.company)
            data.append('user_file', medicinepro.user_file)

            fetch('http://localhost:5000/medicine/insert', {
                method: "POST",
                headers:{
                    'auth-token':localStorage.getItem('token')
                },
                body: data,
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Form submitted successfully:', data);
                    // dispalyMedicine()
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                });
        }
        // setMedicinepro({product_name:'',company:'',amount:""})
    }

    // display 
    // const [medicine_product, setMedicine_product] = useState([])

    // const dispalyMedicine = async () => {
    //     const respons = await fetch("http://localhost:5000/medicine/display", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const resp = await respons.json()
    //     if (resp.success === false) {
    //         // document.getElementById('beau').text = 'No Data Found'
    //     } else {
    //         setMedicine_product(resp)
    //     }
    // }

    // const deleteMedicineProduct = async (id) => {
    //     const response = await fetch('http://localhost:5000/medicine/delete/' + id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const respo = await response.json()
    //     console.log(id)
    //     if (respo.success === true) {
    //         props.showalert("Successfuly Deleted", 'success')
    //         const newmpro = medicine_product.filter((medi) => { return medi._id !== id })
    //         setMedicine_product(newmpro)
    //     } else {
    //         props.showalert("Faild To Deleted", 'danger')
    //     }
    // }

    // // updata 
    // const ref = useRef(null)

    // const refClose = useRef(null)


    // const [mediPro, setMediPro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "" })

    // const updatePro = (currentPro) => {
    //     ref.current.click()
    //     setMediPro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company })
    // }

    // const editproduct = () => {
    //     const data = new FormData();
    //     data.append('product_name', mediPro.eproduct_name)
    //     data.append('amount', mediPro.eamount)
    //     data.append('company', mediPro.ecompany)
    //     data.append('user_file', mediPro.euser_file)

    //     fetch('http://localhost:5000/medicine/update/' + mediPro.id, {
    //         method: "PUT",
    //         body: data,
    //     }).then((response) => response.json())
    //         .then((data) => {
    //             console.log('Form Updated successfully:', data);
    //             dispalyMedicine()
    //         })
    //         .catch((error) => {
    //             console.error('Error update form:', error);
    //         });
    // }

    // const handleClick = (e) => {
    //     editproduct(mediPro.id, mediPro.eproduct_name, mediPro.eamount, mediPro.ecompany, mediPro.euser_file, mediPro.ebeauty_category_name)
    //     refClose.current.click()
    // }

    // const onChangeImg = (e) => {
    //     console.log(e.target.files[0].name)
    //     // setuser_file(e.target.files[0])
    //     setMediPro({ ...mediPro, euser_file: e.target.files[0] })
    // }

    // const onChange = (e) => {
    //     setMediPro({ ...mediPro, [e.target.name]: e.target.value })
    // }

    return (
        <div className='container '>

            <div className="row my-2">

                <h2>Medicine Product</h2>

                <form className='w-50' onSubmit={insert}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" className="form-control" id="product_name" name='product_name' placeholder="Enter Product Name" value={medicinepro.product_name} onChange={handlepro}  />
                        {errorpro ? <span className='text-danger'>Product Name Not valid</span> : ''}

                    </div>
                    <div className="form-group pt-4">
                        <label htmlFor="amount">Image</label>
                        <input type="file" className="form-control" id="user_file" name='user_file' placeholder="Choose image" onChange={medicinedataimage}  />
                        {errorfile ? <span className='text-danger'>File Not valid</span> : ''}

                    </div>
                    <div className="form-group pt-4">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" className="form-control" id="amount" name='amount' placeholder="Enter Amount" value={medicinepro.amount} onChange={handleamount}  />
                        {erroramout ? <span className='text-danger'>Amount Not valid</span> : ''}

                    </div>
                    <div className="form-group pt-4">
                        <label htmlFor="amount">Company</label>
                        <input type="text" className="form-control" id="company" name='company' placeholder="Enter company" value={medicinepro.company} onChange={handelcompany}  />
                        {errorcom ? <span className='text-danger'>Company Name Not valid</span> : ''}

                    </div>
                    <div className="form-group pt-4">
                        <button className='btn btn-secondary'>insert</button>
                    </div>
                    {error ? <span className='text-danger'>Invalid Credential</span> : ''}

                </form>

            </div>

            {/* update  */}
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
                                    <input type="text" className="form-control" id="eproduct_name" name="eproduct_name" value={mediPro.eproduct_name} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="euser_file" name="euser_file" onChange={onChangeImg} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Company</label>
                                    <input type="text" className="form-control" id="ecompany" name="ecompany" value={mediPro.ecompany} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="eamount" name="eamount" value={mediPro.eamount} onChange={onChange} required />
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
            <div className='text-start' style={{ marginTop: '5vh' }}>
                <Link to="/displaymedicine" className='text-decoration-none'>View All & Search product</Link>
            </div>
            {/* <div className="scrollbar">
                <div className="container row">
                    {medicine_product.length === 0 ? 'No data found' : medicine_product.map((medi) => {
                        return <div className="col-md-3" key={medi._id} id='beau'>
                            <MedicineCard key={medi._id} medi={medi} deleteMedicineProduct={deleteMedicineProduct} updatePro={updatePro} />
                        </div>
                    })}
                </div>
            </div> */}
        </div>


    )
}

export default AddMedicine
