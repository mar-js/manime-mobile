import type { ITrendingAnimesStore } from "@/global/interfaces";
import { getAnimes } from "@/services";
import { create } from "zustand";

export const useTrendingAnimesStore = create<ITrendingAnimesStore>(
	(set, get) => ({
		trendingAnimes: [],
		isLoading: false,
		isLoadingMore: false,
		error: null,
		nextPageUrl: null,
		fetchTrendingAnimes: async () => {
			set({ isLoading: true, error: null });
			try {
				const response = await getAnimes();
				set({
					trendingAnimes: response?.data,
					nextPageUrl: response?.links?.next || null,
					isLoading: false,
				});
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unexpected error";
				set({ error: errorMessage, isLoading: false });
			}
		},
		fetchTrendingAnimesNextPage: async () => {
			const { nextPageUrl, isLoadingMore, isLoading, trendingAnimes } = get();

			if (trendingAnimes.length === 0) return;
			if (!nextPageUrl || isLoadingMore || isLoading) return;

			set({ isLoadingMore: true });

			try {
				const response = await getAnimes(nextPageUrl);
				if (response) {
					set((state) => ({
						trendingAnimes: [...state.trendingAnimes, ...response.data],
						nextPageUrl: response.links.next || null,
						isLoadingMore: false,
					}));
				} else {
					set(() => ({
						trendingAnimes: [],
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
	}),
);
