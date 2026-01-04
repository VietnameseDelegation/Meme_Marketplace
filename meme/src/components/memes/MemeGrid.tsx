import React from 'react';
import MemeCard from './MemeCard';
import type { Meme } from '../../services/memeApi';
import styles from './MemeGrid.module.css';

interface Props {
    memes: Meme[];
    loading?: boolean;
}

const MemeGrid: React.FC<Props> = ({ memes, loading }) => {
    if (loading) {
        return (
            <div className={styles.grid}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={`${styles.skeleton} ${styles.pulse}`}></div>
                ))}
            </div>
        );
    }

    if (memes.length === 0) {
        return <div className={styles.empty}>No memes found matching your criteria.</div>;
    }

    return (
        <div className={styles.grid}>
            {memes.map(meme => (
                <MemeCard key={meme.id} meme={meme} />
            ))}
        </div>
    );
};

export default MemeGrid;
