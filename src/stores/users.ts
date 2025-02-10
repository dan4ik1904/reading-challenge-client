import { makeAutoObservable, runInAction } from "mobx"
import { getAllUsers, getClassmatesUsers, getOneUser, getTopUsers } from "../services/users"
import { IAuthData, ISession, IUser } from "../types/user.interface"
import { auth, authMe, getSessions, logout } from "../services/auth"
import { IBook } from "../types/book.interface"


class UserStore {

    users: IUser[] = []
    oneUser: IUser | null = null
    me: IUser | null = null
    isLoading = false
    error: unknown | null = null
    myBooks: IBook[] | Array<null> = []
    mySessions: ISession[] | Array<null> = []
    classmates: IUser[] | Array<null> = []
    endFetch = false
    topFiveUsers: IUser[] = []
    isAvtiveLogoutButton: boolean = false
    stopFetchTopUser: boolean = false
    topUsers: IUser[] = []
    page: number = 1
    isLoadingMore = false
    isFetching = false

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAllUsers() {
        this.isLoading = true
        const users = await getAllUsers()
        console.log(users)
        this.users = users
        runInAction(() => {
            this.isLoading = false
            console.log(this.users)
        })
    }

    async fetchMe(tgId: number) {
        try {
            this.isLoading = true
            const me = await authMe(tgId)
            this.me = me
            runInAction(() => {
                this.isLoading = false
            })
        } catch (error) {
            this.error = error
            runInAction(() => {
                this.isLoading = false
            })
        }

    }

    async fetchMySesions(tgId: number) {
        try {
            this.isLoading = true
            const sessions = await getSessions(tgId)
            if(sessions) {
                this.mySessions = sessions
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

    async fetchClassmaets(tgId: number) {
        try {
            const classmates = await getClassmatesUsers(tgId) 
            runInAction(() => {
                this.classmates = classmates
            })
        } catch (error) {
            
        }
    }

    async fetchTopUsers(page: number, limit: number) {
        try {
            if (this.stopFetchTopUser) return;
            this.isLoading = true;
            const newUsers = await getTopUsers(page, limit);
    
            runInAction(() => {
                if (newUsers.length === 0) {
                    this.stopFetchTopUser = true; // Останавливаем загрузку при отсутствии новых пользователей
                } else {
                    this.topUsers = [...this.topUsers, ...newUsers];
                }
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
                this.isLoading = false; // Обрабатываем ошибку
            });
        }
    }

    async fetchTopFiveUsers() {
        try {
            this.isLoading = true;
            const newUsers = await getTopUsers(1, 5); // Получаем пользователей для текущей страницы
            if(newUsers.length < 6) this.endFetch = true
            runInAction(() => {
                if(this.topFiveUsers.length === 0) {
                    this.topFiveUsers = newUsers
                } else {
                    this.topFiveUsers = [...this.topFiveUsers, ...newUsers];
                }
                
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
                this.isLoading = false; // Обрабатываем ошибку и останавливаем загрузку
            });
        }
    }

    async resetTopFiveUsers() {
        this.topFiveUsers = []
    }

    async resetTopUsers() {
        this.topUsers = []
    }
    

    async auth(data: IAuthData) {
        this.isLoading = true
        const res = await auth(data)
        if(res.status === 200){
            this.isLoading = false
        }
    }

    async fetchUser(id: string) {
        this.isLoading = true
        const res = await getOneUser(id)
        if(res.status === 200) {
            this.isLoading = false
        }
        runInAction(() => {
            if(res.data) {
                this.oneUser = res?.data 
            }
        })
    }

    async authLogout(tgId: number) {
        this.isLoading = true
        await logout(tgId)
        runInAction(() => {
            this.isLoading = false
            this.isAvtiveLogoutButton = false
        })
        
    }

    
}

export default new UserStore()