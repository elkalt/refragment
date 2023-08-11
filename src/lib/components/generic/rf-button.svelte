<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { TickManager } from "$lib/stores/tick-manager";

	export let name: string;
  export let tooltip: string;
	export let inputs: {input: string, amount: number}[];
	export let products: {output: string, amount: number}[];
	export let sustain: {interval: number, totalTime: number} | undefined = undefined;
	export let cooldown: number = 0;
	export let disabled: boolean;

	let isHovered = false;
	let tooltipX: number;
	let tooltipY: number;
	let tooltipWidth: number;

	let dispatch = createEventDispatcher();

	let timeCost = inputs.find(i => i.input === "Time")?.amount;
	let progressWidth: number;
	$: {
		if (cooldown && timeCost) {
			progressWidth = (cooldown / timeCost * 100);
		} else {
			progressWidth = 0;
		}
	};

	function mouseOver(event: MouseEvent) {
		let button = event.target as HTMLButtonElement;
		let buttonRect = button.getBoundingClientRect();

		tooltipX = buttonRect.left;
		tooltipY = buttonRect.top + (buttonRect.height * 1);
		// -2 to the width to account for border
		tooltipWidth = buttonRect.width - 2;
		isHovered = true;
	}

	function mouseLeave() {
		isHovered = false;
	}

	function handleClick() {
		if (disabled) {
			return;
		}
		dispatch("click");
	}
</script>

<div>
	<div
		role="tooltip"
		on:focus={() => isHovered = true}
		on:mouseover={mouseOver}
		on:mouseleave={mouseLeave}> 
		<button
			style:background-color="{disabled ? 'var(--background-dark)' : (!disabled && isHovered ? 'var(--background-light)' : '')}"
			style:color="{disabled ? 'var(--accent-dark)' : ''}"
			style:border-bottom="{isHovered ? disabled ? '1px solid var(--background-dark)' : '1px solid var(--background-light)' : ''}"
			on:click={() => handleClick()}>
			{name}
		</button>
	</div>
	<div style:width="{progressWidth}%" class="progress-bar"></div>
</div>

{#if isHovered}
	<div
		class="tooltip-container"
		style:background-color="{disabled ? 'var(--background-dark)' : 'var(--background-light)'}"
		style:top="{tooltipY}px"
		style:left="{tooltipX}px"
		style:width="{tooltipWidth}px">
		<div class="tooltip">
			{tooltip}
			<hr>
			<div class="recipe-container">
				<div class="recipe-column-container input">
					{#each inputs as input}
						{#if input.input === "Time"}
							<div>{TickManager.convertTicksToSeconds(input.amount)}s</div>
						{:else}
							<div>{input.amount} {input.input}</div>
						{/if}
					{/each}
				</div>
				<div class="recipe-column-container">
					<div>-></div>
					{#if sustain}
						<div class="sustain">/{TickManager.convertTicksToSeconds(sustain.interval)}s</div>
						<div class="sustain">{TickManager.convertTicksToSeconds(sustain.totalTime)}s</div>
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
		background-color: var(--accent);
	}

	.tooltip-container {
		position: absolute;
		border: 1px solid var(--accent);
		border-top: 0;
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