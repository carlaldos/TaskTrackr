import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

export default function TaskForm({ title, setTitle, description, setDescription, onSubmit }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        returnKeyType="done"
      />
      <TextInput
        placeholder="Task Description (optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={onSubmit}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}
