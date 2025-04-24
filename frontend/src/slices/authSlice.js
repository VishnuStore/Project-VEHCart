import  {createSlice }  from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading: false,    
    },
    reducers:{
        signRequest(state,action){
            return {
                loading:true
            } 
        },
        signSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        },
        signFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        loginRequest(state,action){
            return {
                loading:true
            } 
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loginFail(state,action){
            return{
                loading:false,
            }
        },
        logoutRequest(state,action){
            return {
                loading:true
            } 
        },
        logoutSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false,
            }
        },
        logoutFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        passwordupdateRequest(state,action){
            return {
                loading:true,
                isupdata:false
            } 
        },
        passwordupdatesuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false,
                isupdata:true,
                user:action.payload.user
            }
        },
        passwordupdateFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        forgetpasswordRequest(state,action){
            return {
                loading:true,
                isupdata:false
            } 
        },
        forgetpasswordsuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false,
                user:action.payload.user
            }
        },
        forgetpasswordFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }
})
const {actions,reducer} = authSlice;
export const {signRequest,signSuccess,signFail,
    loginSuccess,loginRequest,loginFail,logoutRequest,
    logoutSuccess,logoutFail,passwordupdateFail,passwordupdatesuccess,passwordupdateRequest,
    forgetpasswordRequest,forgetpasswordsuccess,forgetpasswordFail
} =actions;
export default reducer;