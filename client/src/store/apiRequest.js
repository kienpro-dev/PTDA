import axios from "axios"
import { toast } from "react-toastify";

const accessToken = localStorage.getItem("accessToken");
// console.log("hello here", accessToken);
export const api = `http://localhost:8080/api/v1`;

export const getAllUsers = () => {
    return axios.get(`${api}/user`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const getCurrentUserLogin = () => {
    return axios.get(`${api}/user/current`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        });
}

export const getCustomer = (id) => {
    return axios.get(`${api}/customer/${id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const getAllCustomers = () => {
    return axios.get(`${api}/customer`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const postCreateNewUser = (email, password, username) => {
    const userData = {
        email: email,
        password: password,
        repeatPassword: password,
        username: username
    };
    axios.post(`${api}/auth/register`, userData)
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteUser = (userId) => {
    axios.delete(`${api}/customer/` + userId, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(res => {
            console.log(`Xoa thanh cong`);
            window.location.reload();
        }).catch(err => {
            console.log(err)
        });
}

export const putUpdateUser = (data) => {
    axios.put(`${api}/customer/` + data.id,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(res => {
            // window.location.reload();
            console.log(`ok`);
        }).catch(err => {
            console.log(err)
        });
}

export const getAllProducts = () => {
    return axios.get(`${api}/product`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const getAllProductsByShop = (shopId) => {
    return axios.get(`${api}/product/`, shopId,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const postCreateNewProduct = (name, price, description, image, discount, stock) => {
    const product = {
        name: name,
        price: price,
        description: description,
        image: image,
        discount: discount,
        stock: stock
    };
    axios.put(`${api}/product`,
        product,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteProduct = (productId) => {
    axios.delete(`${api}/product/` + productId, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(res => {
            console.log(`Xoa thanh cong`);
            window.location.reload();
        }).catch(err => {
            console.log(err)
        });
}

export const putUpdateProduct = (product) => {
    axios.put(`${api}/product/` + product.id,
        product,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const getAllShops = () => {
    return axios.get(`${api}/shop`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const postCreateNewShop = (name, hotline, timeOpen, timeClose) => {
    const shop = {
        name: name,
        hotline: hotline,
        timeOpen: timeOpen,
        timeClose: timeClose
    };
    axios.post(`${api}/shop`,
        shop,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteShop = (shopId) => {
    axios.delete(`${api}/shop/` + shopId, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(res => {
            console.log(`Xoa thanh cong`);
            window.location.reload();
        }).catch(err => {
            console.log(err)
        });
}

export const putUpdateShop = (shop) => {
    axios.put(`${api}/shop/` + shop.id,
        shop,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const getAllCategories = () => {
    return axios.get(`${api}/category`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const postCreateNewCategory = (name, hotline, timeOpen, timeClose) => {
    const category = {
        name: name
    };
    axios.post(`${api}/category`,
        category,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteCategory = (categoryId) => {
    axios.delete(`${api}/category/${categoryId}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(res => {
            console.log(`Xoa thanh cong`);
            window.location.reload();
        }).catch(err => {
            console.log(err)
        });
}

export const putUpdateCategory = (category) => {
    axios.put(`${api}/category/${category.id}`,
        category,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error)
        })
}


export const getDetailProducts = (id, shopId) => {
    return axios.get(`${api}/user/get-product-detail/${id}/shop/${shopId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const postAddToCart = (productId, quantity, shopId) => {
    const data = {
        cartId: localStorage.getItem(`cartId`),
        productId: productId,
        quantity: quantity,
        shopId: shopId
    }
    axios.post(`${api}/cart/${data.cartId}/products?productId=${data.productId}&quality=${data.quantity}&shopId=${data.shopId}`,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
            toast.info('Thêm vào giỏ hàng thành công!', {
                position: `top-right`,
                autoClose: 2000
            });
        })
        .catch(error => {
            console.log(error);
            toast.info('Đăng nhập để thêm vào giỏ hàng', {
                position: `top-right`,
                autoClose: 2000
            });
        })
}

export const putUpdateCart = (cart) => {
    axios.put(`${api}/shop/${cart.id}`,
        cart,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(response => {
            console.log(`ok`, response);
        })
        .catch(error => {
            console.log(error);
            toast.info('Có lỗi xảy ra', {
                position: `top-right`,
                autoClose: 2000
            });
        })
}

export const getProductInCart = (cartId) => {
    return axios.get(`${api}/cart/${cartId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
}

export const getArrayProductInCart = async (cartId) => {
    const res = await axios.get(`${api}/cart/${cartId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
    return res.data.data
}

export const deleteProductFromCart = (cartId, productId) => {
    const data = {
        cartId: cartId,
        productId: productId,
        quantity: 0,
        shopId: shopId
    }
    axios.put(`${api}/cart/${cartId}/products/${productId}?quantity=0`,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(res => {
            console.log(`Xoa thanh cong`);
        }).catch(err => {
            console.log(err)
        });
}

export const updateProductInCart = (cartId, productId, quantity, shopId) => {
    const data = {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
        shopId: shopId
    }
    axios.put(`${api}/cart/${cartId}/products/${productId}?quantity=${quantity}&shopId=${data.shopId}`,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(res => {
            console.log(res, `update product`);
        }).catch(err => {
            console.log(err)
        });
}

export const searchProduct = (search) => {
    return axios.get(`${api}/user/find-product-info?keyword=${search}&sortBy=productName&pageNum=2&pageSize=12`
        ,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .catch(err => console.log(err));
}

export const placeOrder = (customerId) => {
    return axios.get(`http://localhost:8080/api/v1/customer/${customerId}/bill` ,
    {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    }).catch(err => console.log(err));
}

export const postCreateBill = (customerId, billId) => {
    const data = {
        "billId": billId,
        "customerId": customerId
    }
    axios.post(`${api}/customer/${customerId}/bill/${billId}`,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
}

export const getAllBills = () => {
    const res = axios.get(`${api}/bill`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).catch(err => console.log(err));
    return res
}

export const billOfCurrentCustomer = (customerId) => {
    return axios.get(`${api}/billbuy/customer/${customerId}`,
    {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    }).catch(err => console.log(err));
}

export const historyBillsOfCurrentCustomer = (customerId) => {
    return axios.get(`${api}/billhistory/customer/${customerId}`,
     {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    }).catch(err => console.log(err));
}

export const getStatisticShops = () => {
    const res = axios.get(`${api}/bill/statistic/shop`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
    return res
}

export const cancelProduct = (id) => {
    axios.put(`${api}/bill/cancel-order/${id}`,
        id,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
        .then(res => {
            // window.location.reload();
            console.log(`ok`);
        }).catch(err => {
            alert(err)
        });
}

export const getDataShopbyId = (id) => {
    return axios.get(`${api}/shop/${id}`)
}
export const getCategoryByIdShop = (id) => {
    return axios.get(`${api}/category/get-categories-by-shop/${id}`)
}
export const getProductsByIdShop = (id) => {
    return axios.get(`${api}/product/get-products-by-shop/${id}`)
}

export const getProductsByIdShopAndIdCategory = (iDShop, idCategogy) => {
    return axios.get(`${api}/product/get-products-by-category-shop/${iDShop}/category/${idCategogy}`)
}

