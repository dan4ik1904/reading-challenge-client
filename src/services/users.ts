import { IUser } from "../types/user.interface";
import api from "./axios";


export const getAllUsers = async(): Promise<IUser[]> => {
    const res = await api.get('/users/')
    return res.data
}

export const getTopUsers = async(page: number, limit: number): Promise<IUser[]> => {
    const res = await api.get('/users/top', {
        params: { limit, page }
    })
    return res.data
}

export const getClassmatesUsers = async(tgId: number): Promise<IUser[]> => {
    const res = await api.get('/users/classmates', {
        headers: {
            Authorization: tgId
        }
    })
    return res.data
}

export const getOneUser = async(id: string) => {
    const res = await api.get<IUser>(`/users/${id}`)
    return res
}