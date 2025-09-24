import Service from '../utils/http';
import { Table } from '@mantine/core';
import { useState } from 'react';
const obj = new Service();

export default function MyURLs() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState([]);

    const getMyUrls = async(page, limit) => {
        let data = await obj.get(`user/my/urls?page=${page}&limit=${limit}`);
        setData(data.shortUrls);
        setTotal(data.totalPages);
        console.log(data);
    }

    useState(() => {
        getMyUrls(page, limit);
    }, []);

    return (    
        <>MyUrls
        </>
    )
}