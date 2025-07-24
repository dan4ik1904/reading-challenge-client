import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/UI/Loading/Loading"
import CustomSelectArray from "../../components/UI/Select/SelectArray"
import useTelegram from "../../hooks/useTelegram"
import { useCreateBookMutation } from '../../services/booksApi'



const AddBook = () => {
    const [avtor, setAvtor] = useState('')
    const [nameBook, setNameBook] = useState('')
    const [countPage, setCountPage] = useState(0)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [error, setError] = useState('')
    const [isOpenRatting, setIsOpenRatting] = useState(false)

    const { tgID } = useTelegram()

    const [createBook, {isLoading}] = useCreateBookMutation()

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const send = async() => {
        if(!avtor || !nameBook || !countPage || !rating || !review || !tgID) return setError('Введите коректные данные')
        createBook({data: {
            author: avtor,
            name: nameBook,
            pageCount: countPage,
            rating,
            review
        }, tgID})
        .finally(() => {
            navigate('/mybooks')
        })

        
    }

    if(isLoading) return <Loading />

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: '#1d1d1d', borderRadius: '10px', padding: '2em', marginTop: '50px' }}>
                        <h2 className="text-center" style={{ color: '#fff' }}>Добавление книги</h2>
                        {error && (
                            <p style={{
                                color: 'red'
                            }}>{error}</p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label" style={{ color: '#888' }}>Имя автора</label>
                                <input
                                    onChange={e => setAvtor(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="text" className="form-label" style={{ color: '#888' }}>Название книги</label>
                                <input
                                    onChange={e => setNameBook(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={{ color: '#888' }}>Количество страниц</label>
                                <input
                                    onChange={e => setCountPage(Number(e.target.value))}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label" style={{ color: '#888' }}>Рейтинг</label>
                                <CustomSelectArray isOpen={isOpenRatting} setIsOpen={setIsOpenRatting}  options={['1', '2', '3', '4', '5']} onChange={value => setRating(Number(value))} placeholder='Рейтинг'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" style={{ color: '#888' }}>Ревью</label>
                                <textarea
                                    onChange={e => setReview(e.target.value)}
                                    className="form-control"
                                    id="password"
                                    required
                                    rows={3}
                                    style={{resize: 'none'}}
                                />
                            </div>
                            <button onClick={() => send()} type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#17999D', border: 'none', marginTop: '10px' }}>
                                Добавить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBook