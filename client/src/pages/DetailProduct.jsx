import '../assets/scss/components/DetailProduct.scss'
import ReactStars from "react-rating-stars-component";
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import FoodSuggestions from '../components/homeUser/FoodSuggestions';
import { getDetailProducts, postAddToCart, searchProduct } from '../store/apiRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
const firstExample = {
    size: 18,
    value: 4,
    edit: false
};

const DetailProduct = () => {
    const { idShop, idProduct } = useParams();
    const [dataProduct, setDataProduct] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const search = "";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchDetailProduct = async () => {
        const res = await getDetailProducts(idProduct, idShop);
        if (res && res.data && res.data.data) {
            setDataProduct(res.data.data);
        }
    }
    const fetchListProduct = async () => {
        const res = await searchProduct(encodeURIComponent(search));
        setListProduct(res.data.data.items);

    }
    useEffect(() => {
        fetchListProduct();
    }, [])
    useEffect(() => {
        fetchDetailProduct();
    }, [idProduct, idShop])

    const handleAddToCart = async (product) => {
        dispatch(addToCart(product));
        const res = await postAddToCart(dataProduct.productId, 1, idShop);
    }
    const [valueInput, setValueInput] = useState(1);
    const handleValueInput = (e) => {
        setValueInput(e.target.value);
    }

    const handleBuy = () => {
        navigate("/order");
    }

    return (
        <div className='detail detail-container'>
            <div>
                <div className='detail-product'>
                    <div className='detail-product-image'>
                        <img src={dataProduct.productImageUrl ? dataProduct.productImageUrl : dataProduct.image} alt="" />
                    </div>
                    <div className='detail-product-infor'>
                        <h3>{dataProduct.productName}</h3>
                        <span className='product-rating'><ReactStars {...firstExample} /></span>
                        <span className='shop-address'>{dataProduct.shopAddress}</span> <br />
                        <div className='detail-product-infor-price'>
                            <span>{dataProduct.productPrice}VND</span>
                        </div>
                        <hr />
                        <div className='detail-product-infor-number'>
                            <div>
                                <span>Số lượng</span>
                                <div className='detail-product-infor-number-change'>
                                    <Button
                                        className='numberOfProd'
                                        text='-' />
                                    <input value={valueInput} onChange={handleValueInput} />
                                    <Button
                                        className='numberOfProd'
                                        text='+' />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <br />
                        <div className='detail-product-add'>
                            <Button
                                className='detail-product-add-to-cart'
                                text="Thêm vào giỏ hàng"
                                onClick={() => handleAddToCart(dataProduct)} />
                            <Button
                                className='detail-product-add-to-buy'
                                text='Đặt hàng'
                                onClick={() => handleBuy()}
                            />
                        </div> <br />
                        <hr />
                        <div>
                            <ul>
                                <li>Nguyên liệu làm món ăn cam kết là nguyên liệu sạch</li>
                                <li>Giao hàng nhanh</li>
                                <li>Nếu sản phẩm bị lỗi, cửa hàng sẽ hoàn tiền</li>
                            </ul>
                        </div>
                        <hr />
                        <div className="detail-share">
                            <p>Danh mục: <span>{dataProduct.categoryName}</span></p>
                            <p>
                                Chia sẻ
                                <Button text={<i className="fa-brands fa-facebook"></i>} />
                                <Button text={<i className="fa-brands fa-facebook-messenger"></i>} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="detail-description">
                    <div>
                        <div className='title-description'>
                            Mô Tả
                        </div>
                        <p>
                            Bún bề bề, một món ăn truyền thống của miền Trung Việt Nam, là sự kết hợp tuyệt vời giữa sợi bún mềm mịn và hương vị đặc trưng của loài hải sản bề bề tươi ngon. Sợi bún được nấu chín vừa đủ, giữ nguyên độ dai mềm, tạo nền tảng cho món ăn đầy hấp dẫn này.

                            Bề bề, với thịt trắng tinh khiết và vị ngọt tự nhiên, được chế biến thành những miếng nhỏ, thêm vào bát bún tạo nên sự phong phú về hương vị. Bên cạnh đó, món bún bề bề còn kèm theo một số nguyên liệu khác như rau sống tươi mát, hành phi giòn thơm, và nước mắm chua ngọt được pha chế đậm đà.

                            Đến khi cắn miếng bún thơm ngon, bạn sẽ cảm nhận được sự hòa quyện của hương vị độc đáo. Vị ngọt tự nhiên của thịt bề bề, hòa quyện cùng vị chua, mặn và ngọt của nước mắm, tạo nên một trải nghiệm ẩm thực tuyệt vời. Bên cạnh đó, sự tươi mát của rau sống và hành phi làm tăng thêm sự đa dạng và hấp dẫn cho món ăn này.
                            <br />
                            Bún tôm, một món ăn truyền thống của miền Nam Việt Nam, được biết đến với sự tươi ngon và hương vị độc đáo. Sợi bún mềm mịn, kết hợp với tôm tươi ngon, tạo nên một món ăn hấp dẫn và đậm đà.

                            Tôm là nhân vật chính trong món bún tôm. Tôm tươi được chế biến thành những miếng nhỏ, thêm vào bát bún tạo nên sự phong phú về hương vị. Vị ngọt tự nhiên của tôm hòa quyện với vị chua, mặn và ngọt của nước mắm, tạo nên một hương vị độc đáo và hấp dẫn.

                            Bên cạnh đó, món bún tôm còn kèm theo các nguyên liệu khác như rau sống tươi mát, hành phi giòn thơm và các loại gia vị như ớt, tỏi, và nước mắm chua ngọt. Tất cả các thành phần này tạo nên sự cân đối và hài hòa về hương vị trong món ăn.

                            Khi thưởng thức món bún tôm, bạn sẽ cảm nhận được sự tươi mát và đậm đà của hương vị. Sợi bún mềm mịn kết hợp với tôm tươi ngon, rau sống tươi mát và hành phi giòn thơm tạo nên một trải nghiệm ẩm thực tuyệt vời và đáng nhớ.
                            <br />
                            Mỳ trộn full topping, một món ăn đường phố phổ biến và thú vị, đang làm mưa làm gió trong thế giới ẩm thực hiện nay. Mỳ trắng mềm mịn được trộn đều với các loại topping đa dạng, tạo nên một sự kết hợp hài hòa giữa vị ngọt, mặn, chua và cay.

                            Khi bạn nhìn vào mỳ trộn full topping, bạn sẽ ngạc nhiên bởi sự phong phú của các loại topping đa dạng. Từ thịt gà nướng mềm mịn, xúc xích thơm ngon, đậu phụ chiên giòn, đến rau sống tươi mát, hành phi giòn thơm và chấm nước mắm chua ngọt, tất cả được trộn đều với mỳ tạo nên một tác phẩm ẩm thực đẹp mắt và hấp dẫn.

                            Khi bạn thưởng thức mỳ trộn full topping, mỗi miếng mỳ mềm mịn sẽ mang đến một trải nghiệm đa vị tuyệt vời. Vị ngọt tự nhiên của thịt gà, vị thơm của xúc xích, vị giòn của đậu phụ
                        </p>
                        <br />

                        <div className="embed-responsive aspect-video">
                            <iframe src='https://www.youtube.com/embed/I_n1IQggIQ4'
                                width="300px"
                                height="600px"
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowfullscreen
                                title='video'
                            />                        </div>
                    </div>
                </div> <hr />
                <div className="detail-similar">
                    <FoodSuggestions
                        title="Món Ăn Tương Tự"
                        data={listProduct}
                        color='#1e1d23'
                        isHorizontalCard={false}
                        isSlideShow={true}
                    />
                </div>
            </div>
        </div>

    )
}

export default DetailProduct