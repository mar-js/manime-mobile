import type { IListAnime } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { HeadListAnime } from "./HeadListAnime";

export const ListAnime = ({
	title,
	horizontal,
	animes,
	isLoading,
	isLoadingMore,
	handlerScrollInfinite,
	RenderComponent,
}: IListAnime) => (
	<View className="w-full">
		{title && <HeadListAnime title={title} />}
		<FlatList
			data={animes}
			keyExtractor={(item, index) => `${item.id}-${index}`}
			horizontal={horizontal}
			numColumns={horizontal ? 1 : 2}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				justifyContent: "center",
				alignItems: "center",
				paddingBottom: horizontal ? 0 : 100,
			}}
			renderItem={({ item }) => <RenderComponent anime={item} />}
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
						{title && (
							<Ionicons name="search-outline" size={50} color="#9ca3af" />
						)}
						<Text className="text-gray-500 text-lg mt-2 font-medium">
							No results found
						</Text>
					</View>
				) : null
			}
		/>
	</View>
);
