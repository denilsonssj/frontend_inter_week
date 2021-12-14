import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from 'components/Card';
import Logo from 'components/Logo';
import Input from 'components/input';
import Button from 'components/Button';
import useAuth from 'hooks/useAuth';
import { SignInInfo } from 'interfaces/SignIn';
import { 
    Background,
    ButtonContainer,
    Wrapper,
    InputContainer,
    FooterSignUpMessage 
} from './styles';

import background from 'assets/images/background_login.jpg';
import logoImg from 'assets/images/inter_orange_logo.png';

const SignIn = () => {

    const navigate = useNavigate();
    const { userSignIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToSignIn = async () => {
        const userInfo: SignInInfo = {
            email,
            password
        };
        const response = await userSignIn(userInfo);
        if (response.id) {
            navigate('/dashboard');
            return;
        }
        else {
            alert('Usuário ou senha inválida!');
        }
    }

    return (
        <Wrapper>
            <Background image={background} />
            <Card width="403px">
                <Logo src={logoImg} width={172} height={61} alt="logo inter" />
                <InputContainer>
                    <Input 
                        placeholder="E-mail"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input 
                        placeholder="Senha"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </InputContainer>
                <ButtonContainer>
                    <Button type="button" onClick={handleToSignIn}>Entrar</Button>
                </ButtonContainer>
                <FooterSignUpMessage>
                    Ainda não é cadastrado? <Link to="/signup">Cadastre-se já.</Link>
                </FooterSignUpMessage>
            </Card>
        </Wrapper>
    );
}

export { SignIn };