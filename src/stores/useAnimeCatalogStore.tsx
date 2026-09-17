import { API_TRENDING_ANIME } from "@/global/constants";
import { initialSectionState } from "@/global/data";
import type { IAnimeCatalogStore } from "@/global/interfaces";
import { getAnimes } from "@/services";
import { create } from "zustand";

export const useAnimeCatalogStore = create<IAnimeCatalogStore>((set, get) => ({
	animes: { ...initialSectionState },
	trending: { ...initialSectionState },
	fetchAnimes: async () => {
		set((state) => ({
			animes: { ...state.animes, isLoading: true, error: null },
		}));
		try {
			const response = await getAnimes();
			set((state) => ({
				animes: {
					...state.animes,
					data: response?.data || [],
					nextPageUrl: response?.links?.next || null,
					isLoading: false,
				},
			}));
		} catch (error) {
			set((state) => ({
				animes: {
					...state.animes,
					error: error instanceof Error ? error.message : "Unexpected error",
					isLoading: false,
				},
			}));
		}
	},
	fetchAnimesNextPage: async () => {
		const { data, nextPageUrl, isLoadingMore, isLoading } = get().animes;
		if (data.length === 0 || !nextPageUrl || isLoadingMore || isLoading) return;

		set((state) => ({ animes: { ...state.animes, isLoadingMore: true } }));

		try {
			const response = await getAnimes(nextPageUrl);
			set((state) => ({
				animes: {
					...state.animes,
					data: response
						? [...state.animes.data, ...response.data]
						: state.animes.data,
					nextPageUrl: response?.links?.next || null,
					isLoadingMore: false,
				},
			}));
		} catch (error) {
			set((state) => ({
				animes: {
					...state.animes,
					error:
						error instanceof Error ? error.message : "Error loading more pages",
					isLoadingMore: false, // <-- Bug corregido aquí
				},
			}));
		}
	},
	fetchTrending: async () => {
		set((state) => ({
			trending: { ...state.trending, isLoading: true, error: null },
		}));
		try {
			const response = await getAnimes(API_TRENDING_ANIME);
			set((state) => ({
				trending: {
					...state.trending,
					data: response?.data || [],
					nextPageUrl: response?.links?.next || null,
					isLoading: false,
				},
			}));
		} catch (error) {
			set((state) => ({
				trending: {
					...state.trending,
					error: error instanceof Error ? error.message : "Unexpected error",
					isLoading: false,
				},
			}));
		}
	},
	fetchTrendingNextPage: async () => {
		const { data, nextPageUrl, isLoadingMore, isLoading } = get().trending;
		if (data.length === 0 || !nextPageUrl || isLoadingMore || isLoading) return;

		set((state) => ({
			trending: { ...state.trending, isLoadingMore: true },
		}));

		try {
			const response = await getAnimes(nextPageUrl);
			set((state) => ({
				trending: {
					...state.trending,
					data: response
						? [...state.trending.data, ...response.data]
						: state.trending.data,
					nextPageUrl: response?.links?.next || null,
					isLoadingMore: false,
				},
			}));
		} catch (error) {
			set((state) => ({
				trending: {
					...state.trending,
					error:
						error instanceof Error ? error.message : "Error loading more pages",
					isLoadingMore: false, // <-- Bug corregido aquí
				},
			}));
		}
	},
}));
