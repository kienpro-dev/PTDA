import logo from '../assets/images/logoWhite.png';
import visa from '../assets/images/visa.jpg';
import zalo from '../assets/images/zalo.png';
import vnpay from '../assets/images/vnpay.png';
import momo from '../assets/images/momo.png';
import '../assets/scss/components/Footer.scss'
const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <div className="footer-infor">
          <div className='footer-infor-logo'>
            <img src={logo} />
          </div>
          <div className='footer-infor-more'>
            <p>
              Trụ sở: 298 đường Cầu Diễn, phường Minh Khai           </p>
            <p>
              Quận Bắc Từ Liêm, Thành phố Hà Nội
            </p>
            <p>
              Số điện thoại:  02455712345
            </p>
            <p>
              Email: hitfood@gmail.com
            </p>
            <p>
              Facebook: https://www.facebook.com/hitfood<br />

            </p>
          </div>
        </div>
        <div className="footer-list">
          <span className='footer-list-title'>Danh mục sản phẩm</span>
          <ul className='footer-list-food'>
            <li>Rau củ quả</li>
            <li>Món chay</li>
            <li>Hải sản</li>
            <li>Phở</li>
            <li>Cháo</li>
            <li>Đồ ăn nhanh</li>
          </ul>
        </div>
        <div className="footer-shipping">
          <span className='footer-shipping-title'>Danh mục sản phẩm</span>
          <ul className='footer-shipping-name'>
            <li>GoJek</li>
            <li>GrabFood</li>
            <li>Now</li>
            <li>Giao hàng nhanh</li>
            <li>Giao hàng tiết kiệm</li>
          </ul>
        </div>
        <div className="footer-payment">
          <span>Phương thức thanh toán</span><br /><br />
          <div className="footer-payment-detail">
            <img src={visa} />
            <img src={vnpay} />
            <img src={momo} />
            <img src={zalo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer