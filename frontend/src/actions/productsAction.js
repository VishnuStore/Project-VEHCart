
import { productsFail,productsSuccess,productsRequest } from '../slices/productsSlice';
import { collection, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore';
import { vehDB } from '../firebaseConfig';
export const  getproduct = keyword => async(dispatch)=>{
    try {
        dispatch(productsRequest());
        const searchQuery = query(
            collection(vehDB, "veh-products"),
        );
        console.log(keyword)
        console.log("Search Query:", searchQuery);
    
        const querySnapshot = await getDocs(searchQuery);
        const productdata = [];
    
        querySnapshot.forEach((doc) => {
            const product = {
                id: doc.id,
                ...doc.data(),
            };
            productdata.push(product);
        });
    
        console.log("Search Results:", productdata);
        dispatch(productsSuccess(productdata));
    }
    catch(error){
        dispatch(productsFail(error.response.data.message));
    }
}