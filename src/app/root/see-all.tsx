import { CardAnime, ListAnime, SafeAreaViewContainer } from "@/components";
import { useAnimeCatalogStore } from "@/stores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SeeAll() {
	const router = useRouter();
	const { type, title } = useLocalSearchParams<{
		type: string;
		title: string;
	}>();
	const { animes, trending, fetchAnimesNextPage, fetchTrendingNextPage } =
		useAnimeCatalogStore();
	const isTrending = type === "trending";
	const sectionData = isTrending ? trending : animes;
	const loadMoreFn = isTrending ? fetchTrendingNextPage : fetchAnimesNextPage;

	const handleNavigationBack = () => {
		router.back();
	};

	return (
		<LinearGradient
			colors={["#1abcb6", "#0b3141", "#04171f"]}
			start={{ x: 1, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
			}}
		>
			<SafeAreaViewContainer>
				<View className="flex-row items-center gap-3">
					<TouchableOpacity onPress={handleNavigationBack}>
						<Ionicons name="arrow-back" size={20} color="white" />
					</TouchableOpacity>
					<Text className="text-xl font-bold text-white">
						{title || "Ver Todo"}
					</Text>
				</View>
				<ListAnime
					horizontal={false}
					animes={sectionData.data}
					isLoading={sectionData.isLoading}
					isLoadingMore={sectionData.isLoadingMore}
					handlerScrollInfinite={loadMoreFn}
					RenderComponent={({ anime }) => <CardAnime {...anime} />}
				/>
			</SafeAreaViewContainer>
		</LinearGradient>
	);
}
