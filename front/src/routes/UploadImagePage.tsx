import { Button, Center, Container, LoadingOverlay } from '@mantine/core';
import { useLayoutEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { uploadRequest } from '../api/api_request';
import { DropzoneImage } from '../components/template/DropzoneImage';
import { GuessEmotionResult } from '../components/template/GuessEmotionResult';
import { useFetch } from '../hooks/useFetch';
import { errorNotif } from '../services/Notification.services';

export function UploadImagePage() {
    const navigate = useNavigate();

    const [image, setImage] = useState<File | null>(null);

    const [arrayEmotion, setArrayEmotion] = useState<number[]>([]);
    const [guessEmotion, setGuessEmotion] = useState<number | undefined>(undefined);
    const [idToNames, setIdToNames] = useState<Record<number, string>>({});

    const resetUpload = () => {
        setImage(null);
        setArrayEmotion([]);
        setGuessEmotion(undefined);
        setIdToNames({});
    };

    const uploadFetch = useFetch({
        onData(data) {
            setArrayEmotion(data.arrayEmotion);
            setGuessEmotion(data.guessEmotion);
            setIdToNames(data.idToNames);
        },
        onError(err) {
            errorNotif({ title: 'An error occurred', message: err.message });
        },
    });

    const onReject = (files: FileRejection[]) => {
        for (const file of files) {
            if (file.errors.length > 0) {
                errorNotif({ title: 'Upload error', message: file.errors[0].message });
            }
        }
    };

    const onUpload = (files: File[]) => {
        resetUpload();

        if (files.length > 0) {
            setImage(files[0]);
        }
    };

    useLayoutEffect(() => {
        if (!image) return;

        uploadFetch.makeRequest(uploadRequest({ image }));
    }, [image]);

    return (
        <>
            <Container size="xl">
                {guessEmotion !== undefined && image ? (
                    <GuessEmotionResult resetUpload={resetUpload} image={image} arrayEmotion={arrayEmotion} guessEmotion={guessEmotion} idToNames={idToNames} />
                ) : (
                    <>
                        <div style={{ position: 'relative' }}>
                            <LoadingOverlay transitionDuration={300} visible={uploadFetch.isLoading} overlayBlur={2} />
                            <DropzoneImage disabled={uploadFetch.isLoading} onUpload={onUpload} onReject={onReject} />
                        </div>

                        <Center>
                            <Button mt="xl" onClick={() => navigate('/')}>
                                Back to the home page
                            </Button>
                        </Center>
                    </>
                )}
            </Container>
        </>
    );
}
