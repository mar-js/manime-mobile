import {
	ListAnime,
	SafeAreaViewContainer,
	Title,
	TopSlider,
} from "@/components";
import { dataMainSlider } from "@/global/data";
import { useAnimesStore, useTrendingAnimesStore } from "@/stores";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, ScrollView } from "react-native";

export default function Index() {
	const {
		animes,
		isAnimesLoading,
		isAnimesLoadingMore,
		fetchAnimes,
		fetchAnimesNextPage,
	} = useAnimesStore();
	const {
		trendingAnimes,
		isTrendingAnimesLoading,
		isTrendingAnimesLoadingMore,
		fetchTrendingAnimes,
		fetchTrendingAnimesNextPage,
	} = useTrendingAnimesStore();

	const handlerFetchAnimes = useCallback(() => {
		fetchAnimes();
	}, [fetchAnimes]);

	const handlerFetchTrendingAnimes = useCallback(() => {
		fetchTrendingAnimes();
	}, [fetchTrendingAnimes]);

	useFocusEffect(() => {
		handlerFetchAnimes();
	});

	useFocusEffect(() => {
		handlerFetchTrendingAnimes();
	});

	return (
		<SafeAreaViewContainer>
			<Title />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					gap: 20,
					paddingTop: 20,
					paddingBottom: 100,
				}}
			>
				<TopSlider data={dataMainSlider} />
				{isTrendingAnimesLoading ? (
					<ActivityIndicator size="large" color="#ebc16d" className="my-10" />
				) : (
					<ListAnime
						title="En Tendencia"
						animes={trendingAnimes}
						isLoading={isTrendingAnimesLoadingMore}
						handlerScrollInfinite={fetchTrendingAnimesNextPage}
					/>
				)}
				{isAnimesLoading ? (
					<ActivityIndicator size="large" color="#ebc16d" className="my-10" />
				) : (
					<ListAnime
						title="Popular"
						animes={animes}
						isLoading={isAnimesLoadingMore}
						handlerScrollInfinite={fetchAnimesNextPage}
					/>
				)}
			</ScrollView>
		</SafeAreaViewContainer>
	);
}
