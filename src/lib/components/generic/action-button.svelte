<script lang="ts">
	export let name: string = '';
  export let tooltip: string = '';
	export let inputs: {input: string, amount: number}[];
	export let products: {output: string, amount: number}[];
	let isHovered = false;
	let x: number;
	let y: number;
	let width: number;
	
	function mouseOver(event: MouseEvent) {
		let button = event.target as HTMLButtonElement;
		let buttonRect = button.getBoundingClientRect();

		width = buttonRect.width;
		x = buttonRect.left;
		y = buttonRect.top + (buttonRect.height * 1.2);
		isHovered = true;
	}
	function mouseLeave(event: MouseEvent) {
		isHovered = false;
	}
</script>

<button
	on:click
	on:focus={() => isHovered = true}
	on:mouseover={mouseOver}
	on:mouseleave={mouseLeave}>
	{ name }
</button>

{#if isHovered}
	<div style="top: {y}px; left: {x}px; width: {width}px;" class="tooltip-container">
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
	</div>
{/if}

<style lang="scss">
	@import '/src/lib/styles/variables.scss';
	.tooltip-container {
		position: absolute;
		background-color: $background;
		border: 1px solid $accent;
		font-weight: 400;
		font-size: 0.9rem;

		.tooltip {
			padding: 1rem;

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