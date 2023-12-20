import React from 'react';
import imgNotFound from '../assets/images/NotFoundImage.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='not-found'>
            <div>
                <h4>NOT FOUND</h4>
                <img src={imgNotFound} alt="" />
                <Button text='Quay Lại Trang Home' onClick={() => navigate('/')}></Button>
            </div>
        </div>
    );
};

export default NotFound;