<script lang="ts">
  import { Resources } from "$lib/definitions/resources";

  $: unlockedResources = Resources.filter((resource) => resource.unlocked);
</script>

<div class='content-container'>
  <div class="resource-container">
    {#each unlockedResources as resource}
      <div class="resource-line-item">
        <div class="resource-name">{ resource.name }</div>
        <div class="resource-count">{ resource.amount }</div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
.resource-container {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 0;
  border: 1px solid #525252;

  .resource-line-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #3d3d3d;
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
