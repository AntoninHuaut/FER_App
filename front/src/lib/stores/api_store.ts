import { get, writable } from 'svelte/store'
import { imgBlob } from '$lib/stores/app_store'

const API_UPLOAD_URL = `${import.meta.env.VITE_BACKEND_URL}/upload`

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

    const formData = new FormData()
    formData.append("file", get(imgBlob), "file.png")

    try {
        const response = await fetch(API_UPLOAD_URL, {
            method: "POST",
            body: formData,
        })
        data.set(await response.json())
    } catch (err) {
        console.error("An error occurred", err)
        error.set(err instanceof Error ? err : new Error(`${err}`))
    } finally {
        loading.set(false)
    }
}

export { data, loading, error, send, reset }