import { useEffect } from "react";
import axiosPrivate from "../api/axiosPrivate";
import { refreshAccessToken } from "../services/auth.service";

const useAxiosPrivate = () => {
    useEffect(() => {
        const interceptor = axiosPrivate.interceptors.response.use(
            (response) => response,

            async (error) => {
                const prevRequest = error.config;

                if (
                    error.response?.status === 401 &&
                    !prevRequest.sent
                ) {
                    prevRequest.sent = true;

                    await refreshAccessToken();

                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(interceptor);
        };
    }, []);

    return axiosPrivate;
};

export default useAxiosPrivate;