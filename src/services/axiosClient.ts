import axios from 'axios';
import createAuthRefreshInterceptor, {
    AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import AppConstants from '../enums/collaborator/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_API } from '../../env';
const axiosClient = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    // validateStatus: (status) => {
    //     return status < 500;
    // }
});

axiosClient.interceptors.request.use(async (config: any) => {
    const customHeaders: Record<string, unknown> = {};
    const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
    console.log("<AxiosClient> ACCESSTOKEN: ", accessToken) 
    if (accessToken) { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        customHeaders.Authorization = `Bearer ${accessToken}`;
    } else {
        console.log("<AxiosClient> ACCESS TOKEN FAILED!")
    }

    return { 
        ...config,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
            ...customHeaders, // auto attach token
            ...config.headers, // but you can override for some requests
        },
    };
});

const refreshAuthLogic = async (failedRequest: {
    response: { config: { headers: { [x: string]: string } } };
}) => {
    const refreshToken = await AsyncStorage.getItem(AppConstants.REFRESH_TOKEN);
    const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
    try {
        const response = await axiosClient.get('/auth/refresh-token', {
            headers: {
                refreshToken:refreshToken?refreshToken:"",
                Authorization: `Bearer ${String(accessToken)}`,
            },
            skipAuthRefresh: true,
        } as AxiosAuthRefreshRequestConfig);
        const { token } = response.data;
        await AsyncStorage.setItem(AppConstants.ACCESS_TOKEN, token);
        failedRequest.response.config.headers.Authorization = `Bearer ${String(
            token,
        )}`;
        return await Promise.resolve();
    } catch (error) {
        AsyncStorage.removeItem(AppConstants.REFRESH_TOKEN);
        AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
        return await Promise.reject(error);
    }
};

// createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

// HOW TO CALL EXTERNAL API

// const getExternalApi = () => {
//   const url = '/resource-name';
//   const config = {
//     baseURL: 'https://your-new-base-api-url.com/api',
//     headers: {
//       Authorization: 'your-new-token-to-use-in-new-api',
//     },
//   };

//   return axiosClient.get(url, config);
// };

export default axiosClient;
