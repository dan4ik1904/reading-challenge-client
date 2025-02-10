import { IBook, ICreateBook } from "../types/book.interface"
import api from "./axios"


export const getAllBooks = async(): Promise<IBook[] | undefined>  => {
    try {
        const res = await api.get('/books')
        return res.data
    } catch (error) {
        // return error
    }
}

export const createBook = async(data: ICreateBook, tgID: number)=> {
    try {
        const res = await api.post('/books', data, {
            headers: {
                Authorization: tgID
            }
        })
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getOneBook = async(id: string) => {
    try {
        const res = await api.get<IBook>(`/books/${id}`)
        return res.data
    } catch (error) {
    }
}

export const getBooksUser = async(id: string) => {
    try {
        const res = await api.get(`/books/top/${id}`)
        return res.data
    } catch (error) {
        
    }
}

export const deleteBook = async(id: string, tgID: number) => {
    try {
        const res = await api.delete(`/books/${id}`, {
            headers: {
                Authorization: tgID
            }
        })
        return res
    } catch (error) {
        
    }
}