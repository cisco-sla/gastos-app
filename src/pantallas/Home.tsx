import { Button, StyleSheet, Text, View } from "react-native";
import type { Gasto } from "../tipos";
import { colores } from "../tema";

type Props = {
  gastos: Gasto[];
  onNuevoGasto: () => void;
};

export default function Home({ gastos, onNuevoGasto }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestor de Gastos</Text>
      <Text style={styles.texto}>Total gastado: $0</Text>
      <Text style={styles.texto}>Cantidad de gastos: {gastos.length}</Text>
      <Button
        title="Nuevo Gasto"
        onPress={onNuevoGasto}
        color={colores.acento}
      />
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
