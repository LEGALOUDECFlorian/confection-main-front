export default function currencyFormat(value) {
  return new Intl.NumberFormat("fr", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
