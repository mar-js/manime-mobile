import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { JSX } from "react/jsx-runtime";

export const SafeAreaViewContainer = ({
	children,
}: PropsWithChildren): JSX.Element => (
	<SafeAreaView className="flex-1 bg-transparent p-5 gap-5">
		{children}
	</SafeAreaView>
);
