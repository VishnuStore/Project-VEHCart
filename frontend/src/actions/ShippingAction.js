// import { collection, setDoc } from "firebase/firestore";
// import { setShippingInfo, clearShippingInfo } from "../slices/shippingSlice";
// import { auth, vehDB } from "../firebaseConfig";
// export const setshippingInfo = (shipping)=>async(dispatch)=>{
//     const user = auth.currentUser
//     try {
//         const docRef = await setDoc(collection(vehDB, 'shippingInfo',user.id), shipping);
//         console.log('Shipping info added with ID: ', docRef.id);
//         dispatch(setShippingInfo(docRef))
//         return docRef.id;
//       } catch (error) {
//         console.error('Error adding shipping info: ', error);
//         throw error;
//       }
// }