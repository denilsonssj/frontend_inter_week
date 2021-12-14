import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 100%;
    height: 90px;
    background-color: ${({ theme }) => theme.colors.background };
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderWrapper = styled.div`
    width: 80%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UserInfoDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserInfoMessage = styled.p`
`;

export const UserInfoMessageName = styled.span`
    color: ${({ theme }) => theme.colors.primary };
    font-weight: 500;
`;

export const UserInfoMessageStrong = styled.span`
    font-weight: 700;
`;

export const UserLogout = styled.span`
    color: ${({ theme }) => theme.colors.primary };
    &:hover {
        cursor: pointer;
    }
`;
