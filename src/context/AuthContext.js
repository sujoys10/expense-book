import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../firebase/firebase';

export const AuthContext = React.createContext();

const AuthState = ({ children }) => {
    const [ user, setUser ] = useState({});
    const [ isNewUser, setNewUser ] = useState(false);
    const [ isLoggedIn, setLoggedIn ] = useState(false);
    const [ error, setError ] = useState('');
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                localStorage.setItem('user', user.uid);
                setUser({ uid: user.uid, email: user.email })
            }else{
                localStorage.removeItem('user');
                setUser({});
            }
        })
    },[])

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem('user'))
    }, [user.uid])

    const logOut = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
            setLoggedIn(false);
          }).catch(function(error) {
            // An error happened.
          });
    }

    const signUp = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => setNewUser(true))
        .catch(error => {
            console.log(error)
        })
    }

    const logIn = (email, password) => {
        setError('');
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            setError(error.code);
            console.log(error)
        })
    }

    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider).then(function(result) {
            if(result.additionalUserInfo.isNewUser){
                setNewUser(true);
            }
            // ...
          }).catch(function(error) {
                console.log(error);
          });        
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isNewUser,
                isLoggedIn,
                error,
                setNewUser,
                signUp,
                logIn,
                logOut,
                googleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;