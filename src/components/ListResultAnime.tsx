import type { IListResultAnime } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const ListResultAnime = ({
	data,
	isLoadingMore,
	isLoading,
	fetchAnimesNextPage,
	renderAnimeItem,
}: IListResultAnime): JSX.Element => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => renderAnimeItem(item)}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				gap: 10,
				justifyContent: "center",
				alignItems: "center",
			}}
			onEndReached={() => fetchAnimesNextPage()}
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
	);
};
