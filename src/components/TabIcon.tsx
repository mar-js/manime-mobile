import type { ITabIcon } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const TabIcon = ({ icon, focused }: ITabIcon): JSX.Element => (
	<View
		className="size-14 items-center justify-center rounded-full"
		style={{ backgroundColor: focused ? "#ffdc5e" : "transparent" }}
	>
		<Ionicons name={icon} color="white" size={20} />
	</View>
);
