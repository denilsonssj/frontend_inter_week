import { CircleContainer } from "./styles";

interface UserCircleProps {
    initials: string;
}

const UserCircle = ({ initials }: UserCircleProps) => {
    return (
        <CircleContainer>
            {initials}
        </CircleContainer>
    );
}

export default UserCircle;