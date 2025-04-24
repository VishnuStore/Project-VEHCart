import { collection, getDocs } from 'firebase/firestore';
import { searchFail, searchSuccess, searchRequest,pricefilterSuccess,
    pricefilterRequest,pricefilterFail,CategoryRequest,CategorySuccess,CategoryFail,ratingFail,ratingRequest,ratingSuccess} from '../slices/searchSlice';
import { vehDB } from '../firebaseConfig';
export const search = (keyword) => async (dispatch) => {
    try {
        dispatch(searchRequest());
        const searchterm = keyword.trim();
        const querySnapshot = await getDocs(collection(vehDB, "veh-products"));
        let productdata = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const product = {
                id: doc.id,
                ...doc.data()
            }
            productdata.push(product)

        });
            productdata = productdata.filter(item =>
                item.name.toLowerCase().includes(searchterm.toLowerCase())
            )
        dispatch(searchSuccess(productdata))
    }
    catch (error) {
        dispatch(searchFail(error));
    }
}
export const price = (minPrice,maxPrice)=>async(dispatch)=>{
    try {
        dispatch(pricefilterRequest())
        const querySnapshot = await getDocs(collection(vehDB, "veh-products"));
        let productdata = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const product = {
                id: doc.id,
                ...doc.data()
            }
            productdata.push(product)
            console.log(productdata)
        });
        productdata = productdata.filter(item =>
            item.price >= minPrice && item.price <= maxPrice
        )
        dispatch(pricefilterSuccess(productdata))
        console.log(productdata)
        }
    catch (error) {
        dispatch(pricefilterFail(error.message));
    }
}
export const category =(selectedValue)=> async(dispatch)=>{
    try{
        dispatch(CategoryRequest())
        const querySnapshot = await getDocs(collection(vehDB, "veh-products"));
        let productdata = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const product = {
                id: doc.id,
                ...doc.data()
            };
            productdata.push(product)
              }
            );
            productdata = productdata.filter(item => 
              item.category === selectedValue
            );
              dispatch(CategorySuccess(productdata));
    }catch(error){
        dispatch(CategoryFail(error.message));
    }
}
export const ratingfilter = (rating)=>async(dispatch)=>{
    try{
        dispatch(ratingRequest())
        const querySnapshot = await getDocs(collection(vehDB, "veh-products"));
        let productdata = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const product = {
                id: doc.id,
                ...doc.data()
            };
            productdata.push(product)
              }
            );
            productdata = productdata.filter(item => 
              item.ratings === rating
            );
              dispatch(ratingSuccess(productdata));
    }catch(error){
        dispatch(ratingFail(error.message));
    }
}