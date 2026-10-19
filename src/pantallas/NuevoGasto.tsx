import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Categorias } from "../categorias";
import { colores } from "../tema";
import type { Gasto } from "../tipos";

type Props = {
  onVolver: () => void;
  onAgregar: (gasto: Gasto) => void;
};

export default function NuevoGasto({ onVolver, onAgregar }: Props) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState(Categorias[0]);

  function agregar() {
    const montoNumero = Number(monto.replace(",", "."));

    if (descripcion.trim() === "" || isNaN(montoNumero) || montoNumero <= 0) {
      Alert.alert(
        "Faltan datos",
        "Completá la descripción y un monto mayor a 0",
      );
      return;
    }

    onAgregar({
      id: Date.now(),
      descripcion: descripcion.trim(),
      monto: montoNumero,
      categoria: categoria,
      fecha: new Date().toISOString(),
    });

    setDescripcion("");
    setMonto("");
    setCategoria(Categorias[0]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Gasto</Text>

      <Text style={styles.etiqueta}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={(texto) => setDescripcion(texto)}
        placeholder="Ej. Alimentos"
        placeholderTextColor={colores.textoSecundario}
      />

      <Text style={styles.etiqueta}>Monto</Text>
      <TextInput
        style={styles.input}
        value={monto}
        onChangeText={(texto) => setMonto(texto)}
        placeholder="Ej. 15000"
        placeholderTextColor={colores.textoSecundario}
        keyboardType="numeric"
      />

      <Text style={styles.etiqueta}>Categoría</Text>
      <View style={styles.categorias}>
        {Categorias.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipActivo]}
          >
            <Text
              style={[
                styles.chipTexto,
                categoria === cat && styles.chipTextoActivo,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.boton}>
        <Button
          title="Agregar gasto"
          onPress={agregar}
          color={colores.acento}
        />
      </View>
      <Button title="Volver" onPress={onVolver} color={colores.borde} />
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
    marginBottom: 16,
    color: colores.texto,
  },
  etiqueta: {
    color: colores.textoSecundario,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    padding: 12,
    color: colores.texto,
    marginBottom: 12,
  },
  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
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
  boton: {
    marginBottom: 12,
  },
  texto: {
    color: colores.texto,
    marginBottom: 16,
  },
});
