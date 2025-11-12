import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { auth } from '../firebase.config';
import { AuthContext } from './Authentication';

// FIREBASE AUTH PROVIDER
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // REGISTER
    const createUserWithEmailAndPasswordFunc = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmailFunc = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // LOGIN
    const signInWithEmailAndPasswordFunc = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmailFunction = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signOutFunc = () => {
        setLoading(true)
        return signOut(auth)
    }

    // AUTH INFORMATION
    const authInfo = {
        user,
        setUser,
        createUserWithEmailAndPasswordFunc,
        signInWithEmailAndPasswordFunc,
        signInWithEmailFunc,
        signInWithEmailFunction,
        signOutFunc,
        loading,
        setLoading
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe
        };
    }, []);

    

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;