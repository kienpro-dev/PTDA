import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import { toast } from 'react-toastify';
import img from '../../assets/images/bgSidebar.jpg'
import { Button, Modal } from 'react-bootstrap';
import { postCreateNewShop, putUpdateShop } from '../../store/apiRequest';


function ModalUpdateShop({ show, setShow, dataShop, fetchListShop }) {
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
        console.log("Shop", dataShop);
    }, [dataShop])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }  

    const handleUpdateShop = async () => {
        dataShop = {
            id: dataShop.id,
            name, 
            timeOpen: timeOpen,
            timeClose: timeClose, 
            hotline: hotline
        }
        console.log(dataShop);
        putUpdateShop(dataShop);
        await fetchListShop();
        handleClose();
    }

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
                    <Modal.Title>Thêm mới sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input className="form-control"
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Hotline</label>
                            <input className="form-control"
                                onChange={(event) => setHotline(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time Open</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setTimeOpen(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time Close</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setTimeClose(event.target.value)} />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus /> Upload ảnh shop
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
                                <span>Xem trước ảnh shop</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdateShop}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateShop;