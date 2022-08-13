import { Button, createStyles, Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRef } from 'react';
import { FileRejection } from 'react-dropzone';
import { Photo, Upload, X } from 'tabler-icons-react';

const MAX_SIZE_Mb = 8;

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

interface DropzoneButtonProps {
    disabled: boolean;
    onUpload: (file: File[]) => void;
    onReject: (file: FileRejection[]) => void;
}

export function DropzoneImage({ disabled, onUpload, onReject }: DropzoneButtonProps) {
    const { theme } = useStyles();
    const openRef = useRef<() => void>(null);

    return (
        <Dropzone
            openRef={openRef}
            radius="md"
            disabled={disabled}
            multiple={false}
            onDrop={(files) => onUpload(files)}
            onReject={(files) => onReject(files)}
            maxSize={MAX_SIZE_Mb * 1024 ** 2}
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}>
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <Upload size={50} color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <X size={50} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <Photo size={50} />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag image here or click to select file
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Image should not exceed {MAX_SIZE_Mb}mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
}
