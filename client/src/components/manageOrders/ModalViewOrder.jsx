import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/scss/components/ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';


function ModalViewOrder({ show, setShow, dataOrder }) {
    const [name, setName] = useState("");

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if (!_.isEmpty(dataOrder)) {
            setName(dataOrder.name);
            console.log(show);
        }
    }, [dataOrder]);

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
                    <Modal.Title>View Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                className="form-control"
                                value={dataOrder.name}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Created Date</label>
                            <input
                                className="form-control"
                                value={dataOrder.createdDate}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">LastModified Date</label>
                            <input
                                className="form-control"
                                value={dataOrder.lastModifiedDate}
                                disabled={true}
                            />
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

export default ModalViewOrder;