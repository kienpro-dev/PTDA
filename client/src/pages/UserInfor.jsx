import { Field, Formik, ErrorMessage } from "formik"
import img from "../assets/images/user.png"
import '../assets/scss/components/UserInfor.scss'
import Button from "../components/Button"
import { getCustomer, putUpdateUser } from "../store/apiRequest"
import axios from "axios"
import { useEffect, useState } from "react"
import * as Yup from 'yup'
import Alert from "../components/Alert"
import Loading from '../components/Loading'
import { useNavigate } from "react-router-dom"

const UserInfor = () => {
    const customerID = localStorage.getItem("cartId");
    const [userInfor, setUserInfor] = useState(null)
    const [position, setPosition] = useState(null);
    const navigate = useNavigate();
    const getCurrentLocation = async () => {
        try {
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            resolve({ latitude, longitude });
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                });
                setPosition(position);
            } else {
                throw new Error("Geolocation is not supported by this browser.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddress = () => {
        getCurrentLocation();
        let getaddress = {
            customerId: customerID,
            latitude: position.latitude,
            longitude: position.longitude
        }
        const res = axios.post(`http://localhost:8080/api/v1/address/${userInfor.customerId}?latitude=${position.latitude}&longitude=${position.longitude}`, { params: getaddress })
    }

    const getInforUser = async () => {
        const res = await getCustomer(customerID);
        setUserInfor(res.data.data)
    }
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        getInforUser();
    }, [])
    return (
        <>
            {
                userInfor ?
                    <div className='userinfor-container'>
                        <div className="userinfor">
                            <div className='userinfor__title'>
                                <h1>
                                    Thông tin cá nhân
                                </h1>
                            </div>
                            <div className='userinfor__main'>
                                <div className="userinfor__basic">
                                    <div className="userinfor__basic--picture">
                                        <img src={img} />
                                    </div>
                                    <div className='userinfor__basic--name'>
                                        <h3>{userInfor.fullName ? userInfor.fullName : "Không xác định"}</h3>
                                    </div>
                                    <div className='userinfor__basic--main'>
                                        <div>
                                            <div className='userinfor__basic--main--phone'>
                                                <i className='fa-solid fa-phone'></i>
                                                <span>{userInfor.phoneNumber ? userInfor.phoneNumber : 'Không xác định'}</span>
                                            </div>
                                            <div className='userinfor__basic--main--address'>
                                                <i className="fa-solid fa-house-chimney"></i>
                                                <span>{userInfor.address.addressName ? userInfor.address.addressName : 'Không xác định'}</span>
                                            </div>
                                            <div className='userinfor__basic--main--birth'>
                                                <i className='fa fa-birthday-cake'></i>
                                                <span>{userInfor.dob ? userInfor.dob.split("T")[0].split("-").reverse().join("-") : 'Không xác định'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Formik
                                    initialValues={{
                                        fullname: userInfor.fullName,
                                        day: userInfor.dob ? parseInt(userInfor.dob.split("T")[0].split("-")[2]) : '',
                                        month: userInfor.dob ? parseInt(userInfor.dob.split("T")[0].split("-")[1]) : '',
                                        year: userInfor.dob ? parseInt(userInfor.dob.split("T")[0].split("-")[0]) : '',
                                        phoneNumber: userInfor.phoneNumber,
                                        address: userInfor.address.addressName
                                    }}
                                    enableReinitialize
                                    validationSchema={Yup.object({
                                        fullname: Yup.string()
                                            .required("Required!"),
                                        day: Yup.string()
                                            .required("Required!"),
                                        month: Yup.string()
                                            .required("Required!"),
                                        year: Yup.string()
                                            .required("Required!"),
                                        phoneNumber: Yup.string()
                                            .required("Required!")

                                    })}
                                    onSubmit={async (values) => {
                                        // console.log(values);
                                        try {
                                            let valuesNewUser = {
                                                id: customerID,
                                                fullName: values.fullname,
                                                phoneNumber: values.phoneNumber,
                                                dob: `${values.year}-${values.month < 10 ? `0${values.month}` : `${values.month}`}-${values.day < 10 ? `0${values.day}` : `${values.day}`}`
                                            }
                                            await putUpdateUser(valuesNewUser);
                                            setIsSuccess(true);
                                            setIsError(false)
                                            await getInforUser();
                                            navigate("/order")
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
                                    }) => (
                                        <div className='userinfor__change--main'>
                                            <form action="" onSubmit={handleSubmit}>
                                                <div className='userinfor__changeInfor'>
                                                    <p>Thông tin chi tiết</p>
                                                    <hr />
                                                    <div className="changeInforItemGroup">
                                                        <div className='userinfor__changeInfor--name'>
                                                            <span>Họ tên</span>
                                                            <div className="inp">
                                                                <Field type='text' name="fullname" />
                                                            </div>
                                                            <div className='err-message'>
                                                                <ErrorMessage name='fullname'></ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div className='userinfor__changeInfor--birth'>
                                                            <span>Ngày sinh</span>
                                                            <div className="inp">
                                                                {/* <Field type='text' name="birthday" /> */}
                                                                <div className="select-container">
                                                                    <div className="select">
                                                                        <Field as="select"
                                                                            name="day"

                                                                        >
                                                                            <option value="">Day</option>
                                                                            {Array.from({ length: 31 }, (_, index) => (
                                                                                <option key={index + 1} value={index + 1}>
                                                                                    {index + 1}
                                                                                </option>
                                                                            ))}
                                                                        </Field>
                                                                        <div className='err-message'>
                                                                            <ErrorMessage name='day'></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                    <div className="select">
                                                                        <Field as="select"
                                                                            name="month"
                                                                        >
                                                                            <option value="">Month</option>
                                                                            {Array.from({ length: 12 }, (_, index) => (
                                                                                <option key={index + 1} value={index + 1}>
                                                                                    {index + 1}
                                                                                </option>
                                                                            ))}
                                                                        </Field>
                                                                        <div className='err-message'>
                                                                            <ErrorMessage name='month'></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                    <div className="select">
                                                                        <Field as="select"
                                                                            name="year"
                                                                        >
                                                                            <option value="">Year</option>
                                                                            {Array.from({ length: 100 }, (_, index) => {
                                                                                const currentYear = new Date().getFullYear();
                                                                                const year = currentYear - index;
                                                                                return (
                                                                                    <option key={year} value={year}>
                                                                                        {year}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                        <div className='err-message'>
                                                                            <ErrorMessage name='year'></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='userinfor__changeInfor--phone'>
                                                            <span>Số điện thoại</span>
                                                            <div className="inp">
                                                                <Field type='text' name="phoneNumber" />
                                                            </div>
                                                            <div className='err-message'>
                                                                <ErrorMessage name='phoneNumber'></ErrorMessage>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="changeInforItemGroup changeInforItemGroup_address ">
                                                        <div className='userinfor__changeInfor--address'>
                                                            <span>Địa chỉ</span>
                                                            <div className="inp">
                                                                {/* <Field type='text' name="address" /> */}
                                                                <Field name="address">
                                                                    {({ field }) => (
                                                                        <input
                                                                            type="text"
                                                                            {...field}
                                                                            disabled
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <Button text={<i className="fa-solid fa-crosshairs" onClick={() => handleAddress()}></i>}></Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="changeInforItemGroup">
                                                        <Button text='Submit' />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </div >
                        {
                            isError &&
                            <Alert title='Lỗi!' describe='Không thể cập nhập dữ liệu.' className='error'></Alert>
                        }
                        {
                            isSuccess &&
                            <Alert title='Thành công!' describe='Đã cập nhập dữ liệu' className='success'></Alert>
                        }
                    </div > : <Loading />
            }
        </>
    )
}

export default UserInfor