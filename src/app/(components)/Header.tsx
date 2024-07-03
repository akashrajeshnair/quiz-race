import  Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <nav className="nav">
                <ul>
                    <li>
                        <Link href="/" id="home-id">Home</Link>
                    </li>
                    <li>
                        <Link href="/quiz" id="quiz-id">Quiz</Link>
                    </li>
                    <li>
                        <Link href="/leaderboard" id="leaderboard-id">Leaderboard</Link>
                    </li>
                    <li>
                        <Link href="/login" id="login-id">Login</Link>
                    </li>
                </ul>
            </nav>
            <div className="logo">
                <h1>Quiz App</h1>
            </div>
        </header>
    );
};

export default Header;