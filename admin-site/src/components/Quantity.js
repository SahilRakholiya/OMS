// import React, { useEffect, useState, useRef } from 'react'
// import '../style.css'
// // import MedicineCard from '../card/MedicineCard'
// import { Link, useNavigate } from 'react-router-dom'
// import MedicineData from '../Display-data/MedicineData'


// const Quantity = (props) => {
//     const navigate = useNavigate()
//     useEffect(() => {
//         if (!localStorage.getItem('id')) {
//             navigate('/')
//         }
//     }, [])

//     const [data, setData] = useState({ type_of_product: "", product_name: "", quantity: "" })
//     const [medicinepro, setMedicinepro] = useState({ product_name: "", user_file: "", amount: "", company: "" })

//     const [errorpro, setErrorpro] = useState(false)
//     const [errorfile, setErrorfile] = useState(false)
//     const [errorcom, setErrorcom] = useState(false)
//     const [erroramout, setErroramount] = useState(false)
//     const [error, setError] = useState(false)

//     const onTypeOfPrtoduct = (t_o_p) => {
//         setData({ ...data, type_of_product: t_o_p })


//     }

//     function handlepro(e) {
//         let item = e.target.value;
//         if (item.length < 3 || !isNaN(item) || item.length === 0) {
//             setErrorpro(true)
//         } else {
//             setErrorpro(false)
//         }
//         setMedicinepro({ ...medicinepro, product_name: item })
//     }

//     function handleamount(e) {
//         let item = e.target.value;
//         if (isNaN(item) || item < 1) {
//             setErroramount(true)
//         } else {
//             setErroramount(false)
//         }
//         setMedicinepro({ ...medicinepro, amount: item })
//     }

//     function handelcompany(e) {
//         let item = e.target.value;
//         if (item.length < 3 || !isNaN(item) || item.length === 0) {
//             setErrorcom(true)
//         } else {
//             setErrorcom(false)
//         }
//         setMedicinepro({ ...medicinepro, company: item })
//     }

//     const medicinedataimage = (e) => {
//         const item = e.target.files[0];
//         if (item === undefined) {
//             setErrorfile(true)

//         } else if (item.type === "image/png" || item.type === "image/jpeg" || item.type === "image/jpg") {
//             setErrorfile(false)

//         } else {
//             setErrorfile(true)
//         }
//         console.log(e.target.files[0].name)
//         setMedicinepro({ ...medicinepro, user_file: item })
//     }

//     const insert = (e) => {
//         e.preventDefault();
//         if (erroramout === true || errorcom === true || errorfile === true || errorpro === true || medicinepro.product_name.length === 0 || medicinepro.amount === 0 || medicinepro.company.length === 0) {
//             setError(true)
//             console.log(error)
//         } else {
//             setError(false)
//             const data = new FormData();
//             data.append('product_name', medicinepro.product_name)
//             data.append('amount', medicinepro.amount)
//             data.append('company', medicinepro.company)
//             data.append('user_file', medicinepro.user_file)

//             fetch('http://localhost:5000/medicine/insert', {
//                 method: "POST",
//                 headers: {
//                     'auth-token': localStorage.getItem('token')
//                 },
//                 body: data,
//             }).then((response) => response.json())
//                 .then((data) => {
//                     console.log('Form submitted successfully:', data);
//                     // dispalyMedicine()
//                 })
//                 .catch((error) => {
//                     console.error('Error submitting form:', error);
//                 });
//         }
//         // setMedicinepro({product_name:'',company:'',amount:""})
//     }

//     return (
//         <div className='container '>

//             <div className="row my-2">

//                 <h2>Add Product Quantity</h2>

//                 <form className='w-50' onSubmit={insert}>
//                     <div className="form-group">
//                         <label htmlFor="name">Tyep of Product</label>
//                         <select className='form-control' onChange={(e) => onTypeOfPrtoduct(e.target.value)} >
//                             <option value="">--Select Which Type Of Product</option>
//                             <option value="Medicine">Medicine</option>
//                             <option value="Wellness">Wellness</option>
//                             <option value="Beauty">Beauty</option>
//                         </select>

//                     </div>

//                     {/* <div className="form-group pt-4">
//                         <label htmlFor="amount">Product Name</label>
//                         <select className='form-control' onChange={(e)=>onTypeOfPrtoduct(e.target.value)} >
//                             <option value="">--Select Product Name</option>
//                             <option value="Medicine">Medicine</option>
//                             <option value="Wellness">Wellness</option>
//                             <option value="Beauty">Beauty</option>
//                         </select>
//                     </div>
//                     <div className="form-group pt-4">
//                         <label htmlFor="amount">Amount</label>
//                         <input type="text" className="form-control" id="amount" name='amount' placeholder="Enter Amount" value={medicinepro.amount} onChange={handleamount} />
//                         {erroramout ? <span className='text-danger'>Amount Not valid</span> : ''}

//                     </div>
//                     <div className="form-group pt-4">
//                         <label htmlFor="amount">Company</label>
//                         <input type="text" className="form-control" id="company" name='company' placeholder="Enter company" value={medicinepro.company} onChange={handelcompany} />
//                         {errorcom ? <span className='text-danger'>Company Name Not valid</span> : ''}

//                     </div> */}
//                     {/* <div className="form-group pt-4">
//                         <button className='btn btn-secondary'>insert</button>
//                     </div>
//                     {error ? <span className='text-danger'>Invalid Credential</span> : ''} */}

//                 </form>

//             </div>
//             <div>
//                 {
//                     data.type_of_product == "Medicine" ? <MedicineData /> : ""
//                 }
//             </div>
//             <div className='text-start' style={{ marginTop: '5vh' }}>
//                 <Link to="/displaymedicine" className='text-decoration-none'>View All & Search product</Link>
//             </div>

//         </div>


//     )
// }

// export default Quantity
