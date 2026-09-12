import { TabIcon } from "@/components";
import { dataTabs } from "@/global/data";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					bottom: 50,
					height: 60,
					marginHorizontal: 20,
					borderRadius: 100,
					backgroundColor: "#0b3141",
					elevation: 0,
				},
				tabBarItemStyle: {
					paddingVertical: 10,
				},
				tabBarIconStyle: {
					width: 30,
					height: 30,
					alignItems: "center",
				},
			}}
		>
			{dataTabs.map((dataTab) => (
				<Tabs.Screen
					key={dataTab.title}
					name={dataTab.title.toLocaleLowerCase()}
					options={{
						title: dataTab.title,
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={dataTab.icon} focused={focused} />
						),
					}}
				/>
			))}
		</Tabs>
	);
}
