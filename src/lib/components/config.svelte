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

<h2>Settings</h2>
<input type="range" min="0" max="500">

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

input {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--accent);
  border-radius: 0.5rem;
  background-color: var(--background);
  color: var(--text);
  font-size: 1.1rem;
  font-family: var(--font);
  outline: none;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--accent-light);
  }
}
</style>