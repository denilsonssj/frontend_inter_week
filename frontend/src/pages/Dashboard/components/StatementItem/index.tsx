import format from "date-fns/format";
import { FiDollarSign } from 'react-icons/fi';

import currencyFormat from "utils/currencyFormat";
import { 
    BoldMessage,
    StatementItemContainer,
    StatementItemImage,
    StatementItemInfo,
    StatementItemInfoCurrency,
    StatementItemInfoMessage 
} from "./styles";

interface UserInfo {
    firstName: string;
    lastName: string;
}

interface StatementItemProps {
    user: UserInfo,
    value: number;
    type: 'pay' | 'received';
    updatedAt: Date;
}

const StatementItem = ({ user, value, type, updatedAt }: StatementItemProps) => {

    return (
        <StatementItemContainer>
             <StatementItemImage type={type}>
                <FiDollarSign size={24} />
            </StatementItemImage>
            <StatementItemInfo>
                <StatementItemInfoCurrency>
                    {currencyFormat(value, 'pt-BR', 'BRL')}
                </StatementItemInfoCurrency>
                <StatementItemInfoMessage>
                    { type === 'pay' ? 'Pago a ' : 'Recebido de ' }
                    <BoldMessage>{ `${user.firstName} ${user.lastName}` }</BoldMessage>
                </StatementItemInfoMessage>
                    <StatementItemInfoMessage>
                    {format(new Date(updatedAt), "dd/MM/yyyy 'às' HH:mm'h'")}
                </StatementItemInfoMessage>
            </StatementItemInfo>
        </StatementItemContainer>
    );
}

export default StatementItem;