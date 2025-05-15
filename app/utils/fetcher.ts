import axios, {AxiosRequestConfig} from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const fetcher = async (url: string,
                              method: string | 'GET' | 'POST' | 'PUT' | 'DELETE',
                              arg?: any,
                              ) => {
    url = baseURL + url;
    let requestConfig: AxiosRequestConfig = {
        url: url,
        method: method,
        timeout: 10000,
    };

    if (method === 'POST' || method === 'PUT') {
        requestConfig = {
            ...requestConfig,
            data: arg,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
    if (method === 'GET') {
        requestConfig = {
            ...requestConfig,
            params: arg,
        }
    }
    try {
        const res = await axios(url, requestConfig);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the data');
    }
};

const getFetcher = async ({url, arg}: { url: string, arg?: any }) => {
    return fetcher(url, 'GET', arg);
};

const postFetcher = async ({url, arg}: { url: string, arg?: any }, triggerArg?: any) => {
    return fetcher(url, 'POST', triggerArg ? triggerArg['arg'] : arg);
};

const putFetcher = async ({url}: { url: string }, triggerArg?: any) => {
    return fetcher(url, 'PUT', triggerArg['arg']);
};

const deleteFetcher = async ({url}: { url: string }) => {
    return fetcher(url, 'DELETE');
};

export {
    getFetcher,
    postFetcher,
    putFetcher,
    deleteFetcher
}
