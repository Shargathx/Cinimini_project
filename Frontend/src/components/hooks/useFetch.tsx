import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, dependencies: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);

    const depsString = JSON.stringify(dependencies);

    useEffect(() => {
        let isMounted = true;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((json) => {
                if (isMounted) {
                    setData(json);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
            setLoading(true);
            setData(null);
            setError(null);
        };

    }, [url, depsString]);

    return { data, loading, error };
}