<script lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast"

  const controller = new AbortController()

  let image: HTMLImageElement | null
  let inputImg: HTMLInputElement
  let serverResponse: string

  function onFileSelected(evt: Event) {
    const reader = new FileReader()
    const input = evt.target as HTMLInputElement
    if (!input.files || !input.files.length) return

    reader.readAsDataURL(input.files[0])
    reader.onload = (e: Event) => {
      const tmpImage = new Image()
      const fileReader = e.target as FileReader
      if (!fileReader || !fileReader.result) return

      tmpImage.src = fileReader.result.toString()
      tmpImage.onload = () => {
        toast.pop()

        if (!isImgValid(tmpImage)) {
          reset()
        } else {
          image = tmpImage
          sendImageServer()
        }
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
    try {
      // await fetch(url, {
      //     signal: controller.signal
      // })

      await new Promise((r) => setTimeout(r, 2000))
      serverResponse = "TEST"
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        // TODO
      }
    }
  }

  function reset() {
    image = null
    serverResponse = ""
    controller.abort()
  }
</script>

<div class="jumbotron d-flex align-items-center">
  <div class="container text-center">
    <div class="m-3">
      <img src="/logo.png" height="192" alt="Kingston University Logo" />
    </div>

    <div class="m-3">
      <h1>Emotional recognition</h1>
      <h5>Supported: angry, disgust, fear, joy, sad, surprise</h5>
    </div>

    <div class="col-6 mx-auto">
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
          on:click={() => inputImg.click()}
        />
      </div>

      <div class="mt-3">
        {#if !serverResponse}
          <div class="spinner-border text-primary" role="status" />
          <p class="fst-italic fw-light">Waiting for server response...</p>
        {:else}
          <p class="fw-bold">{serverResponse}</p>
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
