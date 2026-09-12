import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { JSX } from "react/jsx-runtime";

export const SafeAreaViewContainer = ({
	children,
}: PropsWithChildren): JSX.Element => (
	<SafeAreaView className="flex-1 bg-[#3a4f5e] p-5">{children}</SafeAreaView>
);
