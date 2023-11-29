<script lang="ts">
  import { currentStateAsB64, B64ToCurrentState } from "$lib/scripts/save-parser";

  let exportText = "Export Save";

  async function exportSave() {
    await navigator.clipboard.writeText(await currentStateAsB64());

    exportText = "Copied to clipboard!";
    setTimeout(() => {
      exportText = "Export Save";
    }, 2000);
  }

  function importSave() {
    let base64String = window.prompt('Please enter your save data:');
    if (base64String) B64ToCurrentState(base64String);
  }
</script>

<h2>Saves</h2>
<div class="saves-container">
  <button on:click={() => exportSave()}>{ exportText }</button>
  <button on:click={() => importSave()}>Import Save</button>
</div>

<style lang="scss">
@import '$lib/styles/variables.scss';
button {
  padding: 1rem;
}

.saves-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}
</style>