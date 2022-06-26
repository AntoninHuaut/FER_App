<script lang="ts">
  import { loading } from "$lib/stores/api_store"
  import { help } from "$lib/stores/preference_store"
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
        <button
          href={"#"}
          class="btn btn-outline-primary btn-sm"
          disabled={$loading}
          on:click={() => help.set(true)}
        >
          Help?
        </button>
      </div>
    {/if}
  </div>
</div>
