export interface IUser {
    id: string;
    booksCount: number;
    className: string;
    fullName: string;
    pagesCount: number;
    role: string;
}

export interface IAuthData {
    fullName: string
    className: string
    tgId: number
}

export interface ISession {
    id: string;
    userId: string;
    tgId: number;
}

export interface IPatchData extends Omit<IAuthData, 'tgId'> {}