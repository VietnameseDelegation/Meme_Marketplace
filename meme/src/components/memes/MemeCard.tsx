import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Meme } from '../../services/memeApi';
import useCart from '../../hooks/useCart';
import styles from './MemeCard.module.css';

interface Props {
    meme: Meme;
}

const MemeCard: React.FC<Props> = ({ meme }) => {
    const navigate = useNavigate();
    const { addItem } = useCart();

    const handleDetails = () => {
        navigate(`/memes/${meme.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(meme);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={meme.url} alt={meme.name} className={styles.image} loading="lazy" />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title} title={meme.name}>{meme.name}</h3>
                <div className={styles.meta}>
                    <span className={styles.category}>
                        {meme.category ? meme.category.charAt(0).toUpperCase() + meme.category.slice(1) : ''}
                    </span>
                    <span className={styles.rating}>★ {meme.rating}</span>
                </div>
                <div className={styles.price}>${meme.price}</div>

                <div className={styles.actions}>
                    <button onClick={handleDetails} className={styles.detailBtn}>Details</button>
                    <button onClick={handleAddToCart} className={styles.cartBtn}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MemeCard;
