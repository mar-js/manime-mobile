import type { ITopSlider } from "@/global/interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Image, Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const TopSlider = ({ data }: ITopSlider): JSX.Element => (
	<FlatList
		horizontal
		showsHorizontalScrollIndicator={false}
		pagingEnabled
		data={data}
		contentContainerStyle={{
			gap: 10,
		}}
		keyExtractor={(item) => item.id}
		renderItem={({ item }) => (
			<View className="relative">
				<Image
					className="rounded-xl"
					source={item.url}
					resizeMode="stretch"
					style={{ width: 300, height: 250 }}
				/>

				<LinearGradient
					colors={["transparent", "rgba(0, 0, 0, 0.8)", "black"]}
					start={{ x: 0.8, y: 0 }}
					end={{ x: 0.8, y: 1 }}
					style={{
						position: "absolute",
						bottom: 0,
						width: "100%",
						paddingVertical: 20,
						justifyContent: "center",
						alignItems: "center",
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
					}}
				>
					<Text className="text-white font-semibold text-2xl uppercase">
						{item.title}
					</Text>
				</LinearGradient>
			</View>
		)}
	/>
);
