<script lang="ts">
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);
</script>

<h2>Actions</h2>
<div class="button-container">
  {#each resourceButtons as name}
    <button
      on:click={() => ManualResourceStore.use(name)}
      data-tooltip="{$ManualResourceStore.get(name)?.description}">
      { name }
    </button>
  {/each}
</div>