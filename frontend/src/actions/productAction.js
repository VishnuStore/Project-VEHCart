import { productFail, productSuccess, productRequest, createReviewSuccess, createReviewRequest, createReviewFail } from '../slices/productSlice';
import {  addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, vehDB } from '../firebaseConfig';
import { toast } from 'react-toastify';
export const singleproduct = id => async (dispatch) => {
  
    try {
        dispatch(productRequest());
        const docRef = doc(vehDB, "veh-products",id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const productData = docSnap.data();
            console.log("Fetched Product:", productData);
            dispatch(productSuccess(productData));
        }
    }
    catch (error) {
        dispatch(productFail(error.response.data.message));
    }
}
export const createReview = formData => async(dispatch)=>{
    try {
        dispatch(createReviewRequest());
        await addDoc(collection(vehDB, "reviews"), {
             ...formData,
             createdAt: serverTimestamp(),
        });
        dispatch(createReviewSuccess(toast.success("Reviews Sumbit Successfully!")))
      } catch (error) {
        dispatch(createReviewFail(error));
      }
}