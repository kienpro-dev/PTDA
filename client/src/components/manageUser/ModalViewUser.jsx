import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/scss/components/ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';


function ModalViewUser({ show, setShow, dataUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [lastModifiedDate, setLastModifiedDate] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const [job, setJob] = useState("");
    const [address, setAddress] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClose = () => {
        setShow(false);
        // setEmail('');
        // setPassword('');
        // setFullName('');
        // setCreatedDate('');
        // setLastModifiedDate('');
        // setImage('');
        // setPreviewImage('');
        // setJob("");
        // setAddress("");
    }

    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email);
            setPassword('');
            setUsername(dataUser.username);
            setCreatedDate(dataUser.createdDate);
            setLastModifiedDate(dataUser.lastModifiedDate);
            setFullName(dataUser.fullName);
            setAddress(dataUser.address.addressName);
            setJob(dataUser.dob);
            setPhoneNumber(dataUser.phoneNumber);
            console.log(show);
        }
    }, []);

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
                    <Modal.Title>View user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={dataUser.email}
                                disabled={true}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled={true}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Created Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataUser.createdDate}
                                disabled={true}
                            // onChange={(event) => setPassword(event.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Modified Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastModifiedDate}
                                disabled={true}
                            // onChange={(event) => setPassword(event.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input disabled={true} type="text" className="form-control" value={fullName}
                                onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date of Birth</label>
                            <input disabled={true} type="text" className="form-control" value={job}
                                onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input disabled={true} type="text" className="form-control" value={address}
                                onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone number</label>
                            <input disabled={true} type="text" className="form-control" value={phoneNumber}
                                onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        {/* <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                disabled={true}
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
                                disabled={true}
                            />
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;