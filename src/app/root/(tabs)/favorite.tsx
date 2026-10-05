import {
	CardAnime,
	ListAnime,
	SafeAreaViewContainer,
	Title,
} from "@/components";
import { useAnimeCatalogStore } from "@/stores";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Favorite() {
	const { favorites } = useAnimeCatalogStore();
	const router = useRouter();

	const handleNavigationAnime = () => {
		router.push("/(tabs)");
	};

	return (
		<SafeAreaViewContainer>
			<Title isVisibleBackBtn />
			{favorites.data.length === 0 ? (
				<View className="mt-52 justify-center items-center gap-4">
					<Text className="text-lg font-bold text-gray-500">
						No hay animes favoritos
					</Text>
					<Link href="/" asChild>
						<TouchableOpacity onPress={handleNavigationAnime}>
							<Text className="text-blue-500 underline">
								Ver animes populares
							</Text>
						</TouchableOpacity>
					</Link>
				</View>
			) : (
				<ListAnime
					horizontal={false}
					animes={favorites.data}
					isLoading={false}
					isLoadingMore={false}
					handlerScrollInfinite={() => {}}
					RenderComponent={({ anime }) => <CardAnime {...anime} />}
				/>
			)}
		</SafeAreaViewContainer>
	);
}
