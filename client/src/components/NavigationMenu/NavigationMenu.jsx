import { Container } from "@mantine/core";
import { Link } from "react-router-dom";

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
        </Container>
    )
};

export default NavigationMenu;