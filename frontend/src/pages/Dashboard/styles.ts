import styled from 'styled-components';

export const DashboardContainer = styled.div``;

export const DashboardBackground = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.backgroundLight };
`;

export const BodyContainer = styled.main`
    width: 80%;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    > div {
        flex: 1;

        & > div {
            margin-bottom: 20px;
        }

        &:nth-child(2) {
            display: flex;
            justify-content: flex-end;
        }
    }
`;

export const InlineTitle = styled.div`
    display: flex;
    width: 100%;
`;

export const BalanceTitleMessage = styled.h4`
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 26px;
    color: ${({theme})=> theme.colors.black};
`;

export const BalanceWalletValue = styled.h3`
    color: ${({theme})=> theme.colors.primary};
    font-weight: 500;
    font-size: 2rem;
    line-height: 28px;
`;

export const InlineContainer = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;

    div {
        flex: 4;
        margin-right: 20px;
    }

    button {
        flex: 1;
    }
`;

export const A = styled.p`
    color: ${({theme})=> theme.colors.primary};
`;