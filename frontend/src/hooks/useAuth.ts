import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('Nenhum contexto encontrado!');
    }
    return authContext;
}

export default useAuth;