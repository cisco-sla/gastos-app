import { useState } from "react";
import Home from "../pantallas/Home";
import NuevoGasto from "../pantallas/NuevoGasto";
import type { Gasto } from "../tipos";

export default function Index() {
  const [pantalla, setPantalla] = useState("home");
  const [gastos, setGastos] = useState<Gasto[]>([]);

  function agregarGasto(gasto: Gasto) {
    setGastos([...gastos, gasto]);
  }

  function eliminarGasto(id: number) {
    setGastos(gastos.filter((gasto) => gasto.id !== id));
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
