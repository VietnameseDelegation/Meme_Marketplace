import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMemes } from '../services/memeApi';
import useCart from '../hooks/useCart';
import MemeCard from '../components/memes/MemeCard';
import styles from './MemeDetail.module.css';

const MemeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: response, loading } = useFetch(() => getMemes(1, 100));
    const memes = response?.memes;
    const { addItem } = useCart();

    const meme = useMemo(() => memes?.find(m => m.id === id), [memes, id]);

    const relatedMemes = useMemo(() => {
        if (!memes || !meme) return [];
        return memes
            .filter(m => m.category === meme.category && m.id !== meme.id)
            .slice(0, 3);
    }, [memes, meme]);

    if (loading) return <div className={styles.loading}>Loading...</div>;

    if (!meme) {
        return (
            <div className={styles.container}>
                <h2>Meme not found</h2>
                <button onClick={() => navigate('/memes')}>Back to Memes</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/memes')} className={styles.backBtn}>← Back to list</button>

            <div className={styles.detailLayout}>
                <div className={styles.imageContainer}>
                    <img src={meme.url} alt={meme.name} className={styles.image} />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{meme.name}</h1>

                    <div className={styles.metaGrid}>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Category</span>
                            <span>{meme.category ? meme.category.charAt(0).toUpperCase() + meme.category.slice(1) : ''}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Rating</span>
                            <span className={styles.rating}>★ {meme.rating}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Dimensions</span>
                            <span>{meme.width} x {meme.height}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Price</span>
                            <span className={styles.price}>${meme.price}</span>
                        </div>
                    </div>

                    <button onClick={() => addItem(meme)} className={styles.addToCartBtn}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className={styles.related}>
                <h3>Related Memes</h3>
                <div className={styles.relatedGrid}>
                    {relatedMemes.map(m => (
                        <MemeCard key={m.id} meme={m} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemeDetail;
