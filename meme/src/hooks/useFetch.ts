import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetch<T>(fetcher: () => Promise<T>, dependencies: any[] = []) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;
        setState(prev => ({ ...prev, loading: true }));

        fetcher()
            .then(data => {
                if (isMounted) setState({ data, loading: false, error: null });
            })
            .catch(error => {
                if (isMounted) setState({ data: null, loading: false, error });
            });

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return state;
}

export default useFetch;
