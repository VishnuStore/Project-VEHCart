import  {createSlice }  from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'Product',
    initialState:{
        loading: false,
        product:{},
        isReviewSubmitted:false
    },
    reducers:{
        productRequest(state,action){
            return {
                ...state,
                loading:true
            } 
        },
        productSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload
            }
        },
        productFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
        ,
        createReviewRequest(state,action){
            return{
                ...state,
                loading:true
            }
        }
        ,
        createReviewSuccess(state,action){
            return{
                ...state,
                loading:false,
                isReviewSubmitted:true
            }
        }
        ,createReviewFail(state,action){
            return{
                ...state,
                error:action.payload
            }
        },
        clearerror(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
})
const {actions,reducer} = productSlice;
export const {productRequest,productSuccess,productFail,createReviewRequest,createReviewSuccess,createReviewFail} =actions;
export default reducer;