<script lang="ts">
  import { help } from "$lib/stores/preference_store"
</script>

<div>
  <h1>TODO help menu</h1>

  <a href={"#"} class="btn btn-primary" on:click={() => help.set(false)}>
    I understand, let me try!
  </a>
</div>
