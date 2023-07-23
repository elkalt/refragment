<script lang="ts">
  import ResourceButtons from "./resource-buttons.svelte";
  import RobotButtons from "./robot-buttons.svelte";
</script>

<div class="buttons-container">
  <ResourceButtons />
  <RobotButtons />
</div>

<style lang="scss">
@import '$lib/styles/variables.scss';
.buttons-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>