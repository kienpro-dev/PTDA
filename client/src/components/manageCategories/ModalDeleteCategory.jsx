import { Modal } from "react-bootstrap"
import { deleteCategory } from "../../store/apiRequest";
import { useEffect } from "react";

const ModalDeleteCategory = ({ show, setShow, fetchListCategory, categoryId }) => {

    const handleClose = () => setShow(false);
    const handleSubmitDeleteCategory = async () => {
        deleteCategory(categoryId);
        await fetchListCategory();
        handleClose();
    }
    useEffect(() => {
        fetchListCategory()
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
                    <button className="btn btn-primary" onClick={handleSubmitDeleteCategory}>
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalDeleteCategory