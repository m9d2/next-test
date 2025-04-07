'use client'
import useSWR from "swr";
import {useState} from "react";

const fetcher = async (url: string, params?: any) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
}

export default function Page() {
    const [params, setParams] = useState({page: 0, size: 5})
    const {
        data,
        isLoading,
        isValidating,
        mutate
    } = useSWR(['http://127.0.0.1:8888/api/user/page', params], ([url, params]) => fetcher(url, params), { revalidateOnFocus: false })
    if (isLoading || isValidating) return <div>Loading...</div>
    return (
        <>

            <ul>
                {data?.data.content.map((item: any) => <li key={item.id}>{item.name}</li>)}
            </ul>
            <button onClick={() => mutate()}>刷新</button>
            <button onClick={() => setParams({...params, page: params.page + 1})}>下一页</button>
            <button onClick={() => setParams({...params, page: params.page - 1})}>上一页</button>
        </>
    )
}
