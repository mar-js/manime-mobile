import {
	dataCategoriesAnime,
	dataSeasonYearAnime,
	dataStatusAnime,
	dataTypesAnime,
} from "@/global/data";
import type { IModalFilters, TSelectType } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

const dataModalFilter = [
	{
		id: 1,
		title: "Tipos",
		data: dataTypesAnime,
	},
	{
		id: 2,
		title: "Categorias",
		data: dataCategoriesAnime,
	},
	{
		id: 3,
		title: "Años de temporadas",
		data: dataSeasonYearAnime,
	},
	{
		id: 4,
		title: "Estados",
		data: dataStatusAnime,
	},
];

export const ModalFilters = ({
	showModal,
	handlePressShowModal,
	handlePressSelectType,
	selectTypeValue,
}: IModalFilters) => {
	const handlerStyleFilter = (id: number, filter: TSelectType) => ({
		bg: [
			id === 1
				? selectTypeValue.type
				: id === 2
					? selectTypeValue.category
					: id === 3
						? selectTypeValue.SeasonYear
						: selectTypeValue.status,
		].includes(filter)
			? "bg-gray-500"
			: "bg-white",
		text: [
			id === 1
				? selectTypeValue.type
				: id === 2
					? selectTypeValue.category
					: id === 3
						? selectTypeValue.SeasonYear
						: selectTypeValue.status,
		].includes(filter)
			? "text-white"
			: "text-gray-500",
	});

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showModal}
			onRequestClose={handlePressShowModal}
		>
			<View className="flex-1 justify-end items-center bg-black/50">
				<View className="w-full h-[600px] bg-white rounded-xl p-5">
					<Pressable
						className="flex-row justify-between items-center"
						onPress={handlePressShowModal}
					>
						<Text className="text-xl">Filtros</Text>
						<Ionicons name="close" size={20} color="#6b7280" />
					</Pressable>
					<View className="w-full h-[1px] bg-gray-500 my-2" />
					<ScrollView
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{
							gap: 10,
							paddingBottom: 20,
						}}
					>
						{dataModalFilter.map((itemModalFilter) => (
							<View className="gap-2" key={itemModalFilter.id}>
								<Text className="text-lg">{itemModalFilter.title}: </Text>
								<View className="gap-2 flex-row flex-wrap items-center">
									{itemModalFilter.data.map((itemAnime) => (
										<Pressable
											onPress={() =>
												handlePressSelectType(itemModalFilter.id, itemAnime)
											}
											key={itemAnime}
											className={`py-2 px-4 border border-gray-500 rounded-xl ${handlerStyleFilter(itemModalFilter.id, itemAnime).bg}`}
										>
											<Text
												className={`w-full text-sm ${handlerStyleFilter(itemModalFilter.id, itemAnime).text}`}
											>
												{itemAnime}
											</Text>
										</Pressable>
									))}
								</View>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};
