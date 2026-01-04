import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useCart from '../../hooks/useCart';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path ? styles.activeLink : '';

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>MemeMarket Pro</Link>

                {user?.loggedIn && (
                    <nav className={styles.nav}>
                        <Link to="/dashboard" className={`${styles.navLink} ${isActive('/dashboard')}`}>Dashboard</Link>
                        <Link to="/memes" className={`${styles.navLink} ${isActive('/memes')}`}>Memes</Link>
                        <Link to="/cart" className={`${styles.navLink} ${isActive('/cart')}`}>
                            Cart
                            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                        </Link>
                        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                    </nav>
                )}
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2026 Meme Marketplace Pro. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
