import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type TIoniconsName = ComponentProps<typeof Ionicons>["name"];

export interface ITabIcon {
	icon: TIoniconsName;
	focused: boolean;
}
