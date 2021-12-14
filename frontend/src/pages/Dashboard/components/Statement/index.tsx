import { useEffect, useState } from 'react';

import { UserInfo } from 'interfaces/UserInfo';
import { transactions } from 'services/resources/pix';
import StatementItem from '../StatementItem';
import { StatementContainer } from './styles';

interface StatementItemInfo {
    user: UserInfo,
    value: number;
    type: 'pay' | 'received';
    updatedAt: Date;
}

const Statement = () => {

    const [statements, setStatements] = useState<StatementItemInfo[]>([]);
    const getAllTransactions = async () => {
        const { data } = await transactions();
        if (data.transactions) {
            setStatements(data.transactions);
        }
    }

    useEffect(() => {
        getAllTransactions();
    }, []);
    

    return (
        <StatementContainer>
            { statements.length > 0 && statements.map(({ user, value, type, updatedAt }: StatementItemInfo) => (
                <StatementItem
                    key={updatedAt.toString()}
                    user={user}
                    value={value}
                    type={type}
                    updatedAt={updatedAt} 
                />))
            }
        </StatementContainer>
    );
}

export default Statement;