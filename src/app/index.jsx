import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Home from "../pantallas/Home";
import NuevoGasto from "../pantallas/NuevoGasto";

const CLAVE = "gastos";

async function guardar(lista) {
  try {
    await AsyncStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch (error) {
    console.log("Error al guardar los gastos:", error);
  }
}

export default function Index() {
  const [pantalla, setPantalla] = useState("home");
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    async function cargar() {
      try {
        const texto = await AsyncStorage.getItem(CLAVE);
        if (texto !== null) {
          setGastos(JSON.parse(texto));
        }
      } catch (error) {
        console.log("Error al leer los gastos:", error);
      }
    }
    cargar();
  }, []);

  function agregarGasto(gasto) {
    const nuevos = [...gastos, gasto];
    setGastos(nuevos);
    guardar(nuevos);
  }

  function eliminarGasto(id) {
    const nuevos = gastos.filter((gasto) => gasto.id !== id);
    setGastos(nuevos);
    guardar(nuevos);
  }

  if (pantalla === "carga") {
    return (
      <NuevoGasto
        onVolver={() => setPantalla("home")}
        onAgregar={agregarGasto}
      />
    );
  }

  return (
    <Home
      gastos={gastos}
      onNuevoGasto={() => setPantalla("carga")}
      onEliminar={eliminarGasto}
    />
  );
}
