import { InputHTMLAttributes } from "react";

import { InputContainer, InputBase } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
    return (
        <InputContainer>
            <InputBase {...props} />
        </InputContainer>
    );
}

export default Input;