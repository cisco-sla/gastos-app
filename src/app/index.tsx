import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestor de gastos</Text>
      <Text style={styles.texto}>Total gastado: $0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  texto: {
    color: "#000000",
  },
});
