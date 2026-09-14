import type { IAnimesStore } from "@/global/interfaces";
import { getAnimes } from "@/services";
import { create } from "zustand";

export const useAnimesStore = create<IAnimesStore>((set, get) => ({
	animes: [],
	isAnimesLoading: false,
	isAnimesLoadingMore: false,
	error: null,
	nextPageUrl: null,
	fetchAnimes: async () => {
		set({ isAnimesLoading: true, error: null });
		try {
			const response = await getAnimes();
			set({
				animes: response?.data,
				nextPageUrl: response?.links?.next || null,
				isAnimesLoading: false,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unexpected error";
			set({ error: errorMessage, isAnimesLoading: false });
		}
	},
	fetchAnimesNextPage: async () => {
		const { nextPageUrl, isAnimesLoadingMore, isAnimesLoading, animes } = get();

		if (animes.length === 0) return;
		if (!nextPageUrl || isAnimesLoadingMore || isAnimesLoading) return;

		set({ isAnimesLoadingMore: true });

		try {
			const response = await getAnimes(nextPageUrl);
			if (response) {
				set((state) => ({
					animes: [...state.animes, ...response.data],
					nextPageUrl: response.links.next || null,
					isAnimesLoadingMore: false,
				}));
			} else {
				set(() => ({
					animes: [],
					nextPageUrl: null,
					isAnimesLoadingMore: false,
				}));
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error loading more pages";
			set({ error: errorMessage, isAnimesLoading: false });
		}
	},
}));
