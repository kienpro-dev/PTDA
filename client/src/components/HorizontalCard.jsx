import React from 'react';
import star from '../assets/images/star.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getDetailProducts, postAddToCart } from '../store/apiRequest';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../store/countItemsOfCart';
import { addToCart } from '../store/cartSlice';


const HorizontalCard = ({
    id,
    shopId,
    image,
    productName,
    shopAddress,
    price }) => {

    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchDetailProduct = async () => {
        const res = await getDetailProducts(id, shopId);
        if (res && res.data && res.data.data) {
            setProduct(res.data.data);
        }
    }
    const handleClickCardProduct = async (id, shopId) => {
        navigate(`/shop/${shopId}/product/${id}`);
        window.scrollTo(0, 0);
        const res = await fetchDetailProduct(id, shopId);
    }

    const handleAddToCart = async () => {
        dispatch(addToCart(product));
        const res = await postAddToCart(id, 1, shopId);
    }

    useEffect(() => {
        fetchDetailProduct();
    }, [product.productId])
    return (
        <div className='horizontal-card' onClick={() => handleClickCardProduct(id, shopId)}>
            <div>
                <div className="horizontal-card-img">
                    <img src={image} alt="" />
                </div>
                <div className="horizontal-card-content">
                    <div>
                        <span>{productName}</span>
                        <div className='card-icon'>
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                        </div>
                        <p>{shopAddress}</p>
                        <h5>{price}VND</h5>
                    </div>
                    <div>
                        <Button className="orderBtn" text={<i className='fa-solid fa-cart-shopping' />} onClick={() => handleAddToCart()} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HorizontalCard;