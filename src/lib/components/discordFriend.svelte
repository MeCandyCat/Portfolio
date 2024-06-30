<script>
	import * as Popover from '$lib/components/ui/popover';

	export let profile = {
		profilePicture: 'https://via.placeholder.com/150',
		displayName: 'Username',
		username: '@username',
		aboutMe: 'About me section...',
		connections: [{ type: 'GitHub', username: 'user', url: 'https://github.com/git' }]
	};
</script>

<Popover.Root>
	<Popover.Trigger class="cursor-pointer">
		&nbsp;<slot />&nbsp;
	</Popover.Trigger>
	<Popover.Content>
		<div class="mt-2 flex flex-col items-center">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={profile.profilePicture}
				alt="Profile Picture"
				class="-mt-14 h-20 w-20 rounded-full border-2"
			/>
			<div class="mt-2 text-center">
				<div class="text-lg font-bold">{profile.displayName}</div>
				<div class="">{profile.username}</div>
				<p class="mt-2 text-sm">{profile.aboutMe}</p>
			</div>
		</div>
		<div class="mt-4">
			<h4 class="mb-2 font-semibold">Connections</h4>
			{#each profile.connections as connection}
				<div class="mb-2 flex items-center gap-2">
					<span class="font-bold">{connection.type}</span>
					<a href={connection.url} target="_blank" class="text-blue-500">{connection.username}</a>
				</div>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
