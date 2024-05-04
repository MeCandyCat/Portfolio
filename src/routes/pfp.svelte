<script lang="ts">
	export let Image1: string;
	export let Image2: string;

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
	class="w-24 h-24 mb-3 rounded-full"
	alt="ProfilePicture"
/>
