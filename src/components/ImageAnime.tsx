import type { IImageAnime } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity, View } from "react-native";

export const ImageAnime = ({
	image,
	handleFavoriteAnime,
	handleSavedAsFavorite,
}: IImageAnime) => (
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
		{image ? (
			<Image
				source={{
					uri: image,
				}}
				resizeMode="stretch"
				style={{
					width: "100%",
					height: 200,
				}}
				className="rounded-xl"
			/>
		) : (
			<View className="flex-1 justify-center items-center">
				<Ionicons name="image-outline" size={32} color="#9ca3af" />
			</View>
		)}
	</View>
);
