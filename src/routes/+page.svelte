<script lang="ts">
  import '$lib/app.css'
  import ResourceList from '$lib/components/resource-list.svelte';
</script>

<div class='content-container'>
  <ResourceList />
</div>

<style>
.content-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>