import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import pageItemStyles from '../../../css/page.module.css'


const AddBook = () => {
    const navigate = useNavigate()

    const click = () => {
        navigate('/mybooks/add')
    }

    return (
        <div className={pageItemStyles.page__item} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '130px'
        }}>
            <button onClick={() => click()} style={{backgroundColor: '#17999D', color: 'white'}}><FaPlus color={'white'} /> Добавить книгу</button>
        </div>
    )
}

export default AddBook