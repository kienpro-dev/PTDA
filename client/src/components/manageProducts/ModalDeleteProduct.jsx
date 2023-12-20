import { Modal } from "react-bootstrap"
import { deleteProduct } from "../../store/apiRequest";
import { useEffect } from "react";

const ModalDeleteProduct = ({ show, setShow, fetchListProduct, productId }) => {

    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        deleteProduct(productId);
        await fetchListProduct();
        handleClose();
    }
    useEffect(() => {
        fetchListProduct()
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
                <Modal.Body>Bạn có chắc muốn xóa sản phẩm này?</Modal.Body>
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

export default ModalDeleteProduct