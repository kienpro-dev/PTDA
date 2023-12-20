import React, { useEffect, useState } from 'react'
import star from '../assets/images/star.png'
import money from '../assets/images/money.png'
import Button from './Button'
import { getDetailProducts, postAddToCart } from '../store/apiRequest'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { increment } from '../store/countItemsOfCart'
import { addToCart } from '../store/cartSlice'


const Card = ({
  id,
  shopId,
  image,
  productName,
  address,
  price
}) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const fetchDetailProduct = async (id) => {
    const res = await getDetailProducts(id);
    if (res && res.data && res.data.data) {
      setProduct(res.data.data);
    }
  }
  const handleAddToCart = async () => {
    dispatch(increment());
    dispatch(addToCart(product));
    const res = await postAddToCart(id, 1);
    console.log(res);
  }
  const handleClickCardProduct = async (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
    const res = await fetchDetailProduct(id);
    console.log(res);
  }
  useEffect(() => {
    fetchDetailProduct(id);
  }, [product.productId])

  return (
    <div className='card' onClick={() => handleClickCardProduct(id)}>
      <div className="box">Đang hoạt động</div>
      <div className='imgProduct'>
        <div>
          <img src={product.productImageUrl} alt="" />
        </div>
      </div>
      <div className="card-content">
        <div>
          <div className="card-content-nameproduct">
            <span>{product.productName}</span>
          </div>
          <p>{product.shopAddress}</p>
          <div className="productItem">
            <div style={{ display: 'flex', alignItems: 'center ' }}>
              <h3>{product.productPrice} VND</h3>
            </div>
            <div>
              <Button className="orderBtn" text={<i className='fa-solid fa-cart-shopping' />} onClick={() => handleAddToCart()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card