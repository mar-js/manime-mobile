import type { AnimeItem } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const ResultAnime = (anime: AnimeItem): JSX.Element => {
	const router = useRouter();

	const handlerNavigationAnime = () => {
		router.push(`/animes/${anime.id}`);
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
			className="flex-1 m-2 bg-white rounded-xl overflow-hidden shadow-sm"
		>
			<View className="h-56 w-full">
				{image ? (
					<Image
						source={{ uri: image.original }}
						className="w-full h-full"
						resizeMode="cover"
					/>
				) : (
					<View className="flex-1 justify-center items-center">
						<Ionicons name="image-outline" size={32} color="#9ca3af" />
					</View>
				)}
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
