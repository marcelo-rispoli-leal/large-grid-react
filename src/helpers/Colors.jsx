export default function Colors() {
  const colors = [];

  do {
    const color = "hsl(" + ~~(Math.random() * 360) + ", 100%, 25%)";
    if (!colors.includes(color)) {
      colors.push(color);
    }
  } while (colors.length < 100);

  return colors;
}
