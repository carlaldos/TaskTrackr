import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import styles from "../styles/styles";

export default function TaskItem({ item, onEdit }) {
  async function toggleComplete() {
    try {
      await updateDoc(doc(db, "tasks", item.id), { completed: !item.completed });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  function handleDelete() {
    Alert.alert("Delete", "Delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "tasks", item.id));
          } catch (e) {
            Alert.alert("Error", e.message);
          }
        },
      },
    ]);
  }

  return (
    <View style={[styles.taskItem, item.completed && styles.taskDone]}>
      <TouchableOpacity style={{ flex: 1 }} onPress={toggleComplete}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        {item.description ? <Text style={styles.taskDesc}>{item.description}</Text> : null}
      </TouchableOpacity>

      <View style={{ justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonDanger, { marginTop: 8, paddingVertical: 6 }]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
