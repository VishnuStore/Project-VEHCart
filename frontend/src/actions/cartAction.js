import { doc, documentId, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { auth, vehDB } from "../firebaseConfig";
import { cartSuccess,cartFail,cartRequest ,removeCartitem, setShippingInfo} from "../slices/cartSlice";
import { toast } from "react-toastify";
export const AddtoCart = (quantity,product)=>async(dispatch)=>{ 
      try {
        const user = auth.currentUser;
      if(!user){
        toast.error("Please Login or SignUp and Add the Cart");
      }    
        dispatch(cartRequest())
          const cartRef = doc(vehDB, "Cart",user.uid);
          const cartSnapshot = await getDoc(cartRef);
          let updatedCart = [];
          //check if cart exists
          if(cartSnapshot.exists()){
            updatedCart = cartSnapshot.data().cartItem || [];
            //check id product already exists in cart
            const existingitem = updatedCart.findIndex((item)=>item.name === product.name);
            if(existingitem !== -1){
              updatedCart[existingitem].quantity += quantity;
            }else{
              updatedCart.push({...product,quantity:quantity});
            }
            await updateDoc(cartRef, {cartItem: updatedCart});
          }else{
            //if cart doesn't exist,create a new one
           await setDoc(cartRef,{cartItem:[{...product,quantity:quantity}]});
            updatedCart=[{...product,quantity:quantity}];
          }
         console.log(updatedCart)
          dispatch(cartSuccess(updatedCart,toast.success("Item Added From Cart")));
        
      } catch (error) {
        dispatch(cartFail(error.meassage));
      }
};
export const removecart = (items) =>async(dispatch)=>{
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("Please login to remove items from your cart.");
      return;
    }

    const cartRef = doc(vehDB, "Cart", user.uid);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      let currentCart = cartSnapshot.data().cartItem;
      
      // Filter out the item to remove it
      currentCart = currentCart.filter((item) => item.name !== items.name);

      await updateDoc(cartRef, {cartItem: currentCart});
      dispatch(removeCartitem(currentCart,toast.success("Item removed from cart.")));
    } else {
      console.log("Cart not found");
    }
  } catch (error) {
     toast.error(error.message);
  }
}

export const ShippingInfo=(shipping)=>async(dispatch)=>{
  const user = auth.currentUser;

  if (!user) {
    alert('User not logged in');
    return;
  }

  try {
    // Reference to shippingInfo document
    const shippingDocRef = doc(vehDB, 'Cart', user.uid, 'ShippingInfo',"UserInfo");

    // Save shipping info using setDoc
    await setDoc(shippingDocRef, shipping);
    const docSnap = await getDoc(shippingDocRef);

    if (docSnap.exists()) {
      console.log('Shipping Info:', docSnap.data());
      dispatch(setShippingInfo(docSnap.data()))
    }
    console.log('Shipping info added successfully');
  } catch (error) {
    console.error('Error adding shipping info:', error);
  }
}

