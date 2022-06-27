<script lang="ts">
  import { onMount } from "svelte"
  import { loading, send, reset } from "$lib/stores/api_store"
  import { webcamLoad, imgBlob } from "$lib/stores/app_store"

  const MAX_VIDEO_WIDTH = 512

  let video: HTMLVideoElement
  let canvas: HTMLCanvasElement

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(createStream)
    .catch((err) => console.error(err))

  onMount(() => () => reset())

  function createStream(stream: MediaStream) {
    video.srcObject = stream
    video.addEventListener("canplay", setupVideo, false)
    webcamLoad.set(true)
  }

  function setupVideo() {
    const videoWidth = Math.min(video.videoWidth, MAX_VIDEO_WIDTH)
    const videoHeight = video.videoHeight / (video.videoWidth / videoWidth)
    const canvasWidth = Math.min(videoWidth, videoHeight)
    const canvasHeight = canvasWidth

    video.setAttribute("width", "" + videoWidth)
    video.setAttribute("height", "" + videoHeight)
    canvas.setAttribute("width", "" + canvasWidth)
    canvas.setAttribute("height", "" + canvasHeight)
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    video.play()
  }

  async function takeScreenshot() {
    const context = canvas.getContext("2d")
    if (!context) return console.warn("Unable to get canvas 2D context")

    context.drawImage(
      video,
      (canvas.width - video.width) / 2,
      (canvas.height - video.height) / 2,
      video.width,
      video.height
    )

    imgBlob.set(dataURItoBlob(canvas.toDataURL("image/png")))
    await send()
  }

  function dataURItoBlob(dataURI: string) {
    const binary = window.atob(dataURI.split(",")[1])
    const array = binary.split("").map((e) => e.charCodeAt(0))
    return new Blob([new Uint8Array(array)], { type: "image/png" })
  }
</script>

<div hidden={!$webcamLoad}>
  <div class="d-flex justify-content-center">
    <div class="me-3">
      <div class="d-flex flex-column justify-content-center">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video bind:this={video}>test</video>
        <p class="mt-1 fs-5">Real time video</p>
      </div>
    </div>

    <div class="ms-3">
      <div class="d-flex flex-column justify-content-center">
        <canvas bind:this={canvas} />
        <p class="mt-1 fs-5">Screenshot used</p>
      </div>
    </div>
  </div>

  <button
    class="btn btn-primary mb-2"
    on:click={takeScreenshot}
    disabled={$loading}
  >
    Take picture
  </button>
</div>

{#if !$webcamLoad}
  <h2 class="fw-light">Please give the website access to your camera</h2>
{/if}
