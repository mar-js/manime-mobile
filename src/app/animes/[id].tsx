import {
	ActiveTabs,
	BannerAnime,
	BtnActiveTabs,
	HeroAnime,
} from "@/components";
import type { AnimeItem } from "@/global/interfaces";
import type { TActiveTab } from "@/global/types";
import { useAnimeCatalogStore } from "@/stores";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	ScrollView,
	Share,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnimeDetail() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { id } = useLocalSearchParams<{ id: string }>();
	const [anime, setAnime] = useState<AnimeItem | null>(null);
	const [activeTab, setActiveTab] = useState<TActiveTab>("Resumen");
	const {
		favorites: { data: favoritesData },
		getAnimeByIdLocal,
		setFavoriteAnime,
		isSavedAsFavorite,
	} = useAnimeCatalogStore();
	const isFavorite = id ? isSavedAsFavorite(id) : false;
	const bannerUrl =
		anime?.attributes.coverImage?.original ||
		anime?.attributes.coverImage?.large ||
		anime?.attributes.coverImage?.small ||
		anime?.attributes.coverImage?.tiny ||
		anime?.attributes.posterImage?.large ||
		anime?.attributes.posterImage?.medium ||
		anime?.attributes.posterImage?.original ||
		anime?.attributes.posterImage?.small ||
		anime?.attributes.posterImage?.tiny ||
		"";
	const posterUrl =
		anime?.attributes.posterImage?.small ||
		anime?.attributes.posterImage?.medium;

	const handleToggleFavorite = (): void => {
		if (anime) setFavoriteAnime(anime);
		return;
	};

	const handleShareAnime = async (): Promise<void> => {
		try {
			const title = anime?.attributes.canonicalTitle || "Anime Increíble";
			const synopsis = anime?.attributes.synopsis
				? `${anime?.attributes.synopsis.slice(0, 120)}...`
				: "¡Echa un vistazo a este anime!";
			const kitsuUrl = `https://kitsu.io/${anime?.attributes.slug}`;
			const shareMessage = `¡Te recomiendo ver ${title} en mAnime! 🎬\n\n"${synopsis}"\n\nMás detalles aquí: ${kitsuUrl}`;
			const result = await Share.share({
				message: shareMessage,
				title: title,
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					console.log(`Compartido en: ${result.activityType}`);
				} else {
					console.log("Anime compartido con éxito");
				}
			} else if (result.action === Share.dismissedAction) {
				console.log("Compartir cancelado");
			}
		} catch (error: any) {
			Alert.alert("Error al compartir", error.message);
		}
	};

	const handleNavigationBack = (): void => {
		router.back();
	};

	useEffect(() => {
		if (id) {
			const foundAnime = getAnimeByIdLocal(id, favoritesData);
			setAnime(foundAnime);
		}
	}, [id, favoritesData, getAnimeByIdLocal]);

	return (
		<LinearGradient
			colors={["#1abcb6", "#0b3141", "#04171f"]}
			start={{ x: 1, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
			}}
		>
			{anime ? (
				<View>
					<HeroAnime
						bannerUrl={bannerUrl}
						insets={insets}
						handleNavigationBack={handleNavigationBack}
						handleToggleFavorite={handleToggleFavorite}
						handleShareAnime={handleShareAnime}
						isFavorite={isFavorite}
					/>
					<BannerAnime
						posterUrl={posterUrl}
						canonicalTitle={anime?.attributes.canonicalTitle || ""}
						title={
							anime?.attributes.titles.en_jp ||
							anime?.attributes.titles.ja_jp ||
							""
						}
					/>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ padding: 20, gap: 20, paddingBottom: 100 }}
					>
						<BtnActiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />
						<ActiveTabs activeTab={activeTab} attributes={anime?.attributes} />
						<View>
							<TouchableOpacity className="w-full bg-[#ffdc5e] py-4 rounded-full items-center active:opacity-90 shadow-lg shadow-yellow-600/30">
								<Text className="text-zinc-900 font-bold text-lg uppercase tracking-wider">
									Ver Ahora
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			) : (
				<View
					className="flex-1 justify-center items-center"
					style={{ paddingTop: insets.top }}
				>
					<Text className="text-white text-lg">
						Anime no encontrado en el dispositivo
					</Text>
				</View>
			)}
		</LinearGradient>
	);
}
