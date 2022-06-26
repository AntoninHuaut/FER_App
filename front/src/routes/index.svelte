<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast"

  import Header from "$lib/components/Header.svelte"
  import Help from "$lib/components/Help.svelte"
  import Result from "$lib/components/Result.svelte"
  import TypeSelector from "$lib/components/TypeSelector.svelte"

  import { help } from "$lib/stores/preference_store"
</script>

<Header />

{#if $help}
  <Help />
{:else}
  <TypeSelector />
{/if}

<Result />

<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastWidth: 25rem;
    --toastContainerLeft: calc(50vw - 12.5rem);
    --toastBackground: #f56565;
    --toastBarBackground: #c53030;
    --toastColor: "black";
  }

  #imgPreview {
    max-height: 512px;
  }
</style>
