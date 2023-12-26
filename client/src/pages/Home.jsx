import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <Outlet />
        </Container>
    )
};

export default Home;
