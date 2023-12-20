import '../assets/scss/components/Food.scss';
//import img from '../assets/images/imageLogin.jpg';

const Food = () => {
    return (
        <div className='food'>
            <div className="food-image">
                {/* <img src={img} /> */}
            </div>
            <div className='food-detail'>
                <h3>Canh gà nấm mỡ</h3>
                <h4>Nguyên liệu: nấm mỡ, gà, hành, cà rốt</h4>
                <div className='food-detail-price'>
                    <i className="fa-solid fa-dollar-sign"></i>
                    <span>70.000</span>
                </div>
            </div>
            <button className='food-addToCart'>+</button>
        </div>
    )
}

export default Food