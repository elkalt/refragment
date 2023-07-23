<script lang="ts">
  import '$lib/styles/app.scss'
  import ResourceButtons from '$lib/components/resource-buttons.svelte';
  import ResourceList from '$lib/components/resource-list.svelte';
</script>

<div class='content-container'>
  <ResourceList />
  <ResourceButtons />
</div>

<style>
.content-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>