import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            const newData = response.data;

            // Only update state if newData is different
            if (JSON.stringify(newData) !== JSON.stringify(data)) {
                setData(newData);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetch = () => {
        setLoading(true); // Set loading true when refetching
        fetchData();
    };

    return { data, loading, error, refetch };
};

export default useAxios;
