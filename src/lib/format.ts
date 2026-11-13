export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatCount(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return `${k.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
