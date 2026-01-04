import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMemes } from '../services/memeApi';
import useCart from '../hooks/useCart';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const { data: memes, loading, error } = useFetch(getMemes);
    const { items, totalPrice } = useCart();

    const stats = useMemo(() => {
        if (!memes) return null;
        return {
            totalMemes: memes.length,
            categories: new Set(memes.map(m => m.category)).size,
            topRated: [...memes].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0],
        };
    }, [memes]);

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div>Failed to load data</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meme Admin Panel</h1>

            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.blue}`}>
                    <h3>Total Memes</h3>
                    <p className={styles.number}>{stats?.totalMemes}</p>
                </div>



                <div className={`${styles.card} ${styles.purple}`}>
                    <h3>Cart Items</h3>
                    <p className={styles.number}>{items.length}</p>
                    <small>Value: ${totalPrice}</small>
                </div>

                {stats?.topRated && (
                    <div className={`${styles.card} ${styles.orange}`}>
                        <h3>Top Rated</h3>
                        <div className={styles.miniMeme}>
                            <img src={stats.topRated.url} alt="Top" width="50" />
                            <div>
                                <p>{stats.topRated.name}</p>
                                <small>⭐ {stats.topRated.rating}</small>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                <Link to="/memes" className={styles.button}>Browse Memes</Link>
            </div>
        </div>
    );
};

export default Dashboard;
