import { API_ANIME } from "@/global/constants";
import { dataKitsuFilterMap } from "@/global/data";
import type { ISearchState, IServiceAnimesResponse } from "@/global/interfaces";

export const getAnimes = async (
	query?: string,
	filters?: ISearchState["filters"],
	customUrl?: string,
): Promise<IServiceAnimesResponse | null> => {
	try {
		if (customUrl) {
			const response = await fetch(customUrl);
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			return await response.json();
		}

		const urlObj = new URL(API_ANIME);

		if (query && query.trim().length > 0) {
			urlObj.searchParams.append("filter[text]", query.trim());
		}

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value && value !== "All") {
					const kitsuParam =
						dataKitsuFilterMap[key as keyof ISearchState["filters"]];
					if (kitsuParam) {
						urlObj.searchParams.append(
							`filter[${kitsuParam}]`,
							String(value).toLowerCase(),
						);
					}
				}
			});
		}

		const response = await fetch(urlObj.toString());

		if (!response.ok) {
			throw new Error(
				`Request error: ${response.status} ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Error retrieving anime from Kitsu:", error);
		return null;
	}
};
