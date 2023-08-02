<script lang="ts">
  import RfButtonList from "./generic/rf-button-list.svelte";
  import { GeneratorButtonStore } from "$lib/stores/generator-button-store";
</script>

<div class="buttons-container">
  <RfButtonList
    title="Generators"
    columns={2}
    buttonStore={$GeneratorButtonStore}
    on:click={(event) => GeneratorButtonStore.use(event.detail.name)}>
  </RfButtonList>
</div>