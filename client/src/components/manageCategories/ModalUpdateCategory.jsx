import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import { toast } from 'react-toastify';
import img from '../../assets/images/bgSidebar.jpg'
import { Button, Modal } from 'react-bootstrap';
import { postCreateNewCategory, putUpdateCategory } from '../../store/apiRequest';


function ModalUpdateCategory({ show, setShow, dataCategory, fetchListCategory }) {
    const [name, setName] = useState("");

    const handleClose = () => {
        setShow(false);
    }
    useEffect(() => {
        console.log("Category", dataCategory);
    }, [dataCategory])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }  

    const handleUpdateCategory = async () => {
        dataCategory = {
            id: dataCategory.id,
            name: name
        }
        console.log(dataCategory);
        putUpdateCategory(dataCategory);
        await fetchListCategory();
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
                    <Modal.Title>Sửa danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input className="form-control"
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCategory}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateCategory;