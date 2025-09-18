import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "expo-router";
import styles from "../styles/styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/tasks");
    } catch (e) {
      Alert.alert("Login failed", e.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
  <Text style={styles.title}>🔐 Task Trackr</Text>

  <TextInput
    style={styles.input}
    placeholder="Enter your email"
    placeholderTextColor="#94a3b8"
    value={email}
    onChangeText={setEmail}
  />
  <TextInput
    style={styles.input}
    placeholder="Enter your password"
    placeholderTextColor="#94a3b8"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />

  <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("/signup")}>
    <Text style={styles.buttonText}>Create Account</Text>
  </TouchableOpacity>
</SafeAreaView>

  );
}
