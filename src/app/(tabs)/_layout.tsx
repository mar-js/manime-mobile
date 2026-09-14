import { TabIcon } from "@/components";
import { dataTabs } from "@/global/data";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<LinearGradient
			colors={["#1abcb6", "#0b3141", "#04171f"]}
			start={{ x: 1, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
			}}
		>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					headerStyle: { backgroundColor: "transparent" },
					sceneStyle: { backgroundColor: "transparent" },
					tabBarStyle: {
						position: "absolute",
						bottom: 60,
						height: 60,
						marginHorizontal: 20,
						borderRadius: 100,
						borderTopWidth: 0,
						backgroundColor: "#0b3141",
						elevation: 0,
					},
					tabBarItemStyle: {
						paddingVertical: 10,
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
		</LinearGradient>
	);
}
