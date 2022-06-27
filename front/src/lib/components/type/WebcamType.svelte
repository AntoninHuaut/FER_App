<script lang="ts">
  import { onMount } from "svelte"
  import { loading, send, reset } from "$lib/stores/api_store"
  import { webcamLoad, imgBlob } from "$lib/stores/app_store"

  const MAX_VIDEO_WIDTH = 512

  let video: HTMLVideoElement
  let canvas: HTMLCanvasElement
  let screenshotInterval: number
  let scale: number = 2

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(initUserMedia)
      .catch((err) => console.error(err))

    return () => {
      clearInterval(screenshotInterval)
      reset()
    }
  })

  function initUserMedia(stream: MediaStream) {
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
    screenshotInterval = window.setInterval(() => takeScreenshot(), 50)
  }

  async function takeScreenshot() {
    const context = canvas.getContext("2d")
    if (!context) return console.warn("Unable to get canvas 2D context")

    context.scale(scale, scale)
    context.drawImage(
      video,
      (canvas.width / scale - video.width) / 2,
      (canvas.height / scale - video.height) / 2,
      video.width,
      video.height
    )
    context.scale(1 / scale, 1 / scale)

    imgBlob.set(dataURItoBlob(canvas.toDataURL("image/png")))
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
        <video bind:this={video} />

        <div class="input-group">
          <label for="zoomInput" class="ms-3 me-2">
            Zoom (x{scale.toFixed(1)})
          </label>
          <input
            id="zoomInput"
            class="form-range mx-auto w-75 me-3"
            min={1}
            max={5}
            step={0.2}
            bind:value={scale}
            type="range"
          />
        </div>
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

  <button class="btn btn-primary mb-2" on:click={send} disabled={$loading}>
    Analyse screenshot
  </button>
</div>

{#if !$webcamLoad}
  <h2 class="fw-light">Please give the website access to your camera</h2>
{/if}

<style>
  #zoomInput {
    border: none;
  }
</style>
