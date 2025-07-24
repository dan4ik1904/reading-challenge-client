export interface IBook {
    id: string;
    author: string;
    name: string;
    pageCount: number;
    rating: number;
    review: string;
    userId: string;
}

export interface ICreateBook {
    author: string;
    name: string;
    pageCount: number;
    rating: number;
    review: string;
}
