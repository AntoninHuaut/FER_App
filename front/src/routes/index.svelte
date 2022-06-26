<script lang="ts">
  import "../app.css"
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
