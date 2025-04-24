import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { orderFail, orderRequest, orderSuccess } from "../slices/OrderSlice";
import { cartClear} from "../slices/cartSlice";
import { auth, vehDB } from "../firebaseConfig";
import { toast } from "react-toastify";

export const OrderPlaced = (OrderData) => async (dispatch) => {
    const user = auth.currentUser;
    try {
        dispatch(orderRequest());
        const docRef = await addDoc(collection(vehDB, "Orders"), {
            ...OrderData
          }); 
        
        const Orderinfo = await getDoc(docRef);
        if (Orderinfo.exists()) {
              console.log('Shipping Info:', Orderinfo.data());
              dispatch(orderSuccess(Orderinfo.data()));
            }
        toast.success("Order successfully Placed!....");
        // Clear the cart after placing an order
        const cartRef = doc(vehDB, "Cart", user.uid);
        await updateDoc(cartRef, {
            cartItem: [],
          });
        dispatch(cartClear());
        // dispatch(orderSuccess(toast.success("Order Is Placed")),Orderinfo);

    } catch (error) {
        dispatch(orderFail(toast.error("Order is Not Placed....")))
    }
}