import { FaPlus } from "react-icons/fa6";


const AddBook = () => {
    return (
        <div className="add-book" style={{
            width: '100%',
            padding: '25px 0',
            backgroundColor: '#1d1d1d',
            borderRadius: '9px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <button style={{backgroundColor: '#646cff'}}><FaPlus color={'white'} /> Добавить книгу</button>
        </div>
    )
}

export default AddBook