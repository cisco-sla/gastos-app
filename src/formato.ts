export function formatearMonto(monto: number): string {
  return Math.round(monto)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
