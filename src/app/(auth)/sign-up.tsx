import { useAuth, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function SignUp() {
	const { isSignedIn, isLoaded: authLoaded } = useAuth();
	const { signUp, errors, fetchStatus } = useSignUp();
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [code, setCode] = useState("");
	const [forceReset, setForceReset] = useState(false);
	const isLoading = fetchStatus === "fetching";
	const hasErrors =
		errors.fields &&
		Object.values(errors.fields).some(
			(value) => value !== null && value !== undefined,
		);

	if (!authLoaded) return null;
	if (isSignedIn) return null;

	const conditionVerifyCode =
		!forceReset &&
		signUp?.status === "missing_requirements" &&
		signUp?.unverifiedFields?.includes("email_address") &&
		signUp?.missingFields?.length === 0;

	if (signUp?.status === "complete") return null;

	const handlerSignUpPress = async () => {
		if (!signUp) return;
		setForceReset(false);

		const { error } = await signUp.password({
			firstName,
			lastName,
			emailAddress,
			password,
		});

		if (error) {
			alert(error.message);
			handlerCancelSignUpPress();
			return;
		}

		await signUp.verifications.sendEmailCode();
	};

	const handlerVerifyCodePress = async () => {
		if (!signUp) return;
		await signUp.verifications.verifyEmailCode({ code });
		if (signUp.status === "complete") {
			await signUp.finalize({
				navigate: ({ decorateUrl }) => {
					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
		}
	};

	const handlerRetryVerifyCodePress = () => {
		signUp?.verifications.sendEmailCode();
	};

	const handlerCancelSignUpPress = () => {
		setFirstName("");
		setLastName("");
		setEmailAddress("");
		setPassword("");
		setCode("");
		setForceReset(true);
		signUp?.reset();
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
						<View className="w-16 h-16 rounded-2xl bg-[#ffdc5e]/10 items-center justify-center mb-4 border border-[#ffdc5e]/30">
							<Ionicons
								name={
									conditionVerifyCode
										? "shield-checkmark-outline"
										: "person-add-outline"
								}
								size={32}
								color="#ffdc5e"
							/>
						</View>
						<Text className="text-3xl font-bold text-white tracking-tight">
							{conditionVerifyCode ? "Verifica tu Correo" : "Crear Cuenta"}
						</Text>
						<Text className="text-slate-400 text-base mt-1 text-center">
							{conditionVerifyCode
								? `Enviamos un código a ${emailAddress || "tu correo"}`
								: "Regístrate para comenzar la experiencia en Manime"}
						</Text>
					</View>

					{/* Form Card */}
					<View className="bg-[#0b3141] p-6 rounded-3xl border border-[#1abcb6]/20 shadow-xl">
						{/* Mensajes de error de Clerk */}
						{hasErrors && (
							<View className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl mb-4 flex-row items-center">
								<Ionicons
									name="alert-circle"
									size={20}
									color="#ef4444"
									className="mr-2"
								/>
								<Text className="text-red-400 text-sm flex-1">
									{errors.fields.code?.message ||
										errors.fields.emailAddress?.message ||
										errors.fields.password?.message ||
										errors.global?.[0]?.message ||
										"Ha ocurrido un error. Por favor, inténtalo de nuevo."}
								</Text>
							</View>
						)}

						{!conditionVerifyCode ? (
							/* Vista 1: Formulario de Datos Personales */
							<>
								{/* First Name & Last Name */}
								<View className="flex-row gap-3 mb-4">
									<View className="flex-1">
										<Text className="text-slate-300 text-sm font-medium mb-2">
											Nombre
										</Text>
										<View className="flex-row items-center bg-[#04171f] border border-[#1abcb6]/30 rounded-xl px-3.5 py-3 focus:border-[#1abcb6]">
											<TextInput
												value={firstName}
												onChangeText={setFirstName}
												placeholder="Nombre"
												placeholderTextColor="#64748b"
												autoCapitalize="words"
												className="flex-1 text-white text-base mb-2"
											/>
										</View>
									</View>

									<View className="flex-1">
										<Text className="text-slate-300 text-sm font-medium mb-2">
											Apellido
										</Text>
										<View className="flex-row items-center bg-[#04171f] border border-[#1abcb6]/30 rounded-xl px-3.5 py-3 focus:border-[#1abcb6]">
											<TextInput
												value={lastName}
												onChangeText={setLastName}
												placeholder="Apellido"
												placeholderTextColor="#64748b"
												autoCapitalize="words"
												className="flex-1 text-white text-base mb-2"
											/>
										</View>
									</View>
								</View>

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
											value={emailAddress}
											onChangeText={setEmailAddress}
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

								{/* Submit Register Button */}
								<Pressable
									onPress={handlerSignUpPress}
									disabled={isLoading}
									className={`w-full py-4 rounded-xl items-center justify-center flex-row shadow-lg ${
										isLoading
											? "bg-[#1abcb6]/50"
											: "bg-[#1abcb6] active:bg-[#1abcb6]/80"
									}`}
								>
									{isLoading ? (
										<ActivityIndicator color="#04171f" size="small" />
									) : (
										<>
											<Text className="text-[#04171f] font-bold text-base mr-2">
												Registrarse
											</Text>
											<Ionicons
												name="arrow-forward"
												size={18}
												color="#04171f"
											/>
										</>
									)}
								</Pressable>
							</>
						) : (
							/* Vista 2: Confirmación con Código OTP */
							<>
								<View className="mb-6">
									<Text className="text-slate-300 text-sm font-medium mb-2">
										Código de Verificación
									</Text>
									<View className="flex-row items-center bg-[#04171f] border border-[#ffdc5e]/40 rounded-xl px-3.5 py-3 focus:border-[#ffdc5e]">
										<Ionicons
											name="key-outline"
											size={20}
											color="#ffdc5e"
											className="mr-2"
										/>
										<TextInput
											value={code}
											onChangeText={setCode}
											placeholder="Ingresa el código recibido"
											placeholderTextColor="#64748b"
											keyboardType="number-pad"
											className="flex-1 text-white text-base tracking-widest font-mono mb-2"
										/>
									</View>
								</View>

								{/* Verify Button */}
								<Pressable
									onPress={handlerVerifyCodePress}
									disabled={isLoading}
									className={`w-full py-4 rounded-xl items-center justify-center flex-row shadow-lg ${
										isLoading
											? "bg-[#ffdc5e]/50"
											: "bg-[#ffdc5e] active:bg-[#ffdc5e]/80"
									}`}
								>
									{isLoading ? (
										<ActivityIndicator color="#04171f" size="small" />
									) : (
										<Text className="text-[#04171f] font-bold text-base">
											Verificar y Finalizar
										</Text>
									)}
								</Pressable>

								{/* Resend & Cancel Options */}
								<View className="mt-4 flex-row justify-between items-center px-1">
									<Pressable onPress={handlerRetryVerifyCodePress}>
										<Text className="text-[#1abcb6] text-sm font-medium">
											Reenviar código
										</Text>
									</Pressable>

									<Pressable onPress={handlerCancelSignUpPress}>
										<Text className="text-slate-400 text-sm">
											Reiniciar registro
										</Text>
									</Pressable>
								</View>
							</>
						)}
					</View>

					{/* Link to Sign In */}
					{!conditionVerifyCode && (
						<View className="flex-row justify-center mt-8">
							<Text className="text-slate-400 text-base">
								¿Ya tienes una cuenta?{" "}
							</Text>
							<Link href="/sign-in" asChild>
								<Pressable>
									<Text className="text-[#1abcb6] font-bold text-base">
										Inicia sesión
									</Text>
								</Pressable>
							</Link>
						</View>
					)}
				</View>
				<View nativeID="clerk-captcha" />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
