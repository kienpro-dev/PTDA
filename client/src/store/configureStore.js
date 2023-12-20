import {configureStore, combineReducers} from '@reduxjs/toolkit'
import  counterSlice  from './countItemsOfCart'
import cartSlice from './cartSlice'



const reducer = combineReducers({
    counter: counterSlice,
    cart: cartSlice
})

const store = configureStore({
    reducer,
})

export default store