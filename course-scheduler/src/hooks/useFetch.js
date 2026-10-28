import { useState, useEffect } from 'react'

function useFetch(endpoint) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            setIsPending(true);
            setError(null);

            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;

                const resp = await fetch(
                    `${baseUrl}${endpoint}`,
                    { signal: controller.signal }
                );

                if (!resp.ok) {
                    throw new Error(`HTTP error: ${resp.status}`);
                }

                const result = await resp.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsPending(false);
                }
            }
        }

        fetchData();

        return () => controller.abort();
    }, [endpoint]);

    return { data, isPending, error };
}

export default useFetch;