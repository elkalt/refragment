<script lang="ts">
  import { ResourceButtonStore } from "$lib/stores/resource-button-store";
  import { RobotButtonStore } from "$lib/stores/robot-button-store";
  import RfButtonList from "./generic/rf-button-list.svelte";
</script>

<div class="buttons-container">
  <RfButtonList
    title="Actions"
    columns={2}
    buttonStore={$ResourceButtonStore}
    on:click={(event) => ResourceButtonStore.use(event.detail.name)}>
  </RfButtonList>
  <RfButtonList
    title="Robots"
    columns={2}
    buttonStore={$RobotButtonStore}
    on:click={(event) => RobotButtonStore.use(event.detail.name)}>
  </RfButtonList>
</div>