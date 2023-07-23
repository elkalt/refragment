<script lang="ts">
  import '$lib/styles/app.scss'
  import { RobotStore } from "$lib/stores/robot-store";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($RobotStore.entries())
    .filter(([k, v]) => {
      return v.unlocked;
    })
    .map(([k, v]) => k);
</script>

<h2>Robots</h2>
<div class="button-container">
  {#each resourceButtons as name}
    <button
      on:click={() => RobotStore.use(name)}
      data-tooltip="{$RobotStore.get(name)?.description}">
      { name }
    </button>
  {/each}
</div>

<style lang="scss">

</style>