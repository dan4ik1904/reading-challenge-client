import { useEffect, useState } from "react"
import Loading from "../../components/UI/Loading/Loading"
import UserTopCard from "../../components/UI/UserTopCard/UserTopCard"
import itemStyles from '../../css/Item.module.css'
import useTelegram from "../../hooks/useTelegram"
import { useGetClassmatesQuery } from '../../services/userApi'

const Classmates = () => {
    const { tgID } = useTelegram();
    const [skip, setSkip] = useState(true);

    // Включаем запрос только когда tgID доступен
    useEffect(() => {
        if (tgID) {
            setSkip(false);
        }
    }, [tgID]);

    const { data: classmates, isLoading, isError } = useGetClassmatesQuery(tgID!, {
        skip: skip || !tgID
    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading classmates</div>;

    return (
        <div className={itemStyles.items}>
            {classmates && classmates.length > 0 ? (
                classmates.map(user => (
                    <UserTopCard key={user.id} user={user} />
                ))
            ) : (
                <div>No classmates found</div>
            )}
        </div>
    );
};

export default Classmates;