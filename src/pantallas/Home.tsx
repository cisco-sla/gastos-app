import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatearMonto } from "../formato";
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

      <ScrollView style={styles.lista}>
        {gastos.length === 0 ? (
          <Text style={styles.vacio}>Todavia no cargaste gastos.</Text>
        ) : (
          gastos.map((gasto) => (
            <View key={gasto.id} style={styles.fila}>
              <Text style={styles.descripcion}>{gasto.descripcion}</Text>
              <Text style={styles.detalle}>
                ${formatearMonto(gasto.monto)} - {gasto.categoria}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

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
  lista: {
    flex: 1,
    marginBottom: 12,
  },
  fila: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  descripcion: {
    color: colores.texto,
    fontSize: 16,
  },
  detalle: {
    color: colores.textoSecundario,
  },
  vacio: {
    color: colores.textoSecundario,
  },
});
