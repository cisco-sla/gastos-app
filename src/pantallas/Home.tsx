import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { formatearMonto } from "../formato";
import type { Gasto } from "../tipos";
import { colores } from "../tema";

type Props = {
  gastos: Gasto[];
  onNuevoGasto: () => void;
  onEliminar: (id: number) => void;
};

export default function Home({ gastos, onNuevoGasto, onEliminar }: Props) {
  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);

  let masAlto: Gasto | null = null;
  for (const gasto of gastos) {
    if (masAlto === null || gasto.monto > masAlto.monto) {
      masAlto = gasto;
    }
  }

  function confirmarEliminar(gasto: Gasto) {
    Alert.alert(
      "Eliminar gasto",
      `¿Eliminar "${gasto.descripcion}" por $${formatearMonto(gasto.monto)}?`,
      [
        { text: "Cancelar" },
        { text: "Eliminar", onPress: () => onEliminar(gasto.id) },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestor de Gastos</Text>
      <Text style={styles.texto}>Total gastado: ${formatearMonto(total)}</Text>
      <Text style={styles.texto}>Cantidad de gastos: {gastos.length}</Text>
      {masAlto !== null && (
        <Text style={styles.texto}>
          Gasto más alto: {masAlto.descripcion}, $
          {formatearMonto(masAlto.monto)}
        </Text>
      )}
      <ScrollView style={styles.lista}>
        {gastos.length === 0 ? (
          <Text style={styles.vacio}>Todavia no cargaste gastos.</Text>
        ) : (
          gastos.map((gasto) => (
            <View key={gasto.id} style={styles.fila}>
              <View style={styles.datos}>
                <Text style={styles.descripcion}>{gasto.descripcion}</Text>
                <Text style={styles.detalle}>
                  ${formatearMonto(gasto.monto)} - {gasto.categoria}
                </Text>
              </View>
              <Pressable onPress={() => confirmarEliminar(gasto)}>
                <Text style={styles.eliminar}>Eliminar</Text>
              </Pressable>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  datos: {
    flex: 1,
  },
  descripcion: {
    color: colores.texto,
    fontSize: 16,
  },
  detalle: {
    color: colores.textoSecundario,
  },
  eliminar: {
    color: colores.warning,
    padding: 8,
  },
  vacio: {
    color: colores.textoSecundario,
  },
});
