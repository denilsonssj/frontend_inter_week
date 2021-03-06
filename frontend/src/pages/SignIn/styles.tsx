import styled from "styled-components";

export const Wrapper = styled.main`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Background = styled.div<{ image: any }>`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 50vh;
    background-image: url(${({ image }) => image });
    background-size: contain;
    z-index: 1;
`;

export const InputContainer = styled.div`
    margin-top: 67px;
    width: 90%;
    flex: 1;
`;

export const ButtonContainer = styled.div`
    width: 90%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
        font-size: 0.75rem;
        font-height: 400;
        color: ${({ theme }) => theme.colors.secondary };

        a {
            font-size: 1rem;
            font-height: 700;
        }
    }
`;

export const FooterSignUpMessage = styled.p`
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.secondary };]
    font-family: "Roboto" sans-serif;

    a {
        font-family: "Roboto" sans-serif;
        font-weight: 700;
        font-size: 1rem;
    }
`;
