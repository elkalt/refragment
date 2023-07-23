<script lang="ts">
  import '$lib/styles/app.scss'
  import ResourceButtons from '$lib/components/resource-buttons.svelte';
  import ResourceList from '$lib/components/resource-list.svelte';
</script>

<div class='content-container'>
  <div class="resources"><ResourceList /></div>
  <div class="buttons"><ResourceButtons /></div>
</div>

<style lang="scss">
.content-container {
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.5fr 1fr 0.25fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  .resources { grid-area: 1 / 1 / 6 / 2; }
  .buttons { grid-area: 1 / 3 / 2 / 4; }
  .automators { grid-area: 1 / 4 / 2 / 5; }
  .upgrades { grid-area: 1 / 6 / 3 / 7; }
  .somethingRightSide { grid-area: 2 / 3 / 3 / 5; }
}
</style>