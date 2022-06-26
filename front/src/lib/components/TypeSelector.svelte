<script lang="ts">
  import { loading } from "$lib/stores/api_store"
  import { useWebcam } from "$lib/stores/preference_store"
  import ImageForm from "$lib/components/type/UploadType.svelte"
  import Webcam from "$lib/components/type/WebcamType.svelte"
</script>

<div class="d-flex justify-content-center mb-3">
  <p class="fs-5 form-check-label" for="flexSwitchCheckChecked">Image upload</p>
  <div class="form-check form-switch ms-2">
    <input
      class="form-check-input mt-2"
      type="checkbox"
      role="switch"
      bind:checked={$useWebcam}
      disabled={$loading}
      id="flexSwitchCheckChecked"
    />
  </div>
  <p class="fs-5 form-check-label" for="flexSwitchCheckChecked">Webcam</p>
</div>

{#if $useWebcam}
  <Webcam />
{:else}
  <ImageForm />
{/if}
