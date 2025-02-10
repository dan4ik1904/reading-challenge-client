import { useEffect, useState } from 'react';
import useTelegram from './useTelegram';
import api from '../services/axios';
import { IUser } from '../types/user.interface';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IUser | null>(null);
    const { tgID } = useTelegram();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);

            if (!tgID) {
                console.error('Telegram API не инициализирован или ID пользователя недоступен');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/me', {
                    headers: {
                        Authorization: tgID
                    }
                });

                const dataRes = response.data;
                setData(dataRes);

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Ошибка при проверке аутентификации:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [tgID]);

    return { isAuthenticated, loading, data };
};

export default useAuth;
