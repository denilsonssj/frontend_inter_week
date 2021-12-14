import { ImgHTMLAttributes } from "react";

import { LogoContainer } from "./styles";

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Logo = (props: LogoProps) => {
    return (
        <LogoContainer {...props} />
    );
}

export default Logo;