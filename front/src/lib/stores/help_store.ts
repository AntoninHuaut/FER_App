import { browser } from '$app/env'
import { writable } from 'svelte/store'

const key = "help"
const defaultValue = 'true'
const initialValue = browser ? window.localStorage.getItem(key) ?? defaultValue : defaultValue

const help = writable(initialValue === 'true')

help.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem(key, `${value}`)
    }
})

export { help }