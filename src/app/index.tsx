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

  if (pantalla === "carga") {
    return (
      <NuevoGasto
        onVolver={() => setPantalla("home")}
        onAgregar={agregarGasto}
      />
    );
  }

  return <Home gastos={gastos} onNuevoGasto={() => setPantalla("carga")} />;
}
