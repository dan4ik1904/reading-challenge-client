import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/UI/Loading/Loading'
import CustomSelect from '../../components/UI/Select/Select'
import CustomSelectArray from '../../components/UI/Select/SelectArray'
import { classes, studentsWithClass } from '../../Data/sctudentClass'
import useTelegram from '../../hooks/useTelegram'
import { useLoginMutation } from '../../services/authApi'


const Auth: React.FC = observer(() => {
    const {tgID} = useTelegram()
    const [username, setUsername] = useState<string>('');
    const [classname, setClassname] = useState<string>('');
    const [students, setStudents] = useState<Array<string>>([])
    const [isOpenStudents, setIsOpenStudents] = useState(false)

    const navigate = useNavigate()

    const [auth, {isLoading}] = useLoginMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onChangeClass = (value: number, label: string) => {
        setClassname(label)
        setStudents(studentsWithClass[value])
    }


    const send = async() => {
        if(username && classname) {
            auth({
                fullName: username,
                className: classname,
                tgId: tgID
            })
            .finally(() => {
                setTimeout(() => {
                   navigate('/') 
                }, 5000)
                
            })
            
        }
    }

    if(isLoading) return <Loading />
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: '#1d1d1d', borderRadius: '10px', padding: '2em', marginTop: '5em' }}>
                        <h2 className="text-center" style={{ color: '#fff' }}>Авторизиция</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label" style={{ color: '#888' }}>Выберите класс</label>
                                <CustomSelect onClick={() => {setIsOpenStudents(false)}} options={classes} onChange={onChangeClass} placeholder='Класс'/>
                            </div>
                            {students.length > 0 && (
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{ color: '#888' }}>Выберите имя</label>
                                    <CustomSelectArray setIsOpen={setIsOpenStudents} isOpen={isOpenStudents} options={students} onChange={setUsername} placeholder='Имя'/>
                                </div>
                            )}
                            
                            <button onClick={send} type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#17999D', border: 'none' }}>
                                Авторизироваться
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Auth;