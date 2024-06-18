export default function format(obj: Object) {
  return Object.entries(obj)
    .map(([key, value]) => value)
    .join("\n");
}
