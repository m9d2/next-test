import useSWR from 'swr';
import {fetcher} from "@/app/utils/fetcher";
import {AxiosRequestConfig} from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

type FetchConfig = {
    url: string;
    method?: string | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | undefined;
    params?: any;
}

const useFetch = <T>(key: string | any[], config: FetchConfig, options?: any) => {
    const axiosConfig: AxiosRequestConfig = {
        baseURL,
        ...config,
        method: config?.method || 'GET',
        params: config?.method === 'GET' ? config?.params : undefined,
        data: config?.method !== 'GET' ? config?.params : undefined,
    }
    options = {
        revalidateOnFocus: false,
        keepPreviousData: true,
        ...options,
    }
    const {data, error, isLoading, isValidating, mutate} = useSWR<T>(key, () => fetcher(config?.url, axiosConfig), options);
    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
    };
};

export default useFetch;
