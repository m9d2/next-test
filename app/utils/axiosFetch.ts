import axios, {AxiosRequestConfig} from 'axios';

interface RequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;  // 请求体数据
    params?: any; // URL 查询参数
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


const axiosFetch = async ({url, method, data, params}: RequestOptions) => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: baseURL + url,
            data,
            params,
            headers: {},
        };

        console.log(config)

        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
        }

        const response = await axios(config);
        return new Promise(resolve => resolve(response.data));
    } catch (error) {
        // 错误处理
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};

export default axiosFetch;
