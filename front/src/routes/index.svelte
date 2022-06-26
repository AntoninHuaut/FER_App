<script lang="ts">
  import Header from "$lib/stores/components/Header.svelte"
  import Help from "$lib/stores/components/Help.svelte"
  import ImageForm from "$lib/stores/components/ImageForm.svelte"

  import { help } from "$lib/stores/help_store"
</script>

<Header />

{#if $help}
  <Help />
{:else}
  <ImageForm />
{/if}
