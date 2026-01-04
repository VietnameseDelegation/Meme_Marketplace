import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { getMemes, type MemesResponse } from '../services/memeApi';
import MemeGrid from '../components/memes/MemeGrid';
import MemeFilters, { type FilterState } from '../components/memes/MemeFilters';

const Memes: React.FC = () => {
    const [memes, setMemes] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [filters, setFilters] = useState<FilterState>({
        search: '',
        category: 'All',
        sortBy: 'name'
    });

    const observer = useRef<IntersectionObserver>();
    const lastMemeElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        setLoading(true);
        getMemes(page, 10)
            .then((data: MemesResponse) => {
                setMemes(prevMemes => {
                    const newMemes = data.memes.filter(newMeme => !prevMemes.some(existing => existing.id === newMeme.id));
                    return [...prevMemes, ...newMemes];
                });
                setHasMore(data.hasMore);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [page]);

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
            <h1 style={{ marginBottom: '2rem' }}>Explore Memes</h1>
            <MemeFilters onFilterChange={setFilters} />
            <MemeGrid memes={filteredMemes} loading={loading && page === 1} />
            {loading && page > 1 && <p style={{ textAlign: 'center', margin: '2rem' }}>Loading more memes...</p>}
            <div ref={lastMemeElementRef} style={{ height: '20px', marginBottom: '20px' }} />
        </div>
    );
};

export default Memes;
