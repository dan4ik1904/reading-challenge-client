import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const AddBook = () => {
    const navigate = useNavigate()

    const click = () => {
        navigate('/mybooks/add')
    }

    return (
        <div className="add-book page-mybook__item" style={{
            width: '100%',
            padding: '25px 0',
            backgroundColor: '#1d1d1d',
            borderRadius: '9px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '130px'
        }}>
            <button onClick={() => click()} style={{backgroundColor: '#646cff', color: 'white'}}><FaPlus color={'white'} /> Добавить книгу</button>
        </div>
    )
}

export default AddBook