<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import Open from 'lucide-svelte/icons/square-arrow-out-up-right';
</script>

<div class="flex justify-center items-center my-5">
	<Card.Root class="w-[350px] overflow-hidden">
		<img src="https://i.imgur.com/3Fz3FGO.png" class="w-full" alt="Github Banner" />
		<div class="flex flex-col items-center py-5">
			<img
				src="https://avatars.githubusercontent.com/u/116643898?v=4"
				alt="GithubProfile"
				class="w-24 h-24 mb-3 rounded-full"
			/>
			<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white col-span-4">Candy Cat</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400">@mecandycat</span>

			<div class="flex mt-4 md:mt-6">
				<Button href="https://github.com/MeCandyCat/" target="_blank"
					><Open class="mr-2 h-4 w-4" />Github</Button
				>
			</div>
		</div>
		<div class="bg-sky-600 w-full h-5 blur-xl opacity-50" />
	</Card.Root>
</div>
