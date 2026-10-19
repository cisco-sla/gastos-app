import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { colores } from "../tema";

type Props = {
  onVolver: () => void;
};

export default function NuevoGasto({ onVolver }: Props) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Gasto</Text>

      <Text style={styles.etiqueta}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={(texto) => setDescripcion(texto)}
        placeholder="Ej. Alimentos y bebidas"
        placeholderTextColor={colores.textoSecundario}
      />

      <Text style={styles.etiqueta}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={monto}
        onChangeText={(texto) => setMonto(texto)}
        placeholder="Ej. 15000"
        placeholderTextColor={colores.textoSecundario}
        keyboardType="numeric"
      />

      <Text style={styles.texto}>
        Vista previa: {descripcion} - ${monto}
      </Text>

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
  texto: {
    color: colores.texto,
    marginBottom: 16,
  },
});
