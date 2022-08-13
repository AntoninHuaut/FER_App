import { Button, Group, Space, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Stack spacing="xs" align="center">
                <Stack spacing={0}>
                    <Text>This website has been created to show the work done during an internship.</Text>
                    <Text>The goal was to create a model capable of recognizing a secondary emotion from a facial image.</Text>
                    <Text>It currently supports the following emotions: furrious, irritated, worried, (scared) with an accuracy of 54.63%</Text>
                    <Text>
                        It is imperative that there is only your face with as little background as possible and the image must be square (same width/height).
                    </Text>
                </Stack>

                <Space h="xs" />

                <Stack spacing={0} align="center">
                    <Text>No data is stored on the server</Text>
                </Stack>

                <Space h="xl" />

                <Group>
                    <Button
                        onClick={() => {
                            navigate('/upload-image');
                        }}>
                        Start uploading images
                    </Button>
                </Group>
            </Stack>
        </>
    );
}
