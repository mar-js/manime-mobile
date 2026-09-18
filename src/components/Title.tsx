import type { ITitle } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const Title = ({ isVisibleBackBtn }: ITitle): JSX.Element => (
	<View className="flex-row items-center justify-between">
		{isVisibleBackBtn ? (
			<Ionicons name="arrow-back" color="white" size={20} />
		) : (
			<View className="p-5" />
		)}
		<Text className="text-3xl text-white font-bold">MANIME</Text>
		<Image
			source={require("../../assets/images/icon-2.png")}
			resizeMode="contain"
			style={{ width: 30, height: 30 }}
		/>
	</View>
);
