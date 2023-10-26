<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { TickManager } from "$lib/stores/tick-manager";

	export let name: string;
  export let tooltip: string;
	export let inputs: {input: string, amount: number}[];
	export let products: {output: string, amount: number}[];
	export let sustain: {interval: number, totalTime: number} | undefined = undefined;
	export let cooldown: number = 0;
	export let disabled: boolean;

	let isHovered = false;
	let button: HTMLDivElement;
	let buttonRect: DOMRect;
	let tooltipHeight: number;

	// TODO: for some screen widths, the tootlip width is off by 0.5px
	// The progress dimensions can't be calculated directly in the style bindings because the buttonRect can be undefined
	let progressHeight: number;
	let progressTop: number;
	let progressLeft: number;
	$: {
		if (buttonRect) {
			progressHeight = isHovered ? buttonRect.height + tooltipHeight : buttonRect.height;
			progressTop = buttonRect.top;
			progressLeft = buttonRect.left;
		}
	}

	onMount(() => {
		buttonRect = button.getBoundingClientRect();
		window.addEventListener("resize", () => {
			if (button) buttonRect = button.getBoundingClientRect();
		});
	});

	let dispatch = createEventDispatcher();

	let timeCost = inputs.find(i => i.input === "Time")?.amount;
	let progressWidth: number;
	$: {
		if (!buttonRect || !buttonRect.width) {
			progressWidth = 0;
		} else if (cooldown && timeCost) {
			progressWidth = (cooldown / timeCost) * buttonRect.width;
		} else {
			progressWidth = 0;
		}
	};
</script>

<div>
	<div bind:this={button}>
		<div
			role="tooltip"
			on:focus={() => isHovered = true}
			on:mouseover={() => isHovered = true}
			on:mouseleave={() => isHovered = false}> 
			<button
				style:background-color="{disabled ? 'var(--background-dark)' : (!disabled && isHovered ? 'var(--background-light)' : '')}"
				style:color="{disabled ? 'var(--accent-dark)' : ''}"
				style:border-bottom="{isHovered ? disabled ? '1px solid var(--background-dark)' : '1px solid var(--background-light)' : ''}"
				on:click={() => disabled ? "" : dispatch("click")}>
				{name}
			</button>
		</div>
	</div>
	<div
		style:width="{progressWidth}px"
		style:top="{progressTop}px"
		style:left="{progressLeft}px"
		style:height="{progressHeight}px"
		class="progress-bar">
	</div>
</div>

{#if isHovered}
	<div
		class="tooltip-container"
		style:background-color="{disabled ? 'var(--background-dark)' : 'var(--background-light)'}"
		style:top="{buttonRect.top + buttonRect.height - 1}px"
		style:left="{buttonRect.left}px"
		style:width="{buttonRect.width - 1.5}px"
		bind:clientHeight={tooltipHeight}>
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
		position: absolute;
		opacity: 0.5;
		background-color: var(--accent);
		pointer-events: none;
		z-index: 1;
	}

	.tooltip-container {
		position: absolute;
		border: 1px solid var(--accent);
		border-top: 0;
		font-weight: 400;
		font-size: 0.9rem;
		z-index: 0;

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