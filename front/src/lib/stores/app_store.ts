import { writable } from 'svelte/store'

export const webcamLoad = writable(false)
export const imgBlob = writable<Blob>()