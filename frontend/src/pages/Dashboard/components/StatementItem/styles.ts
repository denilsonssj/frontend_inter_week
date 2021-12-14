import styled from 'styled-components';

export const StatementItemContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const StatementItemInfo = styled.div``;

export const StatementItemInfoCurrency = styled.p`
    color: ${({ theme }) => theme.colors.primary };
`;

export const StatementItemInfoMessage = styled.p``;

export const BoldMessage = styled.span`
    font-weight: 700;
`;

export const StatementItemImage = styled.div<{
    type: 'pay' | 'received',
}>`
    width: 60px;
    height: 60px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.background };
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: ${({ type, theme }) => type === 'pay' ?
        theme.colors.red : theme.colors.green
    };
`;
