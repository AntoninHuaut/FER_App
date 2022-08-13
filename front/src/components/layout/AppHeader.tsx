import { Avatar, Group, Header, MediaQuery, Title } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

interface AppHeaderProps {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export function AppHeader(props: AppHeaderProps) {
    return (
        <Header height={56} px="md">
            <div style={{ height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Group position="apart">
                        <Link to={'/'}>
                            <Avatar size={32} radius={0} src={'/logo.png'} />
                        </Link>
                        <Title order={4}>Secondary Emotion</Title>
                    </Group>
                </MediaQuery>

                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Group position="apart">
                        <Link to={'/'}>
                            <Avatar size={42} radius={0} src={'/logo.png'} />
                        </Link>
                        <Title order={2}>Secondary Emotion</Title>
                    </Group>
                </MediaQuery>

                <Group>
                    <ThemeSwitcher />
                </Group>
            </div>
        </Header>
    );
}
