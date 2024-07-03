import app from './firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, NextOrObserver, User, signOut, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(app)

export function onAuthenticationStateChanged(cb: NextOrObserver<User>) {
    return onAuthStateChanged(auth, cb);
}

export async function logIn(email: string, password: string) {
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

export async function createUser(email: string, password: string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.error(error);
    }
}

