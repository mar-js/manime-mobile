import { dataActiveTab } from "@/global/data";
import type { IBtnActiveTabs } from "@/global/interfaces";
import { Text, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const BtnActiveTabs = ({
	activeTab,
	setActiveTab,
}: IBtnActiveTabs): JSX.Element => (
	<View className="flex-row justify-between border-b border-gray-500">
		{dataActiveTab.map((tab) => (
			<TouchableOpacity
				key={tab}
				onPress={() => setActiveTab(tab)}
				className={`pb-3 ${activeTab === tab ? "border-b-2 border-[#ffdc5e]" : ""}`}
			>
				<Text
					className={`text-base font-semibold ${activeTab === tab ? "text-[#ffdc5e]" : "text-gray-500"}`}
				>
					{tab}
				</Text>
			</TouchableOpacity>
		))}
	</View>
);
