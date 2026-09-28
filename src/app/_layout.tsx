import "@/global/styles.css";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useTheme } from "expo-router";

export default function RootLayout() {
	const theme = useTheme();
	theme.colors.background = "transparent";

	return (
		<LinearGradient
			colors={["#1abcb6", "#0b3141", "#04171f"]}
			start={{ x: 1, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
			}}
		>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					contentStyle: { backgroundColor: "transparent" },
				}}
			>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="see-all" />
			</Stack>
		</LinearGradient>
	);
}
