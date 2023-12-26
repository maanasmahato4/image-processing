import { Container } from "@mantine/core";
import { Link } from "react-router-dom";
import SignOut from "../SignOut/SignOut";

const linkStyle = {
    textDecoration: "none",
    color: "black",
    marginInline: "0.5rem",
    marginBlock: "1rem",
    cursor: "pointer"
};

function NavigationMenu() {
    return (
        <Container display="flex">
            <Link style={linkStyle} to="/">Convert</Link>
            <Link style={linkStyle} to="/custom">Custom</Link>
            <Link style={linkStyle} to="/signup">SignUp</Link>
            <Link style={linkStyle} to="/signin">SignIn</Link>
            <Link style={linkStyle} to="/storage">My Files</Link>
            <SignOut />
        </Container>
    )
};

export default NavigationMenu;