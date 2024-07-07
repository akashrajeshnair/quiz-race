import app from './firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, NextOrObserver, User, signOut, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(app)

export {auth}

export function checkAuthState(cb) {
    return onAuthStateChanged(auth, cb);
}

export async function logIn(email, password) {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error);
    }
}

export async function logOut() {
    try{
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.error(error);
    }
}

