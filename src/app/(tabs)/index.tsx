import {
	CardAnime,
	ListAnime,
	Loader,
	SafeAreaViewContainer,
	Title,
	TopSlider,
} from "@/components";
import { dataMainSlider } from "@/global/data";
import { useAnimeCatalogStore } from "@/stores";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";

export default function Index() {
	const {
		animes,
		trending,
		fetchAnimes,
		fetchAnimesNextPage,
		fetchTrending,
		fetchTrendingNextPage,
	} = useAnimeCatalogStore();

	useFocusEffect(
		useCallback(() => {
			fetchAnimes();
			fetchTrending();
		}, [fetchAnimes, fetchTrending]),
	);

	return (
		<SafeAreaViewContainer>
			<Title />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					gap: 20,
					paddingBottom: 100,
				}}
			>
				<TopSlider data={dataMainSlider} />
				{trending.isLoading && trending.data.length === 0 ? (
					<Loader />
				) : (
					<ListAnime
						title="En Tendencia"
						animes={trending.data}
						isLoading={trending.isLoading}
						isLoadingMore={trending.isLoadingMore}
						handlerScrollInfinite={fetchTrendingNextPage}
						renderAnimeItem={CardAnime}
					/>
				)}
				{animes.isLoading && animes.data.length === 0 ? (
					<Loader />
				) : (
					<ListAnime
						title="Popular"
						animes={animes.data}
						isLoading={animes.isLoading}
						isLoadingMore={animes.isLoadingMore}
						handlerScrollInfinite={fetchAnimesNextPage}
						renderAnimeItem={CardAnime}
					/>
				)}
			</ScrollView>
		</SafeAreaViewContainer>
	);
}
