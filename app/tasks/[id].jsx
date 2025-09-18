import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../styles/styles";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setTitle(snap.data().title);
        setDescription(snap.data().description);
      }
    };
    fetchTask();
  }, []);

  async function handleUpdate() {
    try {
      await updateDoc(doc(db, "tasks", id), { title, description });
      Alert.alert("Success", "Task updated!");
      router.back();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "tasks", id));
      Alert.alert("Deleted", "Task removed");
      router.replace("/tasks");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
