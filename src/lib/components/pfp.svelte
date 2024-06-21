<script lang="ts">
	export let Image1: string;
	export let Image2: string;
	export let customStyle: string = '';

	let isHovered = false;

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}
</script>

<img
	src={isHovered ? Image2 : Image1}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class={`z-10 h-24 w-24 rounded-full ${customStyle}`}
	alt="Profile"
/>
