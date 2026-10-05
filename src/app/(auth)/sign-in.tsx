import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [errors, setErrors] = useState<{ message: string }[]>([]);

	const onSignInPress = async () => {
		setErrorMessage(null);
		setErrors([]);

		if (!email.trim() || !password.trim()) {
			setErrorMessage("Ingresa tu correo y contraseña.");
			return;
		}

		setIsFetching(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
		} catch (_error) {
			setErrorMessage("No se pudo iniciar sesión.");
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-[#04171f]"
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
				keyboardShouldPersistTaps="handled"
				className="px-6 py-12"
			>
				<View className="w-full max-w-md mx-auto">
					{/* Header */}
					<View className="items-center mb-8">
						<View className="w-16 h-16 rounded-2xl bg-[#1abcb6]/10 items-center justify-center mb-4 border border-[#1abcb6]/30">
							<Ionicons name="log-in-outline" size={32} color="#1abcb6" />
						</View>
						<Text className="text-3xl font-bold text-white tracking-tight">
							Bienvenido
						</Text>
						<Text className="text-slate-400 text-base mt-1 text-center">
							Ingresa tus credenciales para acceder a Manime
						</Text>
					</View>

					{/* Form Card */}
					<View className="bg-[#0b3141] p-6 rounded-3xl border border-[#1abcb6]/20 shadow-xl">
						{/* Mensajes de Error (Clerk o Local) */}
						{(errorMessage || (errors && errors.length > 0)) && (
							<View className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl mb-4 flex-row items-center">
								<Ionicons
									name="alert-circle"
									size={20}
									color="#ef4444"
									className="mr-2"
								/>
								<Text className="text-red-400 text-sm flex-1">
									{errorMessage || errors?.[0]?.message}
								</Text>
							</View>
						)}

						{/* Email Field */}
						<View className="mb-4">
							<Text className="text-slate-300 text-sm font-medium mb-2">
								Correo Electrónico
							</Text>
							<View className="flex-row items-center bg-[#04171f] border border-[#1abcb6]/30 rounded-xl px-3.5 py-3 focus:border-[#1abcb6]">
								<Ionicons
									name="mail-outline"
									size={20}
									color="#1abcb6"
									className="mr-2"
								/>
								<TextInput
									value={email}
									onChangeText={setEmail}
									placeholder="ejemplo@correo.com"
									placeholderTextColor="#64748b"
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									className="flex-1 text-white text-base mb-2"
								/>
							</View>
						</View>

						{/* Password Field */}
						<View className="mb-6">
							<Text className="text-slate-300 text-sm font-medium mb-2">
								Contraseña
							</Text>
							<View className="flex-row items-center bg-[#04171f] border border-[#1abcb6]/30 rounded-xl px-3.5 py-3 focus:border-[#1abcb6]">
								<Ionicons
									name="lock-closed-outline"
									size={20}
									color="#1abcb6"
									className="mr-2"
								/>
								<TextInput
									value={password}
									onChangeText={setPassword}
									placeholder="••••••••"
									placeholderTextColor="#64748b"
									secureTextEntry={!showPassword}
									autoCapitalize="none"
									className="flex-1 text-white text-base"
								/>
								<Pressable
									onPress={() => setShowPassword(!showPassword)}
									className="p-1"
								>
									<Ionicons
										name={showPassword ? "eye-off-outline" : "eye-outline"}
										size={20}
										color="#64748b"
									/>
								</Pressable>
							</View>
						</View>

						{/* Submit Button */}
						<Pressable
							onPress={onSignInPress}
							disabled={isFetching}
							className={`w-full py-4 rounded-xl items-center justify-center flex-row shadow-lg ${
								isFetching
									? "bg-[#1abcb6]/50"
									: "bg-[#1abcb6] active:bg-[#1abcb6]/80"
							}`}
						>
							{isFetching ? (
								<ActivityIndicator color="#04171f" size="small" />
							) : (
								<>
									<Text className="text-[#04171f] font-bold text-base mr-2">
										Iniciar Sesión
									</Text>
									<Ionicons name="arrow-forward" size={18} color="#04171f" />
								</>
							)}
						</Pressable>
					</View>

					{/* Link a Sign Up */}
					<View className="flex-row justify-center mt-8">
						<Text className="text-slate-400 text-base">
							¿No tienes una cuenta?{" "}
						</Text>
						<Link href="/sign-up" asChild>
							<Pressable>
								<Text className="text-[#ffdc5e] font-bold text-base">
									Registrate aquí
								</Text>
							</Pressable>
						</Link>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
