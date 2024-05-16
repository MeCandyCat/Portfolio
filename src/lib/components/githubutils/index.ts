interface RepositoryDetails {
	name: string;
	description: string;
	language: string;
	stars: number;
	lastUpdatedDate: string;
}

export async function getRepositoryDetails(
	username: string,
	repositoryName: string
): Promise<RepositoryDetails> {
	try {
		const response = await fetch(`https://api.githubX.com/repos/${username}/${repositoryName}`);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch repository details: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const repositoryDetails: RepositoryDetails = {
			name: data.name,
			description: data.description || 'No description provided',
			language: data.language || 'Unknown',
			stars: data.stargazers_count || 0,
			lastUpdatedDate: data.updated_at // ISO 8601 format
		};

		return repositoryDetails;
	} catch (error) {
		console.error('Error fetching repository details:', error);
		throw error;
	}
}
