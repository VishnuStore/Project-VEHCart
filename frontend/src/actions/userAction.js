import { doc, setDoc } from "firebase/firestore";
import { auth, vehDB } from "../firebaseConfig";
import {
    loginFail, loginRequest, loginSuccess,
    signFail, signRequest, signSuccess, logoutRequest,
    logoutSuccess, logoutFail, passwordupdateFail,
    passwordupdatesuccess, passwordupdateRequest,
    forgetpasswordFail,
    forgetpasswordsuccess,
    forgetpasswordRequest
} from "../slices/authSlice";
import { clearShippingInfo,cartClear } from "../slices/cartSlice";
import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

export const signup = (fname, lname, email, password) => async (dispatch) => {
    try {
        dispatch(signRequest());
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        await updateProfile(user, { displayName: fname });
        console.log(user.displayName)
        if (user) {
            await setDoc(doc(vehDB, "Users", user.uid), {
                "FirstName": fname,
                "LastName": lname,
                "Email": user.email
            })
        }
        if(user){
            toast.success("NewUser is SignUp Successfully");
        }
        dispatch(signSuccess(user));

    } catch (error) {
       dispatch(signFail(error.message));
    }
}
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const  userCredential=  await signInWithEmailAndPassword(auth, email, password);
        if(userCredential){
             toast.success('User Logged In Successfully!');
        }
        dispatch(loginSuccess(userCredential));
          
    } catch (error) {
        if(error){
            toast.error('Please Enter The Valid Email & Password')
        }
       dispatch(loginFail());
       
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
         await signOut(auth);
        dispatch(logoutSuccess( toast.success('User Logged Out Successfully!')));
        dispatch(clearShippingInfo());
        dispatch(cartClear());

    } catch (error) {
    dispatch(logoutFail(error.message));
    }
}
export const changepass = (password,newpassword) => async (dispatch) => {
    try {
        dispatch(passwordupdateRequest());
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
         await reauthenticateWithCredential(user, credential);
         await updatePassword(user, newpassword);
        dispatch(passwordupdatesuccess( toast.success("password Successfully changed")));
        window.location.href = "/Login";
    } catch (error) {
    dispatch(passwordupdateFail());
    }
}
export const forgetpassword = (email)=>async(dispatch)=>{
    try {
         dispatch(forgetpasswordRequest());
         await sendPasswordResetEmail(auth, email);
        dispatch(forgetpasswordsuccess( toast.success(`Password reset ${email} sent. Check your inbox`)));  
      } catch (error) {
         dispatch(forgetpasswordFail(error.message));
      }
}



