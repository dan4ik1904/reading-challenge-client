import { makeAutoObservable, runInAction } from "mobx"
import { IBook, ICreateBook } from "../types/book.interface";
import { getMyBooks } from "../services/auth";
import { createBook, deleteBook, getAllBooks, getBooksUser, getOneBook } from "../services/books";


class BooksStore {

    myBooks: IBook[] | Array<null> = []
    isLoading = false
    isLoadingAddBook = false
    error: unknown | null = null
    books: IBook[] | Array<null> | undefined = []
    book: IBook | null = null
    userBooks: IBook[] | null[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchMybooks(tgId: number) {
        try {
            this.isLoading = true
            const books = await getMyBooks(tgId)
            if(books) {
                this.myBooks = books
                runInAction(() => {
                    this.isLoading = false
                })
            }
        } catch (error) {
            this.error = error
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async fetchAllBooks() {
        try {
            const books = await getAllBooks()
            this.books = books
        } catch (error) {
            
        }
    }

    async createBook(data: ICreateBook, tgID: number, setLoading: any) {
        try {
            setLoading(true)
            const res = await createBook(data, tgID)
            if(res?.status === 200) {
                setLoading(false)
            }
        } catch (error) {
            
        }
    }

    async fetchOneBook(id: string) {
        try {
            this.isLoading = true
            const book = await getOneBook(id)
            if(book) this.book = book
            this.isLoading = false
        } catch (error) {
            
        }
    }

    async fetchBooksUser(id: string) {
        try {
            this.isLoading = true
            const books = await getBooksUser(id)
            if(books) this.userBooks = books
            this.isLoading = false
        } catch (error) {
            
        }
    }

    async deleteBook(id: string, tgID: number) {
        try {
            this.isLoading = true
            await deleteBook(id, tgID)
            this.isLoading = false
        } catch (error) {
            
        }
    }
}

export default new BooksStore()
