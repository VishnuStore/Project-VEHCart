import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import searchReducer from "./slices/searchSlice";
import authanticate from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/OrderSlice"
const persistConfig={
    key:"root",
    storage
};
const reducer = combineReducers({
    productsState:productsReducer,
    productState:productReducer,
    searchState:searchReducer,
    authState:authanticate,
    cartState:cartReducer,
    orderState:orderReducer
});
const persistState = persistReducer(persistConfig,reducer)
const store = configureStore({
    reducer:{
        persistState,
    },
    getDefaultMiddleware  :(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
});
export const persistor = persistStore(store);
export default store;