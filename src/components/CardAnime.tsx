import type { AnimeItem } from "@/global/interfaces";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const CardAnime = (anime: AnimeItem): JSX.Element => {
	const router = useRouter();
	const image = [
		anime.attributes.posterImage,
		anime.attributes.coverImage,
	].filter((image) => image !== null)[0];

	const handlerNavigationAnime = () => {
		router.push("/animes/[id]");
	};

	return (
		<TouchableOpacity onPress={handlerNavigationAnime}>
			<View className="gap-2">
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
