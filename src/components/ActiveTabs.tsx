import type { IActiveTabs } from "@/global/interfaces";
import { Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const ActiveTabs = ({
	activeTab,
	attributes,
}: IActiveTabs): JSX.Element => (
	<View>
		{activeTab === "Resumen" && (
			<View className="gap-5">
				<Text className="text-zinc-300 leading-6 text-base text-justify">
					{attributes?.synopsis ||
						"No hay sinopsis disponible en este momento."}
				</Text>
				<View className="bg-black/20 p-5 rounded-2xl gap-5">
					<Text className="text-zinc-400 text-sm">
						Tipo:{" "}
						<Text className="text-white font-medium capitalize">
							{attributes?.subtype || "N/A"}
						</Text>
					</Text>
					<Text className="text-zinc-400 text-sm">
						Estado:{" "}
						<Text className="text-white font-medium capitalize">
							{attributes?.status || "N/A"}
						</Text>
					</Text>
					<Text className="text-zinc-400 text-sm">
						Episodios:{" "}
						<Text className="text-white font-medium">
							{attributes?.episodeCount || "Desconocido"}
						</Text>
					</Text>
					<Text className="text-zinc-400 text-sm">
						Rating Promedio:{" "}
						<Text className="text-[#ffdc5e] font-bold">
							★{" "}
							{attributes?.averageRating
								? (parseFloat(attributes?.averageRating) / 10).toFixed(1)
								: "N/A"}
						</Text>
					</Text>
				</View>
			</View>
		)}
		{activeTab === "Episodios" && (
			<Text className="text-zinc-400 text-center">
				Lista de episodios (Local/N/A)
			</Text>
		)}
		{activeTab === "Reparto" && (
			<Text className="text-zinc-400 text-center">
				Información del reparto de voces
			</Text>
		)}
		{activeTab === "Reseñas" && (
			<Text className="text-zinc-400 text-center">
				Comentarios de la comunidad
			</Text>
		)}
	</View>
);
