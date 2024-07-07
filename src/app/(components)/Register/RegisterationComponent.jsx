"use client";
import React, {useState} from "react";
import styles from "@/app/(components)/Register/RegisterationComponent.module.css";
import { UserAuth } from "@/lib/firebase/authContext";
import { useRouter } from 'next/navigation'

const RegisterationComponent = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {createUser} = UserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createUser(email, password);
      console.log("created new user successfully")
      router.push('/home')
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="johndoe@example.com"
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="●●●●●●●●"
        />

        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          placeholder="●●●●●●●●"
        />

        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterationComponent;