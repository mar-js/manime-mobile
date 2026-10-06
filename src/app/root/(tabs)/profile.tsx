import { SafeAreaViewContainer } from "@/components";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
	const { user } = useUser();
	const { signOut } = useAuth();
	const router = useRouter();

	const handleSignOutPress = async () => {
		try {
			await signOut();
			router.replace("/(auth)/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const fullName =
		[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Otaku";
	const email = user?.primaryEmailAddress?.emailAddress;

	return (
		<SafeAreaViewContainer>
			<View className="flex-1 px-5 py-6 gap-10">
				<View className="items-center mt-4">
					<View className="relative mb-4">
						{user?.imageUrl ? (
							<Image
								source={{ uri: user.imageUrl }}
								className="w-28 h-28 rounded-full border-2 border-[#1abcb6]"
							/>
						) : (
							<View className="w-28 h-28 rounded-full bg-[#0b3141] border-2 border-[#1abcb6] items-center justify-center">
								<Ionicons name="person-outline" size={44} color="#1abcb6" />
							</View>
						)}
						<View className="absolute bottom-0 right-0 bg-[#ffdc5e] p-1.5 rounded-full border-2 border-[#04171f]">
							<Ionicons name="sparkles" size={14} color="#04171f" />
						</View>
					</View>
					<Text className="text-2xl font-bold text-white tracking-wide text-center">
						{fullName}
					</Text>
					{email && (
						<Text className="text-sm text-gray-400 mt-1 text-center">
							{email}
						</Text>
					)}
					<View className="mt-3 bg-[#0b3141] border border-[#1abcb6]/30 px-4 py-1.5 rounded-full flex-row items-center gap-1.5">
						<Ionicons name="tv-outline" size={14} color="#1abcb6" />
						<Text className="text-xs font-semibold text-[#1abcb6]">
							Miembro Manime
						</Text>
					</View>
				</View>
				<View className="bg-[#0b3141] p-5 rounded-2xl border border-[#1abcb6]/20">
					<Text className="text-[#ffdc5e] font-bold text-base mb-3">
						Detalles de Cuenta
					</Text>
					<View className="flex-row justify-between items-center py-2.5 border-b border-gray-800">
						<Text className="text-gray-300 text-sm">Estado de la cuenta</Text>
						<Text className="text-[#1abcb6] text-sm font-medium">Activa</Text>
					</View>
					<View className="flex-row justify-between items-center py-2.5">
						<Text className="text-gray-300 text-sm">Aplicación</Text>
						<Text className="text-gray-400 text-sm font-medium">
							Manime v1.0
						</Text>
					</View>
				</View>
				<View className="mb-2">
					<TouchableOpacity
						onPress={handleSignOutPress}
						activeOpacity={0.8}
						className="flex-row items-center justify-center gap-2 bg-[#0b3141] border border-red-500/40 py-4 px-6 rounded-2xl"
					>
						<Ionicons name="log-out-outline" size={20} color="#ef4444" />
						<Text className="text-red-500 font-semibold text-base">
							Cerrar sesión
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaViewContainer>
	);
}
