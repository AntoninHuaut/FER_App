<script lang="ts">
  import { help } from "$lib/stores/help_store"
</script>

<div class="m-3">
  <img src="/logo.png" height="160" alt="Kingston University Logo" />
</div>

<div class="m-3">
  <h1>Facial Emotional Recognition</h1>

  <div class="d-flex justify-content-center">
    <div>
      <h5>Supported: angry, disgust, fear, joy, sad, surprise</h5>
    </div>

    {#if !$help}
      <div class="ms-3">
        <a
          href={"#"}
          class="btn btn-outline-primary btn-sm"
          on:click={() => help.set(true)}
        >
          Help?
        </a>
      </div>
    {/if}
  </div>
</div>
