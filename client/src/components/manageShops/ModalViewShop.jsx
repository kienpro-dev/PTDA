import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/scss/components/ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';


function ModalViewShop({ show, setShow, dataShop }) {
    const [name, setName] = useState("");
    const [hotline, setHotline] = useState("");
    const [timeOpen, setTimeOpen] = useState("");
    const [timeClose, setTimeClose] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if (!_.isEmpty(dataShop)) {
            setName(dataShop.name);
            setHotline(dataShop.hotline);
            setTimeOpen(dataShop.timeOpen);
            setTimeClose(dataShop.timeClose);
            setImage(dataShop.image);
            setPreviewImage(dataShop.previewImage);
            console.log(show);
        }
    }, [dataShop]);

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
                    <Modal.Title>View Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="email"
                                className="form-control"
                                value={dataShop.name}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input
                                className="form-control"
                                value={dataShop.hotline}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time Open</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataShop.timeOpen}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time Close</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataShop.timeClose}
                                disabled={true}
                            />
                        </div>
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

export default ModalViewShop;