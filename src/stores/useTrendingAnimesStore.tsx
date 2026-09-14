import type { ITrendingAnimesStore } from "@/global/interfaces";
import { getAnimes } from "@/services";
import { create } from "zustand";

export const useTrendingAnimesStore = create<ITrendingAnimesStore>(
	(set, get) => ({
		trendingAnimes: [],
		isTrendingAnimesLoading: false,
		isTrendingAnimesLoadingMore: false,
		error: null,
		nextPageUrl: null,
		fetchTrendingAnimes: async () => {
			set({ isTrendingAnimesLoading: true, error: null });
			try {
				const response = await getAnimes();
				set({
					trendingAnimes: response?.data,
					nextPageUrl: response?.links?.next || null,
					isTrendingAnimesLoading: false,
				});
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unexpected error";
				set({ error: errorMessage, isTrendingAnimesLoading: false });
			}
		},
		fetchTrendingAnimesNextPage: async () => {
			const {
				nextPageUrl,
				isTrendingAnimesLoadingMore,
				isTrendingAnimesLoading,
				trendingAnimes,
			} = get();

			if (trendingAnimes.length === 0) return;
			if (
				!nextPageUrl ||
				isTrendingAnimesLoadingMore ||
				isTrendingAnimesLoading
			)
				return;

			set({ isTrendingAnimesLoadingMore: true });

			try {
				const response = await getAnimes(nextPageUrl);
				if (response) {
					set((state) => ({
						trendingAnimes: [...state.trendingAnimes, ...response.data],
						nextPageUrl: response.links.next || null,
						isTrendingAnimesLoadingMore: false,
					}));
				} else {
					set(() => ({
						trendingAnimes: [],
						nextPageUrl: null,
						isTrendingAnimesLoadingMore: false,
					}));
				}
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Error loading more pages";
				set({ error: errorMessage, isTrendingAnimesLoading: false });
			}
		},
	}),
);
