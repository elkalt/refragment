<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let name: string;
  export let tooltip: string;
	export let inputs: {input: string, amount: number}[];
	export let products: {output: string, amount: number}[];
	export let sustain: {interval: number, totalTime: number} | undefined = undefined;
	export let disabled: boolean;

	let dispatch = createEventDispatcher();

	let isHovered = false;
	let tooltipX: number;
	let tooltipY: number;
	let width: number = 0;

	function mouseOver(event: MouseEvent) {
		let button = event.target as HTMLButtonElement;
		let buttonRect = button.getBoundingClientRect();

		tooltipX = buttonRect.left;
		tooltipY = buttonRect.top + (buttonRect.height * 1.2);
		isHovered = true;
	}

	function mouseLeave() {
		isHovered = false;
	}

	async function handleClick() {
		await new Promise<void>(resolve => { 
			dispatch("click");
			resolve();
		});

		if (disabled) {
			let timeout: number = -1;
			inputs.forEach(input => {
				if (input.input === "Time") {
					timeout = input.amount;
					return;
				}
			});

			if (timeout !== -1) {
				let startTime = Date.now();
				let interval = setInterval(() => {
					width  = 100 - ((Date.now() - startTime) / (timeout * 1000)) * 100;

					if (width <= 0) {
						width = 0;
						clearInterval(interval);
					}
				}, 10);
			}
		}
	}
</script>

<div
	role="tooltip"
	on:focus={() => isHovered = true}
	on:mouseover={mouseOver}
	on:mouseleave={mouseLeave}
	class="tooltip-button-container">
	<button
		on:click={() => handleClick()}
		disabled={disabled}>
		{name}
	</button>
	<div style="width: {width}%" class="progress-bar"></div>
</div>

{#if isHovered}
	<div style="top: {tooltipY}px; left: {tooltipX}px;" class="tooltip-container">
		<div class="tooltip">
			{tooltip}
			<hr>
			<div class="recipe-container">
				<div class="recipe-column-container input">
					{#each inputs as input}
						<div>{input.amount} {input.input}</div>
					{/each}
				</div>
				<div class="recipe-column-container">
					<div>-></div>
					{#if sustain}
						<div class="sustain">/{sustain.interval}s</div>
						<div class="sustain">{sustain.totalTime}s</div>
					{/if}
				</div>
				<div class="recipe-column-container output">
					{#each products as product}
						<div>{product.output} {product.amount}</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '/src/lib/styles/variables.scss';
	.progress-bar {
		height: 0.2rem;
		background-color: $accent;
	}

	.tooltip-container {
		position: absolute;
		background-color: $background;
		border: 1px solid $accent;
		font-weight: 400;
		font-size: 0.9rem;

		.tooltip {
			padding: 1rem;

			.recipe-container {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				justify-content: space-between;
				gap: 0.5rem;
				

				.recipe-column-container {
					display: flex;
					flex-direction: column;
					text-align: center;

					.sustain {
						font-size: 0.7rem;
					}
				}

				.input {
					gap: 0.5rem;
					text-align: left;
				}

				.output {
					gap: 0.5rem;
					text-align: right;
				}
			}
		}
	}
</style>