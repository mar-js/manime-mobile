import "@/global/styles.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, useTheme } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

if (!publishableKey) {
	throw new Error("Add your Clerk Publishable Key to the .env file");
}

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
			<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
				<Slot />
			</ClerkProvider>
		</LinearGradient>
	);
}
