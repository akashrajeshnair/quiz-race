import React from "react"
import styles from '@/app/(components)/LoginComponent.module.css'

const LoginComponent = () =>{
    return (
    <div className={styles.wrapper}>
        <form action="">
            <h1>Login</h1>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Username" required className={styles.inputArea}/>
            </div>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Password" required className={styles.inputArea}/>
            </div>
            <div className={styles.rememberForgot}>
                <label><input type="checkbox"/>Remember Me</label>
                <a href="#">Forgot password</a>
            </div>
            <button className={styles.btn} type="submit">Login</button>
            <div className="register-link">
                <p>Don't have an Account? <a href="#">Register</a></p>
            </div>
        </form>
        </div>
    )
}
export default LoginComponent