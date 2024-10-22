export function getRandomPastelColor() {
  const randomValue = () => Math.floor(Math.random() * 128 + 127); // ensures light colors (pastels)
  const red = randomValue();
  const green = randomValue();
  const blue = randomValue();
  return `rgb(${red}, ${green}, ${blue})`;
}
