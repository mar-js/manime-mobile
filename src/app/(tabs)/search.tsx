import { ModalFilters, SafeAreaViewContainer, Title } from "@/components";
import type { ISearchState, TSelectType } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
	const [searchState, setSearchState] = useState<ISearchState>({
		query: "",
		filters: {
			type: "All",
			category: "All",
			SeasonYear: "All",
			status: "All",
		},
		showModal: false,
	});

	const handleChangeQuery = (text: string): void => {
		setSearchState((prevState) => ({ ...prevState, query: text }));
	};

	const handlePressClearQuery = (): void => {
		setSearchState((prevState) => ({ ...prevState, query: "" }));
	};

	const handlePressSelectType = (
		idFilter: number,
		selectTypeValue: TSelectType,
	): void => {
		setSearchState((prevState) => ({
			...prevState,
			filters: {
				...prevState.filters,
				[idFilter === 1
					? "type"
					: idFilter === 2
						? "category"
						: idFilter === 3
							? "SeasonYear"
							: "status"]: selectTypeValue,
			},
		}));
	};

	const handlePressShowModal = (): void => {
		setSearchState((prevState) => ({
			...prevState,
			showModal: !prevState.showModal,
		}));
	};

	return (
		<SafeAreaViewContainer>
			<Title isVisibleBackBtn />
			<View className="gap-5">
				<View className="flex-row items-center justify-between bg-[#ffdc5e] shadow-lg shadow-yellow-500 py-2 px-4 rounded-full">
					<View className="flex-row items-center justify-center">
						<Ionicons
							name="search"
							size={20}
							color="#6b7280"
							className="mr-2"
						/>
						<TextInput
							className="text-gray-500 text-xl font-semibold mb-1"
							value={searchState.query}
							onChangeText={handleChangeQuery}
							placeholder="Search..."
							placeholderTextColor="#6b7280"
						/>
					</View>
					<View className="flex-row gap-2">
						{searchState.query.length > 0 && (
							<TouchableOpacity onPress={handlePressClearQuery}>
								<Ionicons name="close-circle" size={20} color="#6b7280" />
							</TouchableOpacity>
						)}
						<TouchableOpacity onPress={() => handlePressShowModal()}>
							<Ionicons name="menu" size={20} color="#6b7280" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<ModalFilters
				showModal={searchState.showModal}
				handlePressShowModal={handlePressShowModal}
				handlePressSelectType={handlePressSelectType}
				selectTypeValue={searchState.filters}
			/>
		</SafeAreaViewContainer>
	);
}
