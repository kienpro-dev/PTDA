import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import { toast } from 'react-toastify';
import img from '../../assets/images/bgSidebar.jpg'
import { Button, Modal } from 'react-bootstrap';
import { postCreateNewProduct, putUpdateProduct } from '../../store/apiRequest';


function ModalUpdateProduct({ show, setShow, dataProduct, fetchListProduct }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [disCount, setDiscount] = useState();
    const [stock, setStock] = useState();
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    useEffect(() => {
        console.log("product", dataProduct);
    }, [dataProduct])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    // const validateEmail = (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   };    

    const handleUpdateProduct = async () => {
        dataProduct = {
            id: dataProduct.id,
            name: name,
            price: Number(price),
            description: description,
            image: image,
            discount: Number(disCount),
            stock: Number(stock)
        }
        console.log(dataProduct);
        putUpdateProduct(dataProduct);
        await fetchListProduct();
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
                            <label className="form-label">Price</label>
                            <input className="form-control"
                                onChange={(event) => setPrice(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Discount</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setDiscount(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setImage(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setStock(event.target.value)} />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus /> Upload ảnh sản phẩm
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
                                <span>Xem trước ảnh sản phẩm</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateProduct;