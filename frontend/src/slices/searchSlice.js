import  {createSlice }  from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name:'Search',
    initialState:{
        loading: false
    },
    reducers:{
         searchRequest(state,actions){
            return {
                loading:true
            } 
        },
         searchSuccess(state,actions){
            return{
                loading:false,
                products:actions.payload
            }
        },
        searchFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        pricefilterRequest(state,actions){
            return {
                loading:true
            } 
        },
        pricefilterSuccess(state,actions){
            return{
                loading:false,
                products:actions.payload
            }
        },
        pricefilterFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        CategoryRequest(state,actions){
            return {
                loading:true
            } 
        },
        CategorySuccess(state,actions){
            return{
                loading:false,
                products:actions.payload
            }
        },
        CategoryFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        ratingRequest(state,actions){
            return {
                loading:true
            } 
        },
        ratingSuccess(state,actions){
            return{
                loading:false,
                products:actions.payload
            }
        },
        ratingFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }
})
const {actions,reducer} = SearchSlice;
export const {searchRequest,searchSuccess,searchFail,
    pricefilterRequest,pricefilterSuccess,pricefilterFail,
    CategoryRequest,CategorySuccess,CategoryFail,ratingRequest,ratingSuccess,ratingFail
} =actions;
export default reducer;