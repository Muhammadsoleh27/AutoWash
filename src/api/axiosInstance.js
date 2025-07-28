import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
