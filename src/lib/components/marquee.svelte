<script lang="ts">
	import { clsx, type ClassValue } from 'clsx';
	import { twMerge } from 'tailwind-merge';

	export function cn(...inputs: ClassValue[]) {
		return twMerge(clsx(inputs));
	}

	type Direction = 'left' | 'up';
	export let direction: Direction = 'left';
	export let pauseOnHover: boolean = false;
	export let reverse: boolean = false;
	export let fade: boolean = false;
	export let innerClassName: string = '';
	export let numberOfCopies: number = 2;
</script>

<div
	class={cn(`group flex gap-[0.5rem] overflow-hidden ${$$restProps.class}`, {
		'flex-row': direction === 'left',
		'flex-col': direction !== 'left'
	})}
	style={`mask-image: ${
		fade
			? `linear-gradient(${
					direction === 'left' ? 'to right' : 'to bottom'
				}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
			: 'none'
	};
	  -webkit-mask-image: ${
			fade
				? `linear-gradient(${
						direction === 'left' ? 'to right' : 'to bottom'
					}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
				: 'none'
		};
	  `}
>
	{#each Array(numberOfCopies).fill(0) as _, i (i)}
		<div
			class={cn(
				'flex shrink-0 justify-around gap-[0.5rem] [--gap:0.5rem]',
				direction === 'left' ? 'animate-marquee-left flex-row' : 'animate-marquee-up flex-col',
				pauseOnHover && 'group-hover:[animation-play-state:paused]',
				reverse && 'direction-reverse',
				innerClassName
			)}
		>
			<slot />
		</div>
	{/each}
</div>
