import type { EpisodeItem } from "@/global/interfaces";
import { Image, Text, View } from "react-native";

export const CardAnimeEpisode = (item: EpisodeItem) => {
	const attr = item.attributes;
	const thumb = attr.thumbnail?.original || "https://placehold.co";
	const title =
		attr.canonicalTitle || attr.titles.en_jp || `Episodio ${attr.number}`;

	return (
		<View className="flex-row bg-black/20 rounded-xl overflow-hidden p-3 gap-3 border border-zinc-800/40">
			<View className="w-28 h-20 bg-zinc-800 rounded-lg overflow-hidden relative">
				<Image
					source={{ uri: thumb }}
					className="w-full h-full"
					resizeMode="cover"
				/>
				<View className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded">
					<Text className="text-[10px] text-white font-medium">
						{attr.length ? `${attr.length}m` : "24m"}
					</Text>
				</View>
			</View>

			<View className="flex-1 justify-center">
				<Text className="text-xs text-[#ffdc5e] font-semibold uppercase tracking-wider">
					Episodio {attr.number}
				</Text>
				<Text
					className="text-white font-bold text-base mt-0.5"
					numberOfLines={1}
				>
					{title}
				</Text>
				<Text className="text-zinc-400 text-xs mt-1" numberOfLines={2}>
					{attr.synopsis || "Sin sinopsis disponible."}
				</Text>
			</View>
		</View>
	);
};
