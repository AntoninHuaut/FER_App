<script lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast"

  interface ServerResponse {
    guessEmotion: number
    arrayEmotion: Array<number>
    idToNames: Record<number, string>
  }

  let inputImg: HTMLInputElement
  let image: HTMLImageElement | null

  let serverResponse: ServerResponse = {
    guessEmotion: NaN,
    arrayEmotion: [],
    idToNames: {},
  }

  $: isValidServerResponse = () => !isNaN(serverResponse.guessEmotion)

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
      tmpImage.onload = () => {
        toast.pop()

        if (!isImgValid(tmpImage)) {
          console.warn("Invalid image selected")
        } else {
          image = tmpImage
          sendImageServer()
        }
      }
      tmpImage.onerror = () => {
        toast.pop()

        console.warn("Reader error")
        toast.push("Cannot read the selected file")
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
    inputImg.disabled = true
    serverResponse = {
      guessEmotion: NaN,
      arrayEmotion: [],
      idToNames: {},
    }

    const fileImage = getFileImage(inputImg)
    console.debug("FileImage", fileImage)
    if (!fileImage) {
      return console.warn("No FileImage to send")
    }

    try {
      const formData = new FormData()
      formData.append("file", fileImage)

      const url = `${import.meta.env.VITE_BACKEND_URL}/upload`
      const response = (await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())) as ServerResponse

      serverResponse = response
    } catch (err) {
      console.error("An error occurred", err)

      if (err instanceof Error) {
        toast.push("An error occurred: " + err.message, {
          initial: 0,
          next: 0,
          dismissable: false,
        })
      }
    } finally {
      inputImg.disabled = false
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
        on:change={onFileSelected}
        bind:this={inputImg}
      />
    </div>

    {#if image}
      <div class="mt-5">
        <img
          id="imgPreview"
          src={image.src}
          class="img-fluid"
          alt="Upload preview"
        />
      </div>

      <div class="mt-3">
        {#if isValidServerResponse()}
          <p class="fw-bold">
            {serverResponse.idToNames[serverResponse.guessEmotion]}
            ({serverResponse.arrayEmotion[serverResponse.guessEmotion]})
          </p>
          <ul class="list-group mx-auto col-12 col-md-6">
            {#each serverResponse.arrayEmotion as num, i}
              {#if i !== serverResponse.guessEmotion}
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {serverResponse.idToNames[i]}
                  <span class="badge bg-primary rounded-pill">{num}</span>
                </li>
              {/if}
            {/each}
          </ul>
        {:else}
          <div class="spinner-border text-primary" role="status" />
          <p class="fst-italic fw-light">Waiting for server response...</p>
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
