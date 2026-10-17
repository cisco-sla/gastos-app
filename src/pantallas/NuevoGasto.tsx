import { Button, StyleSheet, Text, View } from "react-native";
import { colores } from "../tema";

type Props = {
  onVolver: () => void;
};

export default function NuevoGasto({ onVolver }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Gasto</Text>
      <Text style={styles.texto}>Acá va el formulario.</Text>
      <Button title="Volver" onPress={onVolver} color={colores.acento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: colores.fondo,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: colores.texto,
  },
  texto: {
    color: colores.texto,
    marginBottom: 16,
  },
});
