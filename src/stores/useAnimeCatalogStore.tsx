import { API_TRENDING_ANIME } from "@/global/constants";
import { initialFavoriteState, initialSectionState } from "@/global/data";
import type { AnimeItem, IAnimeCatalogStore } from "@/global/interfaces";
import { getAnimeEpisodes, getAnimes } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAnimeCatalogStore = create<IAnimeCatalogStore>()(
	persist(
		(set, get) => ({
			animes: { ...initialSectionState },
			trending: { ...initialSectionState },
			favorites: { ...initialFavoriteState },
			episodes: { ...initialSectionState },
			fetchAnimes: async (query?, filters?) => {
				set((state) => ({
					animes: { ...state.animes, isLoading: true, error: null },
				}));
				try {
					const response = await getAnimes(query, filters);
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
							error:
								error instanceof Error ? error.message : "Unexpected error",
							isLoading: false,
						},
					}));
				}
			},
			fetchAnimesNextPage: async () => {
				const { data, nextPageUrl, isLoadingMore, isLoading } = get().animes;
				if (data.length === 0 || !nextPageUrl || isLoadingMore || isLoading)
					return;

				set((state) => ({ animes: { ...state.animes, isLoadingMore: true } }));

				try {
					const response = await getAnimes(undefined, undefined, nextPageUrl);
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
								error instanceof Error
									? error.message
									: "Error loading more pages",
							isLoadingMore: false,
						},
					}));
				}
			},
			fetchTrending: async () => {
				set((state) => ({
					trending: { ...state.trending, isLoading: true, error: null },
				}));
				try {
					const response = await getAnimes(
						undefined,
						undefined,
						API_TRENDING_ANIME,
					);
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
							error:
								error instanceof Error ? error.message : "Unexpected error",
							isLoading: false,
						},
					}));
				}
			},
			fetchTrendingNextPage: async () => {
				const { data, nextPageUrl, isLoadingMore, isLoading } = get().trending;
				if (data.length === 0 || !nextPageUrl || isLoadingMore || isLoading)
					return;

				set((state) => ({
					trending: { ...state.trending, isLoadingMore: true },
				}));

				try {
					const response = await getAnimes(undefined, undefined, nextPageUrl);
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
								error instanceof Error
									? error.message
									: "Error loading more pages",
							isLoadingMore: false,
						},
					}));
				}
			},
			fetchEpisodes: async (animeId: string) => {
				set((state) => ({
					episodes: {
						...state.episodes,
						isLoading: true,
						error: null,
						data: [],
					},
				}));
				try {
					const response = await getAnimeEpisodes(animeId);
					set((state) => ({
						episodes: {
							...state.episodes,
							data: response?.data || [],
							nextPageUrl: response?.links?.next || null,
							isLoading: false,
						},
					}));
				} catch (error) {
					set((state) => ({
						episodes: {
							...state.episodes,
							error:
								error instanceof Error ? error.message : "Unexpected error",
							isLoading: false,
						},
					}));
				}
			},
			fetchEpisodesNextPage: async (animeId: string) => {
				const { data, nextPageUrl, isLoadingMore, isLoading } = get().episodes;
				if (data.length === 0 || !nextPageUrl || isLoadingMore || isLoading)
					return;

				set((state) => ({
					episodes: { ...state.episodes, isLoadingMore: true },
				}));

				try {
					const response = await getAnimeEpisodes(animeId, nextPageUrl);
					set((state) => ({
						episodes: {
							...state.episodes,
							data: response
								? [...state.episodes.data, ...response.data]
								: state.episodes.data,
							nextPageUrl: response?.links?.next || null,
							isLoadingMore: false,
						},
					}));
				} catch (error) {
					set((state) => ({
						episodes: {
							...state.episodes,
							error:
								error instanceof Error
									? error.message
									: "Error loading more episodes",
							isLoadingMore: false,
						},
					}));
				}
			},
			setFavoriteAnime: (anime: AnimeItem) => {
				set((state) => {
					const isAlreadyFavorite = state.favorites.data.some(
						(favAnime) => favAnime.id === anime.id,
					);

					if (isAlreadyFavorite) {
						return {
							favorites: {
								...state.favorites,
								data: state.favorites.data.filter(
									(favAnime) => favAnime.id !== anime.id,
								),
							},
						};
					} else {
						return {
							favorites: {
								...state.favorites,
								data: [...state.favorites.data, anime],
							},
						};
					}
				});
			},
			isSavedAsFavorite: (animeId: string) => {
				const { favorites } = get();
				return favorites.data.some((favAnime) => favAnime.id === animeId);
			},
			getAnimeByIdLocal: (
				id: string,
				favoriteAnimes: AnimeItem[] = [],
			): AnimeItem | null => {
				const { animes, trending } = get();

				const foundInAnimes = animes.data.find((item) => item.id === id);
				if (foundInAnimes) return foundInAnimes;

				const foundInTrending = trending.data.find((item) => item.id === id);
				if (foundInTrending) return foundInTrending;

				const foundInFavorites = favoriteAnimes.find((item) => item.id === id);
				if (foundInFavorites) return foundInFavorites;

				return null;
			},
		}),
		{
			name: "anime-catalog-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				animes: state.animes,
				trending: state.trending,
				favorites: state.favorites,
			}),
		},
	),
);
