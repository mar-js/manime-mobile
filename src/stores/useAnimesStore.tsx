import type { IAnimesStore } from "@/global/interfaces";
import { getAnimes } from "@/services";
import { create } from "zustand";

export const useAnimesStore = create<IAnimesStore>((set, get) => ({
	animes: [],
	isLoading: false,
	isLoadingMore: false,
	error: null,
	nextPageUrl: null,
	fetchAnimes: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await getAnimes();
			set({
				animes: response?.data,
				nextPageUrl: response?.links?.next || null,
				isLoading: false,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unexpected error";
			set({ error: errorMessage, isLoading: false });
		}
	},
	fetchAnimesNextPage: async () => {
		const { nextPageUrl, isLoadingMore, isLoading, animes } = get();

		if (animes.length === 0) return;
		if (!nextPageUrl || isLoadingMore || isLoading) return;

		set({ isLoadingMore: true });

		try {
			const response = await getAnimes(nextPageUrl);
			if (response) {
				set((state) => ({
					animes: [...state.animes, ...response.data],
					nextPageUrl: response.links.next || null,
					isLoadingMore: false,
				}));
			} else {
				set(() => ({
					animes: [],
					nextPageUrl: null,
					isLoadingMore: false,
				}));
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error loading more pages";
			set({ error: errorMessage, isLoading: false });
		}
	},
}));
