import React, { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getMemes } from '../services/memeApi';
import MemeGrid from '../components/memes/MemeGrid';
import MemeFilters, { type FilterState } from '../components/memes/MemeFilters';

const Memes: React.FC = () => {
    const { data: memes, loading, error } = useFetch(getMemes);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        category: 'All',
        sortBy: 'name'
    });

    const filteredMemes = useMemo(() => {
        if (!memes) return [];

        return memes
            .filter(meme => {
                // Search Filter
                if (filters.search && !meme.name.toLowerCase().includes(filters.search.toLowerCase())) {
                    return false;
                }
                // Category Filter
                if (filters.category !== 'All' && meme.category !== filters.category) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                // Sort
                switch (filters.sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'rating':
                        return (b.rating || 0) - (a.rating || 0);
                    case 'size':
                        return (a.width * a.height) - (b.width * b.height);
                    default:
                        return 0;
                }
            });
    }, [memes, filters]);

    if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Nepodařilo se načíst memy 😢</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Explore Memes</h1>
            <MemeFilters onFilterChange={setFilters} />
            <MemeGrid memes={filteredMemes} loading={loading} />
        </div>
    );
};

export default Memes;
