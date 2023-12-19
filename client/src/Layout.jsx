import { AppShell } from "@mantine/core";
import App from "./App";

function Layout() {
    return (
        <AppShell header={{height: 60}}>
            <AppShell.Header>
                <h1>header</h1>
            </AppShell.Header>
            <AppShell.Main>
                <App/>
            </AppShell.Main>
        </AppShell>
    )
};

export default Layout;