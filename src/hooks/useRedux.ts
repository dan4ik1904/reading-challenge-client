// hooks/useRedux.ts
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore
} from 'react-redux'
import { AppDispatch, RootState } from '../services/store'

// Named exports для отдельных хуков
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Основной хук useRedux
const useRedux = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const store = useStore<RootState>();

  return {
    dispatch,
    selector,
    getState: store.getState,
    subscribe: store.subscribe
  };
};

// Default export основного хука
export default useRedux;