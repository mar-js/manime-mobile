import type { IServiceAnimesResponse } from "@/global/interfaces";

const BASE_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/anime` || "";

export const getAnimes = async (
	url: string = BASE_URL,
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
