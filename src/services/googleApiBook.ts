import axios from "axios";


const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes',
    params: {
        key: 'AIzaSyBeYS5NrQ6TGp3AkKezp0eUcwAVdPjxiNI'
    }
})

export const getInfoBook = async(nameBook: string) => {
    const res = await api.get('', {
        params: {
            q: nameBook
        }
    })
    return res
}