import React, { useContext, useEffect, useState } from 'react'
import './style/style.css'
import Footer from '../Components/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from "swiper";
import ProtContext from '../context/productdata/ProtContext';
import './style/slide.css'
import 'swiper/css';
import 'swiper/css/navigation';
import BeautyCard from './Card/BeautyCard';
import { Link } from 'react-router-dom';
import MedicineCard from './Card/MedicineCard';
import WellnessCard from './Card/WellnessCard';
import SearchCard from './Card/SearchCard';

const Home = () => {


    useEffect(() => {
        document.title = "MyMeds - Home"
        dispalyBeauty();
        displayMedicine();
        displayWellness();
    }, [])
    const [swiperRef, setSwiperRef] = useState(null);

    const context = useContext(ProtContext)
    const { beauty_product, searchpro, dispalyBeauty, addtocart, medicine_product, displayMedicine, wellness_product, displayWellness } = context

   

    return (
        <div style={{ position: 'relative', zIndex: '0' }}>
            {
                searchpro.length === 0
                    ?
                    <div className="container-fluid">
                        <div className="p-2 pt-4">
                            <Swiper
                                navigation={true}
                                modules={[Navigation]}
                                className="mySwiper border-0 rounded"
                                style={{ height: '50vh' }}
                            >
                                <SwiperSlide>
                                    <Link to="/medicine">
                                        <img src="./slider-img/medicine.png" alt="medicine" />
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link to="/beauty">
                                        <img src="./slider-img/beauty.png" alt="beauty" />
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link to="/wellness">
                                        <img src="./slider-img/wellness.png" alt="wellness" />
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        {/* medicine slider  */}
                        <div>
                            <div className="my-2 p-2 d-flex justify-content-between">
                                <h2>Medicine Product</h2>
                                <Link to='/medicine' className='text-primary text-decoration-none'>View All</Link>
                            </div>

                            <div className="">
                                <Swiper
                                    onSwiper={setSwiperRef}
                                    slidesPerView={5}
                                    // centeredSlides={true}
                                    spaceBetween={30}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                    style={{ padding: '10px' }}
                                >
                                    {
                                        medicine_product.map((medicine) => {
                                            return <SwiperSlide key={medicine._id}><MedicineCard medicine={medicine} addtocart={addtocart} /></SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                        {/* beauty slider  */}
                        <div>
                            <div className="my-2 p-2 d-flex justify-content-between">
                                <h2>Beauty Product</h2>
                                <Link to='/beauty' className='text-primary text-decoration-none'>View All</Link>
                            </div>

                            <div className="">
                                <Swiper
                                    onSwiper={setSwiperRef}
                                    slidesPerView={5}
                                    // centeredSlides={true}
                                    spaceBetween={30}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                    style={{ padding: '10px' }}
                                >
                                    {
                                        beauty_product.map((beauty) => {
                                            return <SwiperSlide key={beauty._id}><BeautyCard beauty={beauty} addtocart={addtocart} /></SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>

                        {/* wellness slider  */}
                        <div>
                            <div className="my-2 p-2 d-flex justify-content-between">
                                <h2>Wellness Product</h2>
                                <Link to='/wellness' className='text-primary text-decoration-none'>View All</Link>
                            </div>

                            <div className="">
                                <Swiper
                                    onSwiper={setSwiperRef}
                                    slidesPerView={5}
                                    // centeredSlides={true}
                                    spaceBetween={30}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                    style={{ padding: '10px' }}
                                >
                                    {
                                        wellness_product.map((wellness) => {
                                            return <SwiperSlide key={wellness._id}><WellnessCard wellness={wellness} addtocart={addtocart} /></SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    :
                    <div className='m-5 '>
                        <a href='/' className='btn border-0 my-3'>Home</a>
                        <div className="row ">
                            {searchpro.map((search) => {
                                return <div className="col-md-3" key={search._id}>
                                    <SearchCard search={search} key={search._id} addtocart={addtocart} />
                                </div>
                            })}
                        </div>
                    </div>
            }
            <Footer />
        </div>

    )
}

export default Home
