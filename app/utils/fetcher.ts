import axios, {AxiosRequestConfig} from 'axios';

export const fetcher = async (url: string, config?: AxiosRequestConfig) => {
    const requestConfig = {
        ...config,
        timeout: 10000,
    };

    if(!url) {
        return null;
    }

    try {
        const res = await axios(url, requestConfig);

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the data');
    }
};
