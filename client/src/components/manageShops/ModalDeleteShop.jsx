import { Modal } from "react-bootstrap"
import { deleteShop } from "../../store/apiRequest";
import { useEffect } from "react";

const ModalDeleteShop = ({ show, setShow, fetchListShop, shopId }) => {
    const handleClose = () => setShow(false);
    const handleSubmitDeleteShop = async () => {
        deleteShop(shopId);
        await fetchListShop();
        handleClose();
    }
    useEffect(() => {
        fetchListShop()
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
                <Modal.Body>Bạn có chắc muốn xóa cửa hàng này?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Hủy
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitDeleteShop}>
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalDeleteShop