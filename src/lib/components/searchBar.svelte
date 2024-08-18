<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	export let onSearch: (query: string) => void;
</script>

<div class="relative">
	<Search
		class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
	/>
	<Input
		type="search"
		placeholder="Search posts..."
		class="pl-8"
		on:input={(e) => onSearch(e.currentTarget.value)}
	/>
</div>
