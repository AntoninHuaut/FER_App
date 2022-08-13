import { Badge, Button, Image, List, Stack, Text } from '@mantine/core';

interface GuessEmotionResultProps {
    resetUpload: () => void;
    image: File;
    arrayEmotion: number[];
    guessEmotion: number;
    idToNames: Record<number, string>;
}

interface EmotionInfos {
    id: number;
    name: string;
    value: number;
}

function toPercent(num: number) {
    return (num * 100).toFixed(3) + '%';
}

export function GuessEmotionResult({ resetUpload, image, arrayEmotion, guessEmotion, idToNames }: GuessEmotionResultProps) {
    const results: EmotionInfos[] = [];

    arrayEmotion.forEach((value, index) =>
        results.push({
            id: index,
            name: idToNames[index],
            value: value,
        })
    );

    return (
        <>
            <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image radius="md" src={URL.createObjectURL(image)} alt="User upload" />
            </div>

            <Stack mt="sm" align={'center'}>
                <Text size="xl" weight={600}>
                    <Badge size="lg">{toPercent(arrayEmotion[guessEmotion])}</Badge> {idToNames[guessEmotion]}
                </Text>

                <List mt="xs" spacing="xs" size="sm" center>
                    {results
                        .sort((a, b) => b.value - a.value)
                        .map((result) =>
                            result.id == guessEmotion ? (
                                <span key={result.id}></span>
                            ) : (
                                <List.Item key={result.id} icon={<Badge size="md">{toPercent(result.value)}</Badge>}>
                                    <Text size="sm">{result.name}</Text>
                                </List.Item>
                            )
                        )}
                </List>

                <Button mt="xl" onClick={() => resetUpload()}>
                    Upload another image
                </Button>
            </Stack>
        </>
    );
}
