import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import { getProductInCart, updateProductInCart } from '../store/apiRequest';
import { addToCart, decreaseCart, decreaseProductCart, getTotals } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartId, setCartId] = useState(0);
    const [dataProductInCart, setDataProductInCart] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart); 

    const getProductsInCart = async (cartId) => {
        const res = await getProductInCart(cartId); 
        setDataProductInCart(res.data.data);
    }

    const handleRemoveProductFromCart = async (product, productId, shopId) => {
        dispatch(decreaseProductCart(product));
        const res = await updateProductInCart(cartId, productId, 0, shopId);
    }

    const handleDecreaseProduct = async (product, productId, quantity, shopId) => {
        dispatch(decreaseCart(product));
        console.log(product);
        const res = await updateProductInCart(cartId, productId, quantity, shopId);
    }

    const handleIncreaseProduct = async (product, productId, quantity, shopId) => {
        dispatch(addToCart(product));
        const res = await updateProductInCart(cartId, productId, quantity, shopId);
        toast.success("Increase quantity of products successfully!", {
            position: "top-right"
        })
    }

    useEffect(() => {
        setCartId(localStorage.getItem("cartId"));
        getProductsInCart(cartId);            
    }, [cartId])

    useEffect(() => {
        dispatch(getTotals())
    }, [dispatch])

    return (
        <div>
            <Header />
            <div className="cart-container cart">
                <div >
                    <h1>Giỏ Hàng</h1>
                    <div className='cart-table'>
                        <table cellPadding='12px 16px' cellSpacing='0'>
                            <thead>
                                <tr>
                                    <th>Xóa</th>
                                    <th>Ảnh</th>
                                    <th>Sản Phẩm</th>
                                    <th>Giá</th>
                                    <th>Số Lượng</th>
                                    <th>Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataProductInCart && dataProductInCart.length > 0 ?
                                        cart.cartItems.map((item) => (
                                            <tr key={item.productId}>
                                                <td><Button text={<i className="fa-solid fa-trash-can"></i>} onClick={() => handleRemoveProductFromCart(item, item.productId, item.shopId)} /></td>
                                                <td><img src={item.productImageUrl} alt="" /></td>
                                                <td className='cart-product-name'>{item.productName}</td>
                                                <td>{(item.price) ? (item.price) : (item.productPrice)}đ</td>
                                                <td className='cart-items-quantity'>
                                                    <button onClick={() => handleDecreaseProduct(item, item.productId, item.quantity - 1, item.shopId)}>-</button>
                                                    <input type="text" value={item.quantity} />
                                                    <button onClick={() => handleIncreaseProduct(item, item.productId, item.quantity + 1, item.shopId)}>+</button>
                                                </td>
                                                <td className='cart-product-price'>{(item.price ? item.price * item.quantity : item.productPrice * item.quantity).toLocaleString('vi-VN')}đ</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={6}>Chưa có sản phẩm nào trong giỏ hàng</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-pay">
                        <hr />
                        <div>
                            <p>
                                Tổng tiền: <span>{cart.cartTotalAmount.toLocaleString('vi-VN')}đ</span>
                            </p>
                            <div>
                                <Button text='Thanh toán' onClick={() => navigate("/order")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Cart;