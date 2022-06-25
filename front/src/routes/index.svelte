<script lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast"
  import type { ServerResponse } from "../stores/fer_api"
  import { serverData } from "../stores/fer_api"

  const API_UPLOAD_URL = `${import.meta.env.VITE_BACKEND_URL}/upload`

  let inputImg: HTMLInputElement
  let imageSrc: string | null

  const getFileImage = (input: HTMLInputElement) => {
    if (!input?.files || input.files.length == 0) return null
    return input.files[0]
  }

  function onFileSelected(evt: Event) {
    const reader = new FileReader()
    const fileImage = getFileImage(evt.target as HTMLInputElement)
    if (!fileImage) {
      return console.warn("No FileImage selected")
    }

    reader.readAsDataURL(fileImage)
    reader.onload = (e: Event) => {
      const tmpImage = new Image()
      const fileReader = e.target as FileReader
      if (!fileReader || !fileReader.result) {
        return console.warn("No image found")
      }

      tmpImage.src = fileReader.result.toString()
      tmpImage.onerror = () => {
        console.warn("Reader error")
        toast.push("Cannot read the selected file")
      }
      tmpImage.onload = () => {
        if (!isImgValid(tmpImage)) return console.warn("Invalid image selected")

        imageSrc = tmpImage.src
        sendImageServer()
      }
    }
  }

  function isImgValid(checkImage: HTMLImageElement) {
    const height = checkImage.height
    const width = checkImage.width

    if (height < 48 || width < 48) {
      toast.push("The image must be at least 48x48 pixels")
      return false
    } else if (height !== width) {
      toast.push("The image must be square")
      return false
    }

    return true
  }

  async function sendImageServer() {
    serverData.resetData()

    const fileImage = getFileImage(inputImg)
    if (!fileImage) return console.warn("No FileImage to send")

    serverData.setLoading(true)
    const formData = new FormData()
    formData.append("file", fileImage)

    try {
      const response: ServerResponse = await fetch(API_UPLOAD_URL, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())

      serverData.setData(response)
    } catch (err) {
      console.error("An error occurred", err)
      serverData.setError(err instanceof Error ? err : new Error(`${err}`))
    } finally {
      serverData.setLoading(false)
    }
  }
</script>

<div class="jumbotron d-flex align-items-center">
  <div class="container text-center">
    <div class="m-3">
      <img src="/logo.png" height="160" alt="Kingston University Logo" />
    </div>

    <div class="m-3">
      <h1>Emotional recognition</h1>
      <h5>Supported: angry, disgust, fear, joy, sad, surprise</h5>
    </div>

    <div class="col-12 col-md-6 mx-auto">
      <input
        class="form-control"
        type="file"
        id="inputImg"
        disabled={$serverData.loading}
        on:change={onFileSelected}
        bind:this={inputImg}
      />
    </div>

    {#if imageSrc}
      <div class="mt-5">
        <img
          id="imgPreview"
          src={imageSrc}
          class="img-fluid"
          alt="Upload preview"
        />
      </div>

      <div class="mt-3">
        {#if $serverData.loading}
          <div class="spinner-border text-primary" role="status" />
          <p class="fst-italic fw-light">Waiting for server response...</p>
        {:else if $serverData.error}
          <p class="text-danger">
            {$serverData.error.message}
          </p>
        {:else if $serverData.data.arrayEmotion.length > 0}
          <p class="fw-bold">
            {$serverData.data.idToNames[$serverData.data.guessEmotion]}
            ({$serverData.data.arrayEmotion[$serverData.data.guessEmotion]})
          </p>
          <ul class="list-group mx-auto col-12 col-md-6">
            {#each $serverData.data.arrayEmotion as num, i}
              {#if i !== $serverData.data.guessEmotion}
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {$serverData.data.idToNames[i]}
                  <span class="badge bg-primary rounded-pill">{num}</span>
                </li>
              {/if}
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </div>

  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</div>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastWidth: 25rem;
    --toastContainerLeft: calc(50vw - 12.5rem);
    --toastBackground: #f56565;
    --toastBarBackground: #c53030;
    --toastColor: "black";
  }

  #imgPreview {
    max-height: 512px;
  }
</style>
