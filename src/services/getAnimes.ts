import { API_ANIME } from "@/global/constants";
import type { IServiceAnimesResponse } from "@/global/interfaces";

export const getAnimes = async (
	url: string = API_ANIME,
): Promise<IServiceAnimesResponse | null> => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Request error: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error retrieving anime:", error);
		return null;
	}
};
