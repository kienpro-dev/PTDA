import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Loading';
import axios from 'axios';
import Error from '../Error';
import { api } from '../../store/apiRequest';
const Category = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [isError, setIsError] = useState(false);
    const [dataListCategory, setDataListCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/v1/category");
                setDataListCategory(result.data.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setIsError(true);
            }
        })();
    }, [])
    return (
        <div className='home-category home-container'>
            {
                !isLoading && !isError &&
                <div className="list-category">
                    <h1>Danh mục sản phẩm</h1>
                    <div className="list-category-card">
                        <Slider {...settings}>
                            {
                                dataListCategory ? dataListCategory.map((category) => (
                                    <div className='categoryItem' key={category.categoryId}>
                                        <div className='categoryImage'>
                                            <img src={category.image} alt="" />
                                        </div>
                                        <div className='categoryContent'>
                                            <h4>{category.name}</h4>
                                            <p>{category.quantity} sản phẩm</p>
                                        </div>
                                    </div>

                                )) : setIsError(true)
                            }
                        </Slider>
                    </div>
                </div>
            }
            {
                isLoading && <Loading />
            }
            {
                isError && <Error />
            }
        </div >
    );
};

export default Category;