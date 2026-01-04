import React, { useEffect, useState } from 'react';
import styles from './MemeFilters.module.css';

interface Props {
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    search: string;
    category: string;
    sortBy: 'popularity' | 'name' | 'rating' | 'size';
}

const MemeFilters: React.FC<Props> = ({ onFilterChange }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'rating' | 'size'>('popularity');

    // Debouncing search
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ search, category, sortBy });
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category, sortBy, onFilterChange]);

    const categories = ["All", "animals", "celebrities", "gaming", "school", "random"];

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search memes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.input}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
            </select>

            <div className={styles.sortGroup}>
                <label>Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={styles.select}
                >
                    <option value="popularity">Popularity (Default)</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Rating (Highest)</option>
                    <option value="size">Size (Smallest)</option>
                </select>
            </div>
        </div>
    );
};

export default MemeFilters;
