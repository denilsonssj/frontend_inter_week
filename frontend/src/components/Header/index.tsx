import { useNavigate } from 'react-router-dom';

import UserCircle from 'components/UserCircle';
import Logo from 'components/Logo';
import useAuth from 'hooks/useAuth';
import { 
    HeaderContainer,
    HeaderWrapper,
    UserInfo,
    UserInfoDetails,
    UserInfoMessage, 
    UserInfoMessageName, 
    UserInfoMessageStrong,
    UserLogout
} from './styles';

import logoImg from 'assets/images/inter_orange_logo.png';

const Header = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const generateInitials = (): string => {
        let initials: string = '';
        if (Object.keys(user).length === 0) {
            initials = user.firstName.substr(0,1)
                .concat(user.lastName.substr(0,1))
                .toUpperCase();
        }
        return initials;
    }

    const handleLogoff = () => {
        localStorage.removeItem('@Inter:Token');
        localStorage.removeItem('@Inter:User');
        navigate('/');
    }

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <Logo src={logoImg} width={172} height={61} alt="logo" />
                {
                    user && Object.keys(user).length !== 0 && (
                        <UserInfo>
                            <UserCircle initials={generateInitials()} />
                            <UserInfoDetails>
                                <UserInfoMessage>
                                    Olá.
                                    <UserInfoMessageName>{` ${user?.firstName} ${user?.lastName}`}</UserInfoMessageName>
                                </UserInfoMessage>
                                <UserInfoMessageStrong>{user.accountNumber}-{user.accountDigit}</UserInfoMessageStrong>
                                <UserLogout onClick={handleLogoff}>Sair</UserLogout>
                            </UserInfoDetails>
                        </UserInfo>
                    )
                }
            </HeaderWrapper>
        </HeaderContainer>
    );
}

export default Header;