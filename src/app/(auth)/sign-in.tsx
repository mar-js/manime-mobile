import { useSignIn } from "@clerk/expo";
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

export default function SignIn() {
	const { signIn, errors, fetchStatus } = useSignIn();
	const router = useRouter();
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
	const conditionVerifyCode =
		!forceReset && signIn?.status === "needs_client_trust";

	const handlerSignInPress = async () => {
		if (!signIn) return;
		setForceReset(false);

		const { error } = await signIn.password({
			emailAddress,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		if (signIn.status === "complete") {
			await signIn.finalize({
				navigate: ({ session, decorateUrl }) => {
					if (session?.currentTask) {
						session?.currentTask;
						return;
					}

					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
			return;
		}

		if (signIn.status === "needs_second_factor") {
			await signIn.mfa.sendPhoneCode();
			return;
		}

		if (signIn.status === "needs_client_trust") {
			const emailCodeFactor = signIn.supportedFirstFactors.find(
				(factor) => factor.strategy === "email_code",
			);

			if (emailCodeFactor) {
				await signIn.mfa.sendEmailCode();
			}

			return;
		} else {
			alert(`Sign in attempt not complete ${signIn}`);
		}
	};

	const handlerVerifyCodePress = async () => {
		if (!signIn) return;
		await signIn.mfa.verifyEmailCode({ code });

		if (signIn.status === "complete") {
			await signIn.finalize({
				navigate: ({ session, decorateUrl }) => {
					if (session?.currentTask) {
						return;
					}

					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
		} else {
			alert(`Sign in attempt not complete ${signIn}`);
		}
	};

	const handlerRetryVerifyCodePress = () => {
		signIn?.mfa.sendEmailCode();
	};

	const handlerCancelSignUpPress = () => {
		setEmailAddress("");
		setPassword("");
		setCode("");
		setForceReset(true);
		signIn?.reset();
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
							<Ionicons
								name={
									conditionVerifyCode
										? "shield-checkmark-outline"
										: "log-in-outline"
								}
								size={32}
								color={conditionVerifyCode ? "#ffdc5e" : "#1abcb6"}
							/>
						</View>
						<Text className="text-3xl font-bold text-white tracking-tight">
							{conditionVerifyCode ? "Verificar Dispositivo" : "Bienvenido"}
						</Text>
						<Text className="text-slate-400 text-base mt-1 text-center">
							{conditionVerifyCode
								? `Ingresa el código enviado a ${emailAddress || "tu correo"}`
								: "Ingresa tus credenciales para acceder a Manime"}
						</Text>
					</View>

					{/* Form Card */}
					<View className="bg-[#0b3141] p-6 rounded-3xl border border-[#1abcb6]/20 shadow-xl">
						{/* Mensaje de Errores de Clerk */}
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
										errors.fields.identifier?.message ||
										errors.fields.password?.message ||
										errors.global?.[0]?.message ||
										"Ha ocurrido un error. Por favor, inténtalo de nuevo."}
								</Text>
							</View>
						)}

						{!conditionVerifyCode ? (
							/* Vista 1: Formulario de Inicio de Sesión Estándar */
							<>
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

								{/* Submit Button */}
								<Pressable
									onPress={handlerSignInPress}
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
												Iniciar Sesión
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
							/* Vista 2: Formulario para ingresar código OTP (needs_client_trust) */
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
											Verificar Dispositivo
										</Text>
									)}
								</Pressable>

								{/* Actions: Resend & Cancel */}
								<View className="mt-4 flex-row justify-between items-center px-1">
									<Pressable onPress={handlerRetryVerifyCodePress}>
										<Text className="text-[#1abcb6] text-sm font-medium">
											Reenviar código
										</Text>
									</Pressable>

									<Pressable onPress={handlerCancelSignUpPress}>
										<Text className="text-slate-400 text-sm">Cancelar</Text>
									</Pressable>
								</View>
							</>
						)}
					</View>

					{/* Link to Sign Up */}
					{!conditionVerifyCode && (
						<View className="flex-row justify-center mt-8">
							<Text className="text-slate-400 text-base">
								¿No tienes una cuenta?{" "}
							</Text>
							<Link href="/sign-up" asChild>
								<Pressable>
									<Text className="text-[#ffdc5e] font-bold text-base">
										Regístrate aquí
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
