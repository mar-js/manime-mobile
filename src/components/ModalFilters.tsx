import { dataModalFilter } from "@/global/data";
import type { IModalFilters, TSelectType } from "@/global/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export const ModalFilters = ({
	showModal,
	handlePressShowModal,
	handlePressSelectType,
	selectTypeValue,
}: IModalFilters) => {
	const handlerStyleFilter = (id: number, filter: TSelectType) => {
		const currentSelected =
			id === 1
				? selectTypeValue.type
				: id === 2
					? selectTypeValue.category
					: id === 3
						? selectTypeValue.SeasonYear
						: selectTypeValue.status;

		const isSelected = currentSelected === filter;

		return {
			bg: isSelected ? "bg-gray-500" : "bg-white",
			text: isSelected ? "text-white" : "text-gray-500",
		};
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showModal}
			onRequestClose={handlePressShowModal}
		>
			<View className="flex-1 justify-end items-center bg-black/50">
				<View className="w-full h-[700px] bg-white rounded-xl p-5">
					<TouchableOpacity
						className="flex-row justify-between items-center"
						onPress={handlePressShowModal}
					>
						<Text className="text-xl font-bold">Filtros</Text>
						<Ionicons name="close" size={24} color="#6b7280" />
					</TouchableOpacity>
					<View className="w-full h-[1px] bg-gray-500 my-3" />
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
					>
						{dataModalFilter.map((itemModalFilter) => (
							<View className="gap-2" key={itemModalFilter.id}>
								<Text className="text-lg font-semibold text-gray-700">
									{itemModalFilter.title}:
								</Text>
								<View className="gap-2 flex-row flex-wrap items-center">
									{itemModalFilter.data.map((itemAnime) => {
										const currentStyles = handlerStyleFilter(
											itemModalFilter.id,
											itemAnime,
										);
										return (
											<TouchableOpacity
												onPress={() =>
													handlePressSelectType(itemModalFilter.id, itemAnime)
												}
												key={itemAnime}
												className={`py-2 px-4 border border-gray-400 rounded-xl ${currentStyles.bg}`}
											>
												<Text
													className={`text-sm font-medium ${currentStyles.text}`}
												>
													{itemAnime}
												</Text>
											</TouchableOpacity>
										);
									})}
								</View>
							</View>
						))}
						<TouchableOpacity
							onPress={handlePressShowModal}
							className="bg-[#ffdc5e] py-3 rounded-xl"
						>
							<Text className="text-center text-gray-500 font-semibold text-lg">
								Aplicar filtros
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};
