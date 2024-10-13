import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Ticker from "./components/ticker";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState(12351);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Ticker value={value} fontSize={120} />
      <Button
        title="Random value"
        onPress={() => setValue(Math.floor(Math.random() * 99900) / 100)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
