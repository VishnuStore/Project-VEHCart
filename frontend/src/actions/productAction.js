import { productFail, productSuccess, productRequest } from '../slices/productSlice';
import {  doc, getDoc } from 'firebase/firestore';
import { vehDB } from '../firebaseConfig';
export const singleproduct = id => async (dispatch) => {
    try {
        dispatch(productRequest());
        const docRef = doc(vehDB, "veh-products",id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const productData = docSnap.data();
            console.log("Fetched Product:", productData);
            dispatch(productSuccess(productData))
            console.log(productData.images[0])
        }
    }
    catch (error) {
        dispatch(productFail(error.response.data.message));
    }
}