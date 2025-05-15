import useSWR from 'swr';
import {getFetcher} from "@/app/utils/fetcher";

const useFetch = <T>(key: string | any[], config: any, options?: any) => {
    options = {
        revalidateOnFocus: false,
        keepPreviousData: true,
        ...options,
    }
    const {data, error, isLoading, isValidating, mutate} = useSWR<T>(key, getFetcher, options);
    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
    };
};

export default useFetch;
