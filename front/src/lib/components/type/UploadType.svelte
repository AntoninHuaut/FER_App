<script lang="ts">
  import { onMount } from "svelte"
  import { toast } from "@zerodevx/svelte-toast"
  import { loading, reset, send } from "$lib/stores/api_store"
  import { imgBlob } from "$lib/stores/app_store"

  let inputImg: HTMLInputElement
  let imageSrc: string | null

  onMount(() => () => reset())

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
    const fileImage = getFileImage(inputImg)
    if (!fileImage) return console.warn("No FileImage to send")

    imgBlob.set(fileImage)
    await send()
  }
</script>

<div class="col-12 col-md-6 mx-auto">
  <input
    class="form-control"
    type="file"
    id="inputImg"
    disabled={$loading}
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
{/if}

<style>
  #imgPreview {
    max-height: 512px;
  }
</style>
