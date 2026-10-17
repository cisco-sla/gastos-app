import { useState } from "react";
import Home from "../pantallas/Home";
import NuevoGasto from "../pantallas/NuevoGasto";

export default function Index() {
  const [pantalla, setPantalla] = useState("home");

  if (pantalla === "carga") {
    return <NuevoGasto onVolver={() => setPantalla("home")} />;
  }

  return <Home onNuevoGasto={() => setPantalla("carga")} />;
}
