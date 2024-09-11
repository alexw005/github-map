//axios hook

import { useState, useEffect } from 'react';

import axios from 'axios';

export const useAxios = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [url]);

    return { data, loading, error, fetchData };
};

export default useAxios;