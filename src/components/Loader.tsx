import { ActivityIndicator, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const Loader = (): JSX.Element => (
	<View className="flex-1 justify-center items-center my-12">
		<ActivityIndicator size="large" color="#ffdc5e" />
	</View>
);
