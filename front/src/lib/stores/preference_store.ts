import { browser } from '$app/env'
import { writable } from 'svelte/store'

const helpKey = "help"
const helpDefaultValue = 'true'
const helpInitialValue = browser ? window.localStorage.getItem(helpKey) ?? helpDefaultValue : helpDefaultValue

const useWebcamKey = "useWebcam"
const useWebcamDefaultValue = 'true'
const useWebcamInitialValue = browser ? window.localStorage.getItem(useWebcamKey) ?? useWebcamDefaultValue : useWebcamDefaultValue

export const help = writable(helpInitialValue === 'true')
export const useWebcam = writable(useWebcamInitialValue === 'true')

function checkChange(key: string, value: any) {
    if (browser) {
        window.localStorage.setItem(key, value)
    }
}

help.subscribe((value) => checkChange(helpKey, value))
useWebcam.subscribe((value) => checkChange(useWebcamKey, value))