import type { AnimeItem } from "@/global/interfaces";
import { useAnimeCatalogStore } from "@/stores";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { ImageAnime } from "./ImageAnime";

export const CardAnime = (anime: AnimeItem): JSX.Element => {
	const { setFavoriteAnime, isSavedAsFavorite } = useAnimeCatalogStore();
	const router = useRouter();
	const image = [
		anime.attributes.posterImage,
		anime.attributes.coverImage,
	].filter((img) => img !== null)[0];

	const handlerNavigationAnime = () => {
		router.push(`/root/animes/${anime.id}`);
	};

	const handleFavoriteAnime = () => {
		setFavoriteAnime(anime);
	};

	const handleSavedAsFavorite = () => {
		return isSavedAsFavorite(anime.id);
	};

	return (
		<TouchableOpacity onPress={handlerNavigationAnime} className="m-2 w-40">
			<View className="gap-2">
				<ImageAnime
					image={image?.original ?? ""}
					handleFavoriteAnime={handleFavoriteAnime}
					handleSavedAsFavorite={handleSavedAsFavorite}
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
