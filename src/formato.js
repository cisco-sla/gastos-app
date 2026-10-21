export function formatearMonto(monto) {
  return Math.round(monto)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
