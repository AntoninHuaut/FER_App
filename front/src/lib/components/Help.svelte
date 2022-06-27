<script lang="ts">
  import { help } from "$lib/stores/preference_store"
</script>

<div class="col col-lg-9 mx-auto">
  <p class="fs-6 text-start">
    When using image upload or webcam, it is imperative that there is only your
    face with as little background as possible and the image must be square
    (same width/height).
    <br />In addition, accessories should not appear (glasses, ...) and you have
    to minimize the hair by zooming in on the face
    <br />If you use a webcam, the picture will be cropped from the center.
  </p>

  <a href={"#"} class="btn btn-primary" on:click={() => help.set(false)}>
    I understand, let me try!
  </a>
</div>
