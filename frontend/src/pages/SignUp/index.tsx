import { Link, useNavigate } from "react-router-dom";

import { Background, ButtonContainer, Wrapper, InputContainer, FooterSignUpMessage } from "./styles";

import Card from "components/Card";
import Logo from "components/Logo";
import Input from "components/input";
import Button from "components/Button";

import background from 'assets/images/background_login.jpg';
import logoImg from 'assets/images/inter_orange_logo.png';

const SignUp = () => {

    const navigate = useNavigate();

    const handleToSignUp = () => {
        navigate('/dashboard');
    }

    return (
        <Wrapper>
            <Background image={background} />
            <Card width="403px">
                <Logo src={logoImg} width={172} height={61} alt="logo inter" />
                <InputContainer>
                    <Input placeholder="Nome" type="text" />
                    <Input placeholder="Sobrenome" type="text" />
                    <Input placeholder="E-mail" type="email" />
                    <Input placeholder="Senha" type="password" />
                    <Input placeholder="Confirmar senha" type="password" />
                </InputContainer>
                <ButtonContainer>
                    <Button type="button" onClick={handleToSignUp}>Entrar</Button>
                </ButtonContainer>
                <FooterSignUpMessage>
                    Já possui uma conta? <Link to="/">Entre já.</Link>
                </FooterSignUpMessage>
            </Card>
        </Wrapper>
    );
}

export { SignUp };