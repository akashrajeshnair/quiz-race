"use client"

import styles from '@/app/home.module.css'

export default function Root() {


  return(
      <div className={[styles.appHeader, styles.appWrapper, styles.appBg].join("")} id='home'>
        <div className={styles.appWrapperInfo}>
          <h1 className={[styles.appHeader, styles.headtext__cormorant].join("")}>Welcome to the Ultimate Quiz Challenge!</h1>
          <p className={styles.p__opensans}>Test your knowledge across various topics and compete with others. Get ready to embark on a journey of fun and learning!</p>
        </div>
        <div className={styles.appWrapperImg}>
          <p>HELLO</p>
        </div>
      </div>
    );
}

