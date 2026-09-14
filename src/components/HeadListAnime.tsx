import type { IHeadListAnime } from "@/global/interfaces";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const HeadListAnime = ({ title }: IHeadListAnime): JSX.Element => (
	<View className="flex-row justify-between items-center mb-2">
		<Text className="text-white text-2xl font-semibold">{title}</Text>
		<Link href="/" asChild>
			<Pressable>
				<Text className="text-[#ffdc5e]">Ver más</Text>
			</Pressable>
		</Link>
	</View>
);
