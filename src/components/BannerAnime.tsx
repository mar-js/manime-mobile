import type { IBannerAnime } from "@/global/interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const BannerAnime = ({
	posterUrl,
	canonicalTitle,
	titles,
}: IBannerAnime): JSX.Element => (
	<LinearGradient
		colors={[
			"transparent",
			"rgba(0, 0, 0, 0.6)",
			"rgba(0, 0, 0, 0.8)",
			"#0b3141",
			"#0b3141",
		]}
		start={{ x: 0.8, y: 0 }}
		end={{ x: 0.8, y: 1 }}
		style={{
			marginTop: -120,
			padding: 20,
			zIndex: 10,
		}}
	>
		<View className="flex-row items-end gap-5">
			<Image
				source={{ uri: posterUrl }}
				className="w-24 h-36 rounded-xl"
				resizeMode="stretch"
			/>
			<View className="pb-5">
				<Text className="text-2xl font-bold text-white" numberOfLines={2}>
					{canonicalTitle}
				</Text>
				<Text className="text-zinc-400 text-sm mt-1">
					{titles.en_jp || titles.ja_jp || ""}
				</Text>
			</View>
		</View>
	</LinearGradient>
);
