import React, { useState, useEffect, useRef } from 'react'
import MedicineCard from '../card/MedicineCard'
import swal from 'sweetalert'
const MedicineData = (props) => {

    useEffect(() => {
        dispalyMedicine()
    }, [])

    const [medicine_product, setMedicine_product] = useState([])

    const dispalyMedicine = async () => {
        const respons = await fetch("http://localhost:5000/medicine/display", {
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
            setMedicine_product(resp)
        }
    }

    const deleteMedicineProduct = async (id) => {
        const response = await fetch('http://localhost:5000/medicine/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const respo = await response.json()
        console.log(id)
        if (respo.success === true) {

            const newmpro = medicine_product.filter((medi) => { return medi._id !== id })
            setMedicine_product(newmpro)
            swal({
                text: "Delete Done",
                icon: "success",
                buttons: false,
                timer: 1500
            });

        } else {
            swal({
                text: "Failed to Delete",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }

    }

    // updata 
    const ref = useRef(null)

    const refClose = useRef(null)


    const [mediPro, setMediPro] = useState({ id: "", eproduct_name: "", euser_file: "", eamount: "", ecompany: "" })

    const updatePro = (currentPro) => {
        ref.current.click()
        setMediPro({ id: currentPro._id, eproduct_name: currentPro.product_name, euser_file: currentPro.image_name, eamount: currentPro.amount, ecompany: currentPro.company })
    }

    const editproduct = () => {
        const data = new FormData();
        data.append('product_name', mediPro.eproduct_name)
        data.append('amount', mediPro.eamount)
        data.append('company', mediPro.ecompany)
        data.append('user_file', mediPro.euser_file)

        fetch('http://localhost:5000/medicine/update/' + mediPro.id, {
            method: "PUT",
            headers: {

                'auth-token': localStorage.getItem('token')
            },
            body: data,
        }).then((response) => response.json())
            .then((data) => {
                console.log('Form Updated successfully:', data);
                dispalyMedicine()
            })
            .catch((error) => {
                console.error('Error update form:', error);
            });
    }


    const handleClick = (e) => {
        editproduct(mediPro.id, mediPro.eproduct_name, mediPro.eamount, mediPro.ecompany, mediPro.euser_file, mediPro.ebeauty_category_name)
        refClose.current.click()
    }

    const onChangeImg = (e) => {
        console.log(e.target.files[0].name)
        // setuser_file(e.target.files[0])
        setMediPro({ ...mediPro, euser_file: e.target.files[0] })
    }

    const onChange = (e) => {
        setMediPro({ ...mediPro, [e.target.name]: e.target.value })
    }

    const [search, setSearch] = useState({ pname: '' })

    const onSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
        searchpro(search.pname)
    }

    const [searchdata, setSearchdata] = useState([])

    const searchpro = async (pname) => {
        const response = await fetch('http://localhost:5000/medicine/search/' + pname, {
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
            dispalyMedicine()
        }
    }
    const handledata = () => {
        searchdata.length = 0
        dispalyMedicine()
    }

    const hide = async (pid) => {
        const respons = await fetch('http://localhost:5000/medicine/toggle/' + pid, {
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
        dispalyMedicine()
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
                                searchdata.length === 0 ? medicine_product.length === 0 ?
                                    <div className='container'>No data Found</div> :
                                    medicine_product.map((medi) => {
                                        return <div className="col-md-3" key={medi._id}>
                                            <MedicineCard key={medi._id} medi={medi} deleteMedicineProduct={deleteMedicineProduct} hide={hide} updatePro={updatePro} />
                                        </div>
                                    })
                                    :
                                    searchdata.map((medi) => {
                                        return <div className="col-md-3" key={medi._id}>
                                            <MedicineCard key={medi._id} medi={medi} deleteMedicineProduct={deleteMedicineProduct} hide={hide} updatePro={updatePro} />
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
                </div>
            </div>
        </>
    )
}

export default MedicineData
