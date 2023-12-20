import { useState } from 'react';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import { toast } from 'react-toastify';
import img from '../../assets/images/bgSidebar.jpg'
import { Button, Modal } from 'react-bootstrap';
import { postCreateNewCategory } from '../../store/apiRequest';


function ModalAddNewCategory({ show, setShow, fetchListCategory }) {
    const [name, setName] = useState("");

    const handleClose = () => {
        setShow(false);
    }

    const handleAddNewCategory = async () => {
        postCreateNewCategory(name);
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
                    <Modal.Title>Thêm mới danh mục</Modal.Title>
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
                    <Button variant="primary" onClick={handleAddNewCategory}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewCategory;