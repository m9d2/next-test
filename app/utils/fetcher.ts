import axios, {AxiosRequestConfig} from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const fetcher = async (url: string,
                              method: string | 'GET' | 'POST' | 'PUT' | 'DELETE',
                              { arg }: { arg: string }) => {
    console.log('fetcher', url, arg);
    url = baseURL + url;
    let requestConfig: AxiosRequestConfig = {
        url: url,
        timeout: 10000,
        params: {
            arg: arg,
        },
    };

    if (1) {
        requestConfig = {
            ...requestConfig,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }

    try {
        const res = await axios(url, requestConfig);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the data');
    }
};

const getFetcher = async (url: string,
                    { arg }: { arg: string }) => {
    console.log('getFetcher', url, arg);
    return fetcher(url, 'GET',  {arg});
};

const postFetcher = async (url: string,
                     { arg }: { arg: string }) => {
    console.log('postFetcher', url, arg);
    return fetcher(url, 'POST', {arg});
};

export {
    getFetcher,
    postFetcher
}
