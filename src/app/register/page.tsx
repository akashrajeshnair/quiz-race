import React from "react";
import RegisterationComponent from "../(components)/RegisterationComponent";
import styles from '@/app/register/registeration_page.module.css';

const register = () => {
    return (
        <div className={styles.registerationHolder}>
            <RegisterationComponent></RegisterationComponent>
        </div>
        
    )
}

export default register;