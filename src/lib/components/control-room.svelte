<script lang="ts">
  import { ResourcesButtonStore } from "$lib/stores/resources-button-store";
  import { RobotButtonStore } from "$lib/stores/robot-button-store";
  import RfButtonList from "./generic/rf-button-list.svelte";
</script>

<div class="buttons-container">
  <RfButtonList
    title="Actions"
    columns={2}
    buttonStore={$ResourcesButtonStore}
    on:click={(event) => ResourcesButtonStore.use(event.detail.name)}>
  </RfButtonList>
  <RfButtonList
    title="Robots"
    columns={2}
    buttonStore={$RobotButtonStore}
    on:click={(event) => RobotButtonStore.use(event.detail.name)}>
  </RfButtonList>
</div>