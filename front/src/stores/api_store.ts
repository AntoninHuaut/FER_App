import { writable } from 'svelte/store'

export interface ServerData {
    loading: boolean
    error?: Error
    data: ServerResponse
}

export interface ServerResponse {
    guessEmotion: number
    arrayEmotion: Array<number>
    idToNames: Record<number, string>
}

const emptyServerData = (): ServerData => {
    return {
        loading: false,
        data: {
            guessEmotion: 0,
            arrayEmotion: [],
            idToNames: {}
        }
    }
}

const { subscribe, set, update } = writable(emptyServerData())

export const serverData = {
    subscribe,
    setLoading: (loading: boolean) => update(self => {
        self.loading = loading
        return self
    }),
    setData: (data: ServerResponse) => update(self => {
        self.data = data
        return self
    }),
    setError: (error: Error) => update(self => {
        self.error = error
        return self
    }),
    resetData: () => update(_ => emptyServerData())
}