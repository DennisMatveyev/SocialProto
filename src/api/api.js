import * as axios from "axios";


const axiosInstance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {'API-KEY': 'KEY_FROM_ACCOUNT_HERE'}
});

// axios requests return promise
const getUsers = (currentPage, pageSize) => {
    return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
};

const follow = (userId) => {
    return axiosInstance.post(`follow/${userId}`)
};

const unfollow = (userId) => {
    return axiosInstance.delete(`follow/${userId}`)
};

const getProfile = (userId) => {
    return axiosInstance.get(`profile/${userId}`)
};

const getProfileStatus = (userId) => {
    return axiosInstance.get(`profile/status/${userId}`)
};

const updateProfileStatus = (status) => {
    return axiosInstance.put(`profile/status`, {status: status})
};

const authenticate = () => {
    return axiosInstance.get(`auth/me`)
};

const login = (email, password, rememberMe = false) => {
    return axiosInstance.post(`auth/login`, { email, password, rememberMe })
};

const logout = () => {
    return axiosInstance.delete(`auth/login`)
};


export const profileAPI = { getProfile, getProfileStatus, updateProfileStatus };

export const authAPI = { authenticate, login, logout };

export const usersAPI = { getUsers, follow, unfollow };
