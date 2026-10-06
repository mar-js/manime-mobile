import type { AnimeItem } from "@/global/interfaces";
import { useAnimeCatalogStore } from "@/stores";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { ImageAnime } from "./ImageAnime";

export const ResultAnime = (anime: AnimeItem): JSX.Element => {
	const { setFavoriteAnime, isSavedAsFavorite } = useAnimeCatalogStore();

	const router = useRouter();

	const handlerNavigationAnime = () => {
		router.push(`/root/animes/${anime.id}`);
	};

	const handleFavoriteAnime = () => {
		setFavoriteAnime(anime);
	};

	const handleSavedAsFavorite = () => {
		return isSavedAsFavorite(anime.id);
	};

	const title =
		anime.attributes.canonicalTitle || anime.attributes.titles.en || "No Title";
	const image = [
		anime.attributes.posterImage,
		anime.attributes.coverImage,
	].filter((img) => img !== null)[0];
	const subtype = anime.attributes.subtype || "N/A";
	const status = anime.attributes.status || "Unknown";
	const date = anime.attributes.startDate
		? new Date(anime.attributes.startDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
		: null;

	return (
		<TouchableOpacity
			onPress={handlerNavigationAnime}
			className="m-2 w-48 bg-white rounded-xl overflow-hidden shadow-sm"
		>
			<View className="h-56">
				<ImageAnime
					image={image.original}
					handleFavoriteAnime={handleFavoriteAnime}
					handleSavedAsFavorite={handleSavedAsFavorite}
				/>
			</View>
			<View className="p-2">
				<Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
					{title}
				</Text>
				<Text className="text-xs text-gray-500 mt-1 capitalize">
					{subtype} • {status}
				</Text>
				<Text className="text-xs text-gray-500 mt-1 capitalize">
					{date || "-"}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
