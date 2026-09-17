import {
	ListAnime,
	SafeAreaViewContainer,
	Title,
	TopSlider,
} from "@/components";
import { dataMainSlider } from "@/global/data";
import { useAnimeCatalogStore } from "@/stores";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, ScrollView } from "react-native";

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
				{trending.isLoading ? (
					<ActivityIndicator size="large" color="#ffdc5e" className="my-10" />
				) : (
					<ListAnime
						title="En Tendencia"
						animes={trending.data}
						isLoading={trending.isLoadingMore}
						handlerScrollInfinite={fetchTrendingNextPage}
					/>
				)}
				{animes.isLoading ? (
					<ActivityIndicator size="large" color="#ffdc5e" className="my-10" />
				) : (
					<ListAnime
						title="Popular"
						animes={animes.data}
						isLoading={animes.isLoadingMore}
						handlerScrollInfinite={fetchAnimesNextPage}
					/>
				)}
			</ScrollView>
		</SafeAreaViewContainer>
	);
}
