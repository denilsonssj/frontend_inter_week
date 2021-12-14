import { ButtonHTMLAttributes } from "react";

import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
    return (
        <ButtonContainer {...props}>
            {props.children}
        </ButtonContainer>
    );
}

export default Button;