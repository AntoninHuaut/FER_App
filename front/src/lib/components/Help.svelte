<script lang="ts">
  import { help } from "$lib/stores/preference_store"
</script>

<div>
  <p class="fs-5">
    When using image upload or webcam, it is imperative that there is only your
    face with as little background as possible.
    <br />In addition, you should not wear accessories (glasses, ...)
  </p>

  <a href={"#"} class="btn btn-primary" on:click={() => help.set(false)}>
    I understand, let me try!
  </a>
</div>
