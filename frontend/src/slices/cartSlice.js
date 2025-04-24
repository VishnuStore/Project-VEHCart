import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'AddtoCart',
    initialState: {
        loading: { CartItems: [] }
    },
    reducers: {
        cartRequest(state, action) {
            return {
                loading: true
            }
        },
        cartSuccess(state, action) {
            return {
                loading: false,
                cartItems: action.payload
            }
        },
        cartClear(state,action){
            state.cartItems = [];
        },
        cartFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        removeCartitem(state, action) {
            return {
                cartItems: action.payload
            }
        },
        setshippingrequest(){
            return {
                loading: true
            }
        },
        setShippingInfo (state, action) {
             state.shippinginfo=action.payload
          },
          clearShippingInfo: (state) => {
            state.shippinginfo = {};
          },
    }
})
const { actions, reducer } = cartSlice;
export const {setshippingrequest,cartClear,clearShippingInfo, cartRequest ,setShippingInfo, cartSuccess, cartFail, removeCartitem, cartProductRequest, cartProductSuccess } = actions;
export default reducer;