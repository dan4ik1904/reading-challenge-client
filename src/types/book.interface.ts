export interface IBook {
    id: string;
    author: string;
    name: string;
    pageCount: number;
    rating: number;
    review: string;
    userId: number;
}

export interface ICreateBook {
    author: string;
    name: string;
    pageCount: number;
    rating: number;
    review: string;
}
