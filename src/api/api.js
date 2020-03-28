import * as axios from "axios";


const axiosNotesInstance = axios.create({
    baseURL: `https://react-hooks-1012d.firebaseio.com/`
});

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

const fetchNotes = () => {
    return axiosNotesInstance.get(`notes.json`)
};

const addNote = (title) => {
    return axiosNotesInstance.post(`notes.json`, {title})
};

const removeNote = (id) => {
    return axiosNotesInstance.delete(`notes/${id}.json`)
};


export const profileAPI = { getProfile, getProfileStatus, updateProfileStatus };

export const authAPI = { authenticate, login, logout };

export const usersAPI = { getUsers, follow, unfollow };

export const notesAPI = { fetchNotes, addNote, removeNote };
