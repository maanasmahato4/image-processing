import { AppShell } from "@mantine/core";
import App from "./App";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";

function Layout() {
    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
                <NavigationMenu />
            </AppShell.Header>
            <AppShell.Main>
                <App />
            </AppShell.Main>
        </AppShell>
    )
};

export default Layout;