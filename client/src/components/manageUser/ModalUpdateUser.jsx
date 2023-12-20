import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/scss/components/ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateUser } from '../../store/apiRequest';


function ModalUpdateUser({ show, setShow, dataUser, fetchListUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClose = () => {
        setShow(false);
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            console.log('start');
        }
    }

    const handleSubmitUpdateUser = async () => {
        dataUser = {
            // // ...state,
            id: dataUser.id,
            // createdDate: dataUser.createdDate,
            // lastModifiedDate: dataUser.lastModifiedDate,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            dob: dob,
        }
        console.log(dataUser);
        putUpdateUser(dataUser);
        console.log("data: ", dataUser);
        handleClose();
        await fetchListUser();
    }

    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email);
            setPassword('');
            setUsername(dataUser.username);
            console.log("hello");
            console.log("dataUser.username", dataUser.username);
        }
    }, [dataUser, phoneNumber]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >

                <Modal.Header closeButton>
                    <Modal.Title>Update customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-control"
                                // value={dataUser.fullName}
                                onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input
                                className="form-control"
                                // value={dataUser.address}
                                onChange={(event) => setAddress(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                // value={dataUser.phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date of Birth</label>
                            <input
                                className="form-control"
                                // value={dataUser.dob}
                                onChange={(event) => setDob(event.target.value)} />
                        </div>
                        {/* <div className="col-md-4">
                        <label className="form-label">State</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div> */}
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input type="file"
                                id="labelUpload"
                                hidden
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt="img" />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;