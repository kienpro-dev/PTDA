import React, { useEffect, useState } from 'react';
import FoodSuggestions from './homeUser/FoodSuggestions';
import imgProduct from '../assets/images/productImage.jpg';
import Button from './Button';
import Icon from './Icon';
import Header from './Header';
import Footer from './Footer';
import { searchProduct } from '../store/apiRequest';
import CardSearch from './CardSearch';


const Search = () => {
    const [search, setSearch] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const fetchSearchProducts = async () => {
        const res = await searchProduct(encodeURIComponent(search));
        setDataSearch(res.data.data.items);
    }

    const handleSearchFood = async () => {
        fetchSearchProducts();
    }

    useEffect(() => {
        fetchSearchProducts();
    }, [])
    return (
        <div>
            <div className='search search-container flex flex-column'>
                <div className='search-products'>
                    <form 
                    className='form-search-products'
                    onSubmit={(e) => { e.preventDefault(); handleSearchFood()}}>
                        <input
                            className='input-search-product'
                            placeholder='Nhập tên món ăn.......'
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                        <button className='btn btn-primary button-search-product' onClick={() => handleSearchFood()}>Tìm kiếm</button>
                    </form>
                </div>
                <div className='list-products-search'>
                    {/* <FoodSuggestions
                        title="Nho"
                        data={dataSearch}
                        isHorizontalCard={false}
                        color='#1e1d23'
                        isSlideShow={false}
                    /> */}
                    {dataSearch.map((item) => {
                        if (!item._id || item === null) {
                            return <CardSearch
                                key={item.productId}
                                id={item.productId}
                                image={item.productImageUrl}
                                productName={item.productName}
                                shopAddress={item.shopAddress}
                                price={item.productPrice}
                                shopId={item.shopId}
                                />
                        }
                    })}
                    {/* <div className="order-history-paging">
                        <Button className='btn-history-paging' text={<Icon className="fa-solid fa-angles-left"></Icon>}></Button>
                        <Button className='btn-history-paging  active' text='1'></Button>
                        <Button className='btn-history-paging' text='2'></Button>
                        <Button className='btn-history-paging' text='3'></Button>
                        <Button className='btn-history-paging' text='4'></Button>
                        <Button className='btn-history-paging' text={<Icon className="fa-solid fa-angles-right"></Icon>}></Button>
                    </div> */}
                </div>
                {/* <button className='btn btn-primary m-30'>Xem thêm</button> */}
            </div>
        </div>
    );
};

export default Search;