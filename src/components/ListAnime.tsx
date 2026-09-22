import type { IListAnime } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { HeadListAnime } from "./HeadListAnime";

export const ListAnime = ({
	title,
	animes,
	isLoading,
	isLoadingMore,
	handlerScrollInfinite,
	renderAnimeItem,
}: IListAnime) => (
	<View className="w-full">
		<HeadListAnime title={title} />
		<FlatList
			data={animes}
			keyExtractor={(item, index) => `${item.id}-${index}`}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				gap: 10,
				justifyContent: "center",
				alignItems: "center",
			}}
			renderItem={({ item }) => renderAnimeItem(item)}
			onEndReached={handlerScrollInfinite}
			onEndReachedThreshold={0.5}
			ListFooterComponent={
				isLoadingMore ? (
					<View className="py-4 justify-center items-center">
						<ActivityIndicator size="small" color="#6b7280" />
					</View>
				) : null
			}
			ListEmptyComponent={
				!isLoading ? (
					<View className="flex-1 justify-center items-center m-10">
						<Ionicons name="search-outline" size={50} color="#9ca3af" />
						<Text className="text-gray-500 text-lg mt-2 font-medium">
							No results found
						</Text>
					</View>
				) : null
			}
		/>
	</View>
);
