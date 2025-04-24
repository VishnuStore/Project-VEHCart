import { productsFail,productsSuccess,productsRequest } from '../slices/productsSlice';
import { collection, getDocs,  } from 'firebase/firestore';
import { vehDB } from '../firebaseConfig';
export const  getproduct = async(dispatch)=>{
    try{
        dispatch(productsRequest());
            const querySnapshot = await getDocs(collection(vehDB, "veh-products"));
            const productdata = []
                    querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const product = {
                        id:doc.id,
                        ...doc.data()
                    }
                    productdata.push(product)
                    
                    });
                    console.log(productdata);
                dispatch(productsSuccess(productdata));
                console.log(querySnapshot)
    }
    catch(error){
        dispatch(productsFail(error.response.data.message));
    }
}