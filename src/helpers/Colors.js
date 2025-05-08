export default function Colors() {
  const colors = [];
  const limit = Number(import.meta.env.VITE_AGE_LIMIT) | 99;

  do {
    const color = "hsl(" + ~~(Math.random() * 360) + ", 100%, 25%)";
    if (!colors.includes(color)) {
      colors.push(color);
    }
  } while (colors.length < limit + 1);

  return colors;
}
