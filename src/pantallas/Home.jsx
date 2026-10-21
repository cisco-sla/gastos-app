import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CATEGORIAS } from "../categorias";
import { formatearMonto } from "../formato";
import { colores } from "../tema";

export default function Home({ gastos, onNuevoGasto, onEliminar }) {
  const [filtro, setFiltro] = useState("Todas");

  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);

  let masAlto = null;
  for (const gasto of gastos) {
    if (masAlto === null || gasto.monto > masAlto.monto) {
      masAlto = gasto;
    }
  }

  const porCategoria = CATEGORIAS.map((categoria) => {
    const monto = gastos
      .filter((gasto) => gasto.categoria === categoria)
      .reduce((suma, gasto) => suma + gasto.monto, 0);
    return { categoria, monto };
  });

  const categoriasConGasto = porCategoria
    .filter((item) => item.monto > 0)
    .sort((a, b) => b.monto - a.monto);

  const maximoCategoria = Math.max(
    ...porCategoria.map((item) => item.monto),
    1,
  );

  const opcionesFiltro = ["Todas", ...CATEGORIAS];

  const gastosFiltrados =
    filtro === "Todas"
      ? gastos
      : gastos.filter((gasto) => gasto.categoria === filtro);

  function confirmarEliminar(gasto) {
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
      <ScrollView style={styles.contenido}>
        <Text style={styles.titulo}>Gestor de Gastos</Text>
        <Text style={styles.texto}>
          Total gastado: ${formatearMonto(total)}
        </Text>
        <Text style={styles.texto}>Cantidad de gastos: {gastos.length}</Text>
        {masAlto !== null && (
          <Text style={styles.texto}>
            Gasto más alto: {masAlto.descripcion}, $
            {formatearMonto(masAlto.monto)}
          </Text>
        )}

        {categoriasConGasto.length > 0 && (
          <View style={styles.bloque}>
            <Text style={styles.subtitulo}>Gasto por categoría</Text>
            {categoriasConGasto.map((item) => (
              <View key={item.categoria} style={styles.categoriaFila}>
                <View style={styles.categoriaTexto}>
                  <Text style={styles.detalle}>{item.categoria}</Text>
                  <Text style={styles.detalle}>
                    ${formatearMonto(item.monto)}
                  </Text>
                </View>
                <View style={styles.barraFondo}>
                  <View
                    style={[
                      styles.barra,
                      { width: `${(item.monto / maximoCategoria) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {gastos.length > 0 && (
          <View style={styles.bloque}>
            <Text style={styles.subtitulo}>Filtrar por categoría</Text>
            <View style={styles.filtros}>
              {opcionesFiltro.map((opcion) => (
                <Pressable
                  key={opcion}
                  onPress={() => setFiltro(opcion)}
                  style={[styles.chip, filtro === opcion && styles.chipActivo]}
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      filtro === opcion && styles.chipTextoActivo,
                    ]}
                  >
                    {opcion}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.subtitulo}>Gastos</Text>
        {gastos.length === 0 ? (
          <Text style={styles.vacio}>Todavía no cargaste gastos.</Text>
        ) : gastosFiltrados.length === 0 ? (
          <Text style={styles.vacio}>No hay gastos en esta categoría.</Text>
        ) : (
          gastosFiltrados.map((gasto) => (
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
  contenido: {
    flex: 1,
    marginBottom: 12,
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
  bloque: {
    marginBottom: 16,
  },
  subtitulo: {
    color: colores.textoSecundario,
    marginBottom: 6,
  },
  categoriaFila: {
    marginBottom: 8,
  },
  categoriaTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barraFondo: {
    height: 6,
    backgroundColor: colores.superficie,
    borderRadius: 3,
  },
  barra: {
    height: 6,
    backgroundColor: colores.acento,
    borderRadius: 3,
  },
  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipActivo: {
    borderColor: colores.acento,
    backgroundColor: colores.acentoSuave,
  },
  chipTexto: {
    color: colores.texto,
  },
  chipTextoActivo: {
    color: colores.acento,
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
    color: colores.peligro,
    padding: 8,
  },
  vacio: {
    color: colores.textoSecundario,
  },
});
