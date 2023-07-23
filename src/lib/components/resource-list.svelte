<script lang="ts">
  import { ResourceStore } from '$lib/stores/resource-store';

  let unlockedResources: string[];
  $: unlockedResourceKeys = Array.from($ResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);
</script>

<div class="resource-container">
  {#each unlockedResourceKeys as name}
    <div class="resource-line-item">
      <div class="resource-name">{ name }</div>
      <div class="resource-count">{ $ResourceStore.get(name)?.amount }</div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import "$lib/styles/variables.scss";
  .resource-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 1rem;
    border: 1px solid $accent;
    gap: 1rem;

    .resource-line-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $accent-light;
      width: 100%;
      cursor: default;

      .resource-name {
        margin-right: 1rem;
      }

      .resource-count {
        margin-left: 1rem;
      }
    }
  }
</style>
