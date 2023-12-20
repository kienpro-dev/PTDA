import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteProductFromCart, getArrayProductInCart, getProductInCart } from "./apiRequest";

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        const response = await getProductInCart(localStorage.getItem("cartId"));
        const data = response.data.data;
        return data;
    }
);

// export const removeFromCart = createAsyncThunk(
//     'cart/removeFromCart',
//     async (productId, { dispatch }) => {
//         console.log("productId redux remove: ", productId);
//         const response = await deleteProductFromCart(localStorage.getItem("cartId"), productId);
//         // Sau khi xóa thành công, dispatch action để cập nhật lại trạng thái trong Redux store
//         dispatch(removeFromCartSuccess(productId));
//         //   return response.data;
//     }
// );

// // Action creator để cập nhật trạng thái sau khi xóa thành công
// export const removeFromCartSuccess = (productId) => ({
//     type: 'cart/removeFromCartSuccess',
//     payload: productId,
// });

const initialState = {
    cartId: localStorage.getItem("cartId"),
    cartItems: [],
    cartTotalQuanTity: 0,
    cartTotalAmount: 0,
    // cartId: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartId1(state, action) {
            state.cartId = action.payload;
        },
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.productId === action.payload.productId
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1;
            } else {
                const tempProduct = { ...action.payload, quantity: 1 }
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action) {
            console.log("decrease slice");
            const itemIndex = state.cartItems.findIndex(
                (item) => item.productId == action.payload.productId
            )
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1
                toast.success("Decrease product quantity success", {
                    position: "top-right"
                });
            } else if (state.cartItems[itemIndex].quantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.productId !== action.payload.productId
                )
                state.cartItems = nextCartItems;
                toast.success("Product is removed from cart", {
                    position: "top-right"
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseProductCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (item) => item.productId !== action.payload.productId
            )
            state.cartItems = nextCartItems;
            toast.success("Product is removed from cart", {
                position: "top-right"
            })

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (item) => item.productId !== action.payload.productId
            )
            state.cartItems = nextCartItems;
            toast.success("Product is removed from cart hahaha", {
                position: "top-right"
            })

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity, productPrice } = cartItem;
                    const itemTotal = price ? price * quantity : productPrice * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += 1;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            // state.cartId = localStorage.getItem("cartId");
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.cartTotalQuanTity = action.payload.length
                // })
                // .addCase(fetchCartItems.rejected, (state, action) => {
                //     // Xử lý khi bị reject
                //     window.location.reload();
            });
    },
})

export const { setCartId1, removeFromCart, decreaseProductCart, addToCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer