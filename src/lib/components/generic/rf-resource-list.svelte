<script lang="ts">
  import type { Resource } from '$lib/interfaces/resource';
  
  export let title: string;
  export let resourceStore: Map<string, Resource>;
</script>

<h3>{title}</h3>
<div class="resource-container">
  {#each resourceStore.keys() as name}
    {@const resource = resourceStore.get(name)}
    {#if resource && resource.unlocked}
      <div class="resource-line-item">
        <div class="resource-name">{ name }</div>
        <div class="resource-count">{ resourceStore.get(name)?.amount }</div>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  @import "$lib/styles/variables.scss";
  h3 {
    margin: 0;
  }

  .resource-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 1rem;
    border: 1px solid var(--accent-dark);
    gap: 1rem;

    .resource-line-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--accent);
      width: 100%;

      .resource-name {
        margin-right: 1rem;
      }

      .resource-count {
        margin-left: 1rem;
      }
    }
  }
</style>
