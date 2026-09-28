import "@/global/styles.css";
import { Slot, useTheme } from "expo-router";

export default function RootLayout() {
	const theme = useTheme();
	theme.colors.background = "transparent";
	return <Slot />;
}
