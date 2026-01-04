import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        if (password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }

        login(username);
        navigate('/dashboard');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Welcome Back</h2>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.field}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        placeholder="Min. 3 chars"
                    />
                </div>

                <div className={styles.field}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Min. 5 chars"
                    />
                </div>

                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;
