"use client"
import  Link from 'next/link';
import styles from '@/app/(components)/Header/Header.module.css'
import { UserAuth } from '@/lib/firebase/authContext';

const Header: React.FC = () => {

    const {user} = UserAuth();

    return (
        <div className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/quiz" id="quiz-id">Quiz</Link>
                    </li>
                    <li>
                        <Link href="/leaderboard" id="leaderboard-id">Leaderboard</Link>
                    </li>
                    <li>
                        <Link href="/createquiz" id="leaderboard-id">Create Quiz</Link>
                    </li>
                    <li>
                        {user ? (
                            <Link href="/logout" id="logout-id">Logout</Link>
                        ) : (
                            <Link href="/login" id="login-id">Login</Link>
                        )}
                    </li>
                </ul>
            </nav>
            <div className="logo">
                <h1>Quiz Race</h1>
            </div>
        </div>
    );
};

export default Header;