import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import img from '../assets/images/loginImage.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    return (
        <div className='login'>
            <div className='login__center'>
                <div className='login-close' onClick={() => navigate('/login')}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </div>
                <div className='login__form'>
                    <Formik
                        initialValues={{
                            username: '',
                            email: ''
                        }}
                        validationSchema={
                            Yup.object({
                                username: Yup.string()
                                    .required("Required!"),
                                email: Yup.string()
                                    .required("Required!")
                                    .email('This is not an email')
                            })
                        }
                        onSubmit={async (value) => {
                            try {
                                await axios.post('http://localhost:8080/api/v1/auth/forget-password', value)
                                setIsError(false)
                                setIsSuccess(true);
                                setTimeout(() => {
                                    navigate('/login')
                                }, 2000)
                            } catch (error) {
                                setIsError(true);
                                setTimeout(() => {
                                    setIsError(false);
                                }, 6000)
                                setIsSuccess(false);
                            }
                        }}
                    >
                        {({
                            values,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form action="" onSubmit={handleSubmit}>
                                <div className="img">
                                    <img src={img} alt="" />
                                </div>
                                <h1 style={{ fontSize: '28px' }}>Forgot Password</h1> <br />
                                <div className='login__form-group'>
                                    <label htmlFor="username">Username</label> <br />
                                    <div className="login-inp">
                                        <Field
                                            type="text"
                                            name="username"
                                            className="field"
                                        />
                                    </div>
                                    <div className='err-message'>
                                        <ErrorMessage name='username'></ErrorMessage>
                                    </div>
                                </div>
                                <div className='login__form-group' style={{ marginTop: 36 }}>
                                    <label htmlFor="email">Gmail</label> <br />
                                    <div className="login-inp login-pass">
                                        <div>
                                            <Field
                                                name="email"
                                                className="field"
                                                size="28"
                                            />
                                        </div>
                                    </div>
                                    <div className='err-message'>
                                        <ErrorMessage name='email'></ErrorMessage>
                                    </div>
                                </div> <br />
                                <button className='login-btn' type='submit'>Submit</button>
                                <br /> <br />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            {
                isError &&
                <Alert title='Lỗi!' describe='Sai tên đăng nhập hoặc gmail hoặc bạn chưa đăng ký tài khoản.' className='error'></Alert>
            }
            {
                isSuccess &&
                <Alert title='Thành công!' describe='Chúng tôi đã gửi mật khẩu mới đến gmail của bạn, vui lòng check gmail.' className='success'></Alert>
            }
        </div>
    );
};

export default ForgotPassword;