// useFetchData.jsx
import { useEffect, useState } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const doctor = localStorage.getItem("doctor")
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                
                //const appointments = localStorage.getItem("appointments");
                //console.log('ID:', user?._id)
              // console.log(user.appointments)

                if (!token) {
                    throw new Error('No token, authorization denied');
                }

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message || 'Une erreur est survenue');
                }
                console.log(result)
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
