import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonComponent from '../components/Button';
import Icon from '../components/Icon';
import shopbanner from '../assets/images/shop-banner.jpg';
import FoodSuggestions from '../components/homeUser/FoodSuggestions';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getCategoryByIdShop, getDataShopbyId, getProductsByIdShop, getProductsByIdShopAndIdCategory } from '../store/apiRequest';
import CardSearch from '../components/CardSearch';

const Shop = () => {
    const [show, setShow] = useState(false);
    const { idShop } = useParams();
    // console.log(useParams());
    // console.log(idShop);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dataShop, setDataShop] = useState(null);
    const [dataCategory, setDataCategory] = useState(null);
    const [dataProducts, setDataProducts] = useState(null);
    const getDataShop = async () => {
        const res = await getDataShopbyId(idShop);
        // console.log(res);
        setDataShop(res.data.data);
    }
    const getCategoryByShopId = async () => {
        const res = await getCategoryByIdShop(idShop);
        console.log(res);
        setDataCategory(res.data.data.items)
    }
    const getProductsByShopId = async () => {
        const res = await getProductsByIdShop(idShop);
        // console.log(res);
        setDataProducts(res.data.data.items)
    }
    const handleClickDataProduct = async (idcategory) => {
        const res = await getProductsByIdShopAndIdCategory(idShop, idcategory);
        // console.log(res);
        setDataProducts(res.data.data.items)

    }
    useEffect(() => {
        getDataShop();
        getCategoryByShopId();
        getProductsByShopId();
    }, [])
    return (
        <>
            {
                dataShop ?
                    <div className='shop'>
                        <div className="shop-banner">
                            <img src={shopbanner} alt="" />
                            <div className='text-abs-center'>
                                <h1 >
                                    {dataShop.name}
                                </h1>
                                <p>
                                    {dataShop.address}
                                </p>
                                <p>
                                    <span style={{ color: "#00a149", fontWeight: 900 }}>Hotline: </span>
                                    <span style={{ textDecoration: "underline", color: "#000" }}>
                                        {dataShop.hotline}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="shop-filter">
                            <div className="filter">
                                <>
                                    <Button variant="primary" onClick={handleShow}>
                                        <i className="fa-solid fa-filter"></i>
                                        FILTER
                                    </Button>

                                    <Offcanvas show={show} onHide={handleClose}>
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>Danh mục của Shop</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <div className="shop-list-cateorys">
                                                {
                                                    dataCategory && dataCategory.length ?
                                                        dataCategory.map((item) => (
                                                            <button key={item.categoryId} onClick={() => handleClickDataProduct(item.categoryId)}>{item.name} </button>
                                                        ))
                                                        : <div>Không thể lấy dữ liệu của danh mục trong shop</div>
                                                }
                                            </div>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </>
                            </div>
                            <div className="select">
                                <>
                                    <Form.Select>
                                        {/* <option>Mặc định</option>
                                        <option>SX theo giá từ cao đến thấp</option>
                                        <option>SX theo giá từ thấp đến cao</option> */}
                                        {
                                            dataCategory && dataCategory.length ?
                                                dataCategory.map((item) => (
                                                    <option value={item.name} key={item.key}>{item.name}</option>
                                                ))
                                                : <div>Không thể lấy dữ liệu của danh mục trong shop</div>
                                        }
                                    </Form.Select>
                                </>
                            </div>
                        </div>
                        <div className="shop-list-cards">
                            {/* <FoodSuggestions
                                title="Gợi ý món ăn"
                                data={dataProducts}
                                className='NoneButton'
                                color='#1e1d23'
                                isHorizontalCard={false}
                                isSlideShow={false}
                            /> */}
                            <div>
                                {dataProducts && dataProducts.length > 0 ? dataProducts.map((item) => {
                                    if (!item._id || item === null) {
                                        return <CardSearch
                                            key={item.productId}
                                            id={item.productId}
                                            image={item.productImageUrl}
                                            productName={item.productName}
                                            shopAddress={item.shopAddress ? item.shopAddress : item.shopName}
                                            price={item.productPrice}
                                            shopId={item.shopId}
                                        />
                                    }
                                }) : <div>Không xác định</div>}
                            </div>
                            <br /><br /><br /> <br />
                            {/* <div className="order-history-paging">
                                <ButtonComponent className='btn-history-paging' text={<Icon className="fa-solid fa-angles-left"></Icon>}></ButtonComponent>
                                <ButtonComponent className='btn-history-paging  active' text='1'></ButtonComponent>
                                <ButtonComponent className='btn-history-paging' text='2'></ButtonComponent>
                                <ButtonComponent className='btn-history-paging' text='3'></ButtonComponent>
                                <ButtonComponent className='btn-history-paging' text='4'></ButtonComponent>
                                <ButtonComponent className='btn-history-paging' text={<Icon className="fa-solid fa-angles-right"></Icon>}></ButtonComponent>
                            </div> */}
                        </div>
                    </div> : <Loading />
            }
        </>
    );
};

export default Shop;