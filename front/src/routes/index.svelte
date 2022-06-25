<script lang="ts">
  import Header from "../components/Header.svelte"
  import Help from "../components/Help.svelte"
  import ImageForm from "../components/ImageForm.svelte"

  import { help } from "../stores/help_store"
</script>

<div class="jumbotron d-flex align-items-center">
  <div class="container text-center">
    <Header />

    {#if $help}
      <Help />
    {:else}
      <ImageForm />
    {/if}
  </div>
</div>
