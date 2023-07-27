<script lang="ts">
	export let name: string = '';
  export let tooltip: string = '';
	export let inputs: {input: string, amount: number}[];
	export let products: {output: string, amount: number}[];
	let isHovered = false;
	let x: number;
	let y: number;
	
	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event: MouseEvent) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<div class="tooltip-button-container">
	<button
		on:focus={() => isHovered = true}
		on:mouseover={mouseOver}
		on:mouseleave={mouseLeave}
		on:mousemove={mouseMove}>
		{ name }
	</button>

	{#if isHovered}
		<div class="tooltip">
			{tooltip}
			<hr>
			<div class="recipe-container">
				<div class="recipe-column-container">
					{#each inputs as input}
						<div>{input.amount} {input.input}</div>
					{/each}
				</div>
				->
				<div class="recipe-column-container">
					{#each products as product}
						<div>{product.amount} {product.output}</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '/src/lib/styles/variables.scss';
	.tooltip-button-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.5rem;

		.tooltip {
			background-color: $background;
			border: 1px solid $accent;
			padding: 1rem;
			font-weight: 400;
			font-size: 0.9rem;

			.recipe-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				gap: 0.5rem;
				
				.recipe-column-container {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}
			}
		}
	}
</style>