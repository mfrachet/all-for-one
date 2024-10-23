export const pastelColors = [
  "#ffd1dc", // Pastel Pink (rgb(255, 209, 220))
  "#aec6cf", // Pastel Blue (rgb(174, 198, 207))
  "#77dd77", // Pastel Green (rgb(119, 221, 119))
  "#fdfd96", // Pastel Yellow (rgb(253, 253, 150))
  "#b19cd9", // Pastel Purple (rgb(177, 156, 217))
  "#ffb347", // Pastel Orange (rgb(255, 179, 71))
  "#ff6961", // Pastel Red (rgb(255, 105, 97))
  "#bdfcc9", // Pastel Mint (rgb(189, 252, 201))
  "#cea2fd", // Pastel Lilac (rgb(206, 162, 253))
  "#aeeeee", // Pastel Cyan (rgb(174, 238, 238))
  "#ffcc99", // Pastel Peach (rgb(255, 204, 153))
  "#8fd4be", // Pastel Teal (rgb(143, 212, 190))
];

export const getRandomPastelColors = (num: number) => {
  // Ensure that the number requested does not exceed available colors
  const maxColors = Math.min(num, pastelColors.length);

  // Shuffle the pastelColors array
  const shuffledColors = [...pastelColors].sort(() => Math.random() - 0.5);

  // Return the first 'num' colors from the shuffled array
  return shuffledColors.slice(0, maxColors);
};

export function getRandomPastelColor(str: string) {
  // Create a simple hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to RGB values
  let r = (hash >> 16) & 0xff;
  let g = (hash >> 8) & 0xff;
  let b = hash & 0xff;

  // Blend with white to get a pastel color
  r = Math.floor((r + 255) / 2);
  g = Math.floor((g + 255) / 2);
  b = Math.floor((b + 255) / 2);

  // Add randomness to the pastel color
  const randomness = () => Math.floor(Math.random() * 30) - 15; // Random offset between -15 and 15
  r = Math.min(255, Math.max(0, r + randomness()));
  g = Math.min(255, Math.max(0, g + randomness()));
  b = Math.min(255, Math.max(0, b + randomness()));

  return `rgb(${r}, ${g}, ${b})`;
}
