import type { AnimeItem } from "@/global/interfaces";
import { useAnimeCatalogStore } from "@/stores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const CardAnime = (anime: AnimeItem): JSX.Element => {
	const { setFavoriteAnime, isSavedAsFavorite } = useAnimeCatalogStore();
	const router = useRouter();
	const image = [
		anime.attributes.posterImage,
		anime.attributes.coverImage,
	].filter((img) => img !== null)[0];

	const handlerNavigationAnime = () => {
		router.push(`/animes/${anime.id}`);
	};

	const handleFavoriteAnime = () => {
		setFavoriteAnime(anime);
	};

	const handleSavedAsFavorite = () => {
		return isSavedAsFavorite(anime.id);
	};

	return (
		<TouchableOpacity onPress={handlerNavigationAnime}>
			<View className="gap-2 relative">
				<TouchableOpacity
					onPress={handleFavoriteAnime}
					className="absolute top-2 right-2 z-50"
				>
					<Ionicons
						name={handleSavedAsFavorite() ? "heart" : "heart-outline"}
						color={handleSavedAsFavorite() ? "red" : "white"}
						size={20}
					/>
				</TouchableOpacity>
				<Image
					source={{
						uri: image.original,
					}}
					resizeMode="stretch"
					style={{
						width: 150,
						height: 200,
					}}
					className="rounded-xl"
				/>
				<Text
					className="max-w-40 text-white font-semibold"
					lineBreakMode="clip"
					numberOfLines={1}
				>
					{anime.attributes.canonicalTitle}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
