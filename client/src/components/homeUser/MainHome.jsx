import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Category from './Category';
import Advertisement from './Advertisement';
import FoodSuggestions from './FoodSuggestions';
import PopularDishes from './PopularDishes';
import Services from './Services';
import imgProduct from '../../assets/images/productImage.jpg'
import { getAllProducts, getAllShops, searchProduct } from '../../store/apiRequest';

const MainHome = () => {
    const [listDataProduct, setListDataProduct] = useState([]);
    const [search, setSearch] = useState("");

    const fetchListProduct = async () => {
        const res = await searchProduct(encodeURIComponent(search));
        setListDataProduct(res.data.data.items);
    }

    useEffect(() => {
        fetchListProduct();
    }, []);

    return (
        <div className='home'>
            <Banner />
            <Category />
            <Advertisement />
            <FoodSuggestions
                title="Gợi ý món ăn"
                data={listDataProduct}
                className='bgColorImage'
                color='#1e1d23'
                isHorizontalCard={false}
                isSlideShow={true}
            />
            <PopularDishes
                data={listDataProduct}
            />
            <Services />
        </div>
    );
};

export default MainHome;