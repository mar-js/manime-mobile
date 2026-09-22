import type { IListAnime } from "@/global/interfaces";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { HeadListAnime } from "./HeadListAnime";

export const ListAnime = ({
	title,
	animes,
	isLoading,
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
			ListEmptyComponent={
				<View className="m-5">
					<Text className="text-white text-lg">Not animes</Text>
				</View>
			}
			ListFooterComponent={
				<View className="m-5">
					{isLoading ? (
						<ActivityIndicator size="large" color="#ffdc5e" />
					) : null}
				</View>
			}
		/>
	</View>
);
