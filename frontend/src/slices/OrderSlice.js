import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'OrderPlaced',
    initialState: {
        loading:false
    },
    reducers: {
        orderRequest(state, action) {
            return {
                loading: true
            }
        },
        orderSuccess(state, action) {
            return {
                loading: false,
                OrderInfo: action.payload
            }
        },
        orderFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})
const { actions, reducer } = orderSlice;
export const {orderRequest,orderSuccess,orderFail} = actions;
export default reducer;