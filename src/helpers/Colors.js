//This function returns the random color for each age
export default function Colors() {
  const colors = [];
  const limit = ~~Number(import.meta.env.VITE_AGE_LIMIT);
  const ageMax = limit >= 0 && limit <= 359 ? limit : 99;

  do {
    const color = "hsl(" + ~~(Math.random() * 360) + ", 100%, 25%)";
    if (!colors.includes(color)) {
      colors.push(color);
    }
  } while (colors.length < ageMax + 1); // Added 1 to max age for zero age

  return colors;
}
