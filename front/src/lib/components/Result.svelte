<script lang="ts">
  import { data, loading, error } from "$lib/stores/api_store"
</script>

<div class="mt-3">
  {#if $loading}
    <div class="spinner-border text-primary" role="status" />
    <p class="fst-italic fw-light">Waiting for server response...</p>
  {:else if $error}
    <p class="text-danger">
      {$error.message}
    </p>
  {:else if $data?.arrayEmotion && $data.arrayEmotion.length > 0}
    <p class="fw-bold">
      {$data.idToNames[$data.guessEmotion]}
      ({$data.arrayEmotion[$data.guessEmotion]})
    </p>
    <ul class="list-group mx-auto col-12 col-md-6">
      {#each $data.arrayEmotion as num, i}
        {#if i !== $data.guessEmotion}
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {$data.idToNames[i]}
            <span class="badge bg-primary rounded-pill">{num}</span>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>
