export function getRandomPastelColor(str: string) {
  // Hash the string to create a numeric value
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash into an RGB color, adjust for pastel tones
  let r = (hash & 0xff0000) >> 16;
  let g = (hash & 0x00ff00) >> 8;
  let b = hash & 0x0000ff;

  // Function to lighten the color towards pastel
  const adjustToPastel = (color) => Math.floor((color + 255) / 2);

  // Adjust the colors
  r = adjustToPastel(r);
  g = adjustToPastel(g);
  b = adjustToPastel(b);

  // Return the color in hex format
  return `rgb(${r}, ${g}, ${b})`;
}
