export default function Colors() {
  const colors = [];
  for (let i = 0; i < 100; i++) {
    colors.push({
      age: i,
      color: 'hsl(' + ~~(Math.random() * 360) + ', 70%, 30%)',
    });
  }
  return colors;
}
