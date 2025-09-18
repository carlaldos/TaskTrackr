import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import styles from "../../styles/styles";
import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return; // wait for authenticated user
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("owner", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.warn("tasks snapshot error", err);
    });
    return unsub;
  }, [user]);

  async function handleAdd() {
    if (!title || !title.trim()) return Alert.alert("Validation", "Task title required");
    if (!user) return Alert.alert("Error", "You must be logged in to add tasks");

    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: (description || "").trim(),
        owner: user.uid,
        completed: false,
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error("add task error:", e);
      Alert.alert("Error adding task", e.message || String(e));
    }
  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📋 My Tasks</Text>

      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        onSubmit={handleAdd}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onEdit={() => router.push(`/tasks/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No tasks yet</Text>}
      />

      <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
