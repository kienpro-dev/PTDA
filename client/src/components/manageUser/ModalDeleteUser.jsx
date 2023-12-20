import { Modal } from "react-bootstrap"
import Button from "../Button"
import { deleteUser } from "../../store/apiRequest";
import { useEffect } from "react";

const ModalDeleteUser = ({ show, setShow, fetchListUser, userId }) => {

    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        deleteUser(userId);
        await fetchListUser();
        handleClose();
    }
    useEffect(() => {
        fetchListUser()
    }, [])
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa người dùng này?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Hủy
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitDeleteUser}>
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalDeleteUser