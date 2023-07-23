<script lang="ts">
  import type { Resource } from "$lib/interfaces/resource";
  import { Resources } from '$lib/stores/resources';

  let unlockedResources: string[];
  $: unlockedResourceKeys = Array.from($Resources.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);
</script>

<div class="resource-container">
  {#each unlockedResourceKeys as name}
    <div class="resource-line-item">
      <div class="resource-name">{ name }</div>
      <div class="resource-count">{ $Resources.get(name)?.amount }</div>
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
    padding-bottom: 0;
    border: 1px solid $accent;

    .resource-line-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $accent-light;
      width: 100%;
      cursor: default;
      margin-bottom: 1rem;

      .resource-name {
        margin-right: 1rem;
      }

      .resource-count {
        margin-left: 1rem;
      }
    }
  }
</style>
