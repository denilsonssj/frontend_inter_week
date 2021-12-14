import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router';
import isEmpty from 'lodash/fp/isEmpty';

import Button from 'components/Button';
import Card from 'components/Card';
import Header from 'components/Header';
import Input from 'components/input';
import useAuth from 'hooks/useAuth';
import currencyFormat from 'utils/currencyFormat';
import Statement from './components/Statement';
import { pay, request } from 'services/resources/pix';

import { 
    DashboardBackground,
    BodyContainer,
    InlineContainer,
    InlineTitle, 
    BalanceTitleMessage,
    BalanceWalletValue,
    A
} from './styles';

const Dashboard = () => {

    const { user, getCurrentUser } = useAuth();
    const navigate = useNavigate();
    const [generatedKey, setGeneratedKey] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [key, setKey] = useState<string>('');

    const handleNewPayment = async () => {
        const { data } = await request(Number(value));
        if (data.copyPasteKey) {
            setGeneratedKey(data.copyPasteKey);
        }
    }

    const handlePayPix = async () => {
        try {
            const { data } = await pay(key);
            if (data.message) {
                alert('Pagamento realizado com sucesso.');
            }
            else {
                alert('Não foi possível fazer o pagamento');
            }
        } catch(e) {
            console.log(e);
            alert('Não foi possível fazer o pagamento');
        }
    }

    useEffect(() => {
        if (isEmpty(user)) {
            navigate('/');
        }
    }, [user]);

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                {
                    user && Object.keys(user).length !== 0 && (
                        <Fragment>
                             <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <BalanceTitleMessage>Saldo atual</BalanceTitleMessage>
                        </InlineTitle>
                        <InlineContainer>
                            {
                                user && Object.keys(user).length !== 0 && (
                                    <BalanceWalletValue>
                                        {currencyFormat(user.wallet, 'pt-BR', 'BRL')}
                                    </BalanceWalletValue>
                                )
                            }
                        </InlineContainer>
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <BalanceTitleMessage>Receber pix</BalanceTitleMessage>
                        </InlineTitle>
                        <InlineContainer>
                            <Input
                                type="text"
                                placeholder="Chave"
                                style={{ flex: 1 }}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                            <Button onClick={handleNewPayment}>Gerar código</Button>
                        </InlineContainer>
                        {
                            generatedKey && (
                                <Fragment>
                                    <A>Pix copia e cola</A>
                                    <A>{generatedKey}</A>
                                </Fragment>
                            )
                        }
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <BalanceTitleMessage>Pagar pix</BalanceTitleMessage>
                        </InlineTitle>
                        <InlineContainer>
                            <Input 
                                style={{ flex: 1 }}
                                placeholder="Insira a chave"
                                value={key}
                                onChange={e => setKey(e.target.value)}
                            />
                            <Button onClick={handlePayPix}>Pagar pix</Button>
                        </InlineContainer>
                    </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <BalanceTitleMessage>Extrato da conta</BalanceTitleMessage>
                        </InlineTitle>
                        <Statement />
                    </Card>
                </div>
                        </Fragment>
                    )
                }
            </BodyContainer>
        </DashboardBackground>
    );
}

export default Dashboard;