import type { IServiceAnimeEpisodesResponse } from "@/global/interfaces";

export const getAnimeEpisodes = async (
	animeId: string,
	customUrl?: string,
): Promise<IServiceAnimeEpisodesResponse | null> => {
	try {
		const url =
			customUrl ||
			`https://kitsu.app/api/edge/episodes?filter[mediaType]=Anime&filter[media_id]=${animeId}&sort=number`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error retrieving episodes from Kitsu:", error);
		return null;
	}
};
