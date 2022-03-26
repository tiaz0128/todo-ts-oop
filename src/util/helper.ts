export function makeUniqueId() {
  return String(
    parseInt(String(new Date().getMilliseconds() * Math.random() * 1000000), 10)
  );
}
