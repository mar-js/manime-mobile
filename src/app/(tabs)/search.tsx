import {
	ListAnime,
	Loader,
	ModalFilters,
	ResultAnime,
	SafeAreaViewContainer,
	Title,
} from "@/components";
import type { ISearchState, TSelectType } from "@/global/interfaces";
import { useAnimeCatalogStore } from "@/stores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
	const { animes, fetchAnimes, fetchAnimesNextPage } = useAnimeCatalogStore();

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

	const totalFiltersSelected = Object.values(searchState.filters).filter(
		(value) => value !== "All",
	).length;

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

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchAnimes(searchState.query, searchState.filters);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchState.query, searchState.filters, fetchAnimes]);

	return (
		<SafeAreaViewContainer>
			<Title isVisibleBackBtn />
			<View className="gap-5">
				<View className="flex-row items-center justify-between bg-[#ffdc5e] shadow-lg shadow-yellow-500 py-2 px-4 rounded-full">
					<View className="flex-row items-center justify-center flex-1 mr-2">
						<Ionicons
							name="search"
							size={20}
							color="#6b7280"
							className="mr-2"
						/>
						<TextInput
							className="text-gray-500 text-xl font-semibold mb-1 flex-1"
							value={searchState.query}
							onChangeText={handleChangeQuery}
							placeholder="Search..."
							placeholderTextColor="#6b7280"
						/>
					</View>
					<View className="flex-row gap-3 items-center">
						{searchState.query.length > 0 && (
							<TouchableOpacity onPress={handlePressClearQuery}>
								<Ionicons name="close-circle" size={20} color="#6b7280" />
							</TouchableOpacity>
						)}
						<View className="relative">
							{totalFiltersSelected > 0 && (
								<View className="absolute -top-2 right-2 z-50 bg-gray-500 rounded-full w-5 h-5 flex items-center justify-center">
									<Text className="text-white text-xs font-bold">
										{totalFiltersSelected}
									</Text>
								</View>
							)}
							<TouchableOpacity onPress={handlePressShowModal}>
								<Ionicons name="menu" size={20} color="#6b7280" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			{animes.isLoading && animes.data.length === 0 ? (
				<Loader />
			) : (
				<ListAnime
					horizontal={false}
					animes={animes.data}
					isLoading={animes.isLoading}
					isLoadingMore={animes.isLoadingMore}
					handlerScrollInfinite={fetchAnimesNextPage}
					RenderComponent={({ anime }) => <ResultAnime {...anime} />}
				/>
			)}
			<ModalFilters
				showModal={searchState.showModal}
				handlePressShowModal={handlePressShowModal}
				handlePressSelectType={handlePressSelectType}
				selectTypeValue={searchState.filters}
			/>
		</SafeAreaViewContainer>
	);
}
