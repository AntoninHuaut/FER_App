import { AppShell, Container, Space, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';

export function AppLayout() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            header={<AppHeader opened={opened} setOpened={setOpened} />}>
            <Container fluid>
                <Space h="xl" />
                <Outlet />
            </Container>
        </AppShell>
    );
}
