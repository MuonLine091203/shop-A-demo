export function MoneyChanging(priceCents) {
  return (priceCents / 100).toFixed(2);
}