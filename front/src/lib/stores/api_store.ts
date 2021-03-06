import { get, writable } from 'svelte/store'
import { imgBlob } from '$lib/stores/app_store'

const API_UPLOAD_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/upload`

export interface ServerResponse {
    guessEmotion: number
    arrayEmotion: Array<number>
    idToNames: Record<number, string>
}

const loading = writable(false)
const error = writable<Error | undefined>()
const data = writable<ServerResponse | undefined>()

function reset() {
    data.set(undefined)
    error.set(undefined)
}

async function send() {
    reset()
    loading.set(true)

    try {
        const imgBlobVal = get(imgBlob)
        if (!imgBlobVal) {
            return new Error("No image to send")
        }

        const formData = new FormData()
        formData.append("file", imgBlobVal, "file.png")

        const response = await fetch(API_UPLOAD_URL, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            switch (response.status) {
                case 413:
                    throw new Error("Image is too large");
                default:
                    throw new Error("HTTP status " + response.status);
            }
        }

        data.set(await response.json())
    } catch (err) {
        console.error("An error occurred", err)
        error.set(err instanceof Error ? err : new Error(`${err}`))
    } finally {
        loading.set(false)
    }
}

export { data, loading, error, send, reset }