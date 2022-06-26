import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

function createBoolPref(key: string, defaultValue: boolean) {
    const initialValue = browser ? window.localStorage.getItem(key) ?? `${defaultValue}` : `${defaultValue}`
    const store = writable(initialValue === 'true')
    store.subscribe((value) => {
        if (browser) {
            window.localStorage.setItem(key, `${value}`)
        }
    })
    return store
}

const help = createBoolPref("help", true)
const useWebcam = createBoolPref("useWebcam", true)

export { help, useWebcam }