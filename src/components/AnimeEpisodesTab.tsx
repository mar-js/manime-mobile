import type { IAnimeEpisodesTab } from "@/global/interfaces";
import { useAnimeCatalogStore } from "@/stores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { CardAnimeEpisode } from "./CardAnimeEpisode";

export const AnimeEpisodesTab = ({ animeId }: IAnimeEpisodesTab) => {
	const episodes = useAnimeCatalogStore((state) => state.episodes);
	const fetchEpisodes = useAnimeCatalogStore((state) => state.fetchEpisodes);
	const fetchEpisodesNextPage = useAnimeCatalogStore(
		(state) => state.fetchEpisodesNextPage,
	);

	useEffect(() => {
		if (animeId) {
			fetchEpisodes(animeId);
		}
	}, [animeId, fetchEpisodes]);

	return (
		<>
			{episodes.isLoading ? (
				<View className="py-10 justify-center items-center">
					<ActivityIndicator size="large" color="#ffdc5e" />
				</View>
			) : (
				<FlatList
					data={episodes.data}
					keyExtractor={(item, index) => `${item.id}-${index}`}
					renderItem={({ item }) => <CardAnimeEpisode {...item} />}
					scrollEnabled={false}
					contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
					onEndReached={() => fetchEpisodesNextPage(animeId)}
					onEndReachedThreshold={0.3}
					ListFooterComponent={
						episodes.isLoadingMore ? (
							<View className="py-4 justify-center items-center">
								<ActivityIndicator size="small" color="#ffdc5e" />
							</View>
						) : null
					}
					ListEmptyComponent={
						<View className="py-10 justify-center items-center">
							<Ionicons name="film-outline" size={40} color="#ffdc5e" />
							<Text className="text-zinc-400 mt-2 text-sm">
								No se encontraron episodios.
							</Text>
						</View>
					}
				/>
			)}
		</>
	);
};
