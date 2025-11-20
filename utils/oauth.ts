import { auth } from "@/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

interface SignInWithGoogle {
    accessToken?: string,
}

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async ():Promise<SignInWithGoogle> => {
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = await result.user.getIdToken();
        console.log(accessToken)
        
        // const userEmail = credential?.

        // console.log(token)
        // The signed-in user info.
        return {accessToken}
        // ...
    } catch (error: unknown) {
        console.log(error)
        // Handle Errors here.
        const firebaseError = error as any;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        // The email of the user's account used.
        const email = firebaseError.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(firebaseError);
        // ...
        throw error; // Re-throw to maintain error handling
    }
}

export default provider;