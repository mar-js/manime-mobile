import type { IHeroAnime } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const HeroAnime = ({
	bannerUrl,
	insets,
	handleNavigationBack,
	handleToggleFavorite,
	handleShareAnime,
	isFavorite,
}: IHeroAnime): JSX.Element => (
	<View className="w-full h-[400px] relative">
		<Image
			source={{ uri: bannerUrl }}
			className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
			resizeMode="cover"
		/>
		<View
			className="flex-row justify-between items-center w-full px-5 z-20"
			style={{ paddingTop: insets.top + 10 }}
		>
			<TouchableOpacity
				onPress={handleNavigationBack}
				className="p-2 rounded-full bg-black/40"
			>
				<Ionicons name="chevron-back" size={24} color="white" />
			</TouchableOpacity>
			<View className="flex-row gap-5">
				<TouchableOpacity
					onPress={handleToggleFavorite}
					className="p-2 rounded-full bg-black/40"
				>
					<Ionicons
						name={isFavorite ? "bookmark" : "bookmark-outline"}
						size={22}
						color={isFavorite ? "#ffdc5e" : "white"}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleShareAnime}
					className="p-2 rounded-full bg-black/40"
				>
					<Ionicons name="share-social-outline" size={22} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	</View>
);
