import { murmur3 } from "murmurhash-js";

export const pastelColors = [
  "#77dd77", // Pastel Green (rgb(119, 221, 119))
  "#cea2fd", // Pastel Lilac (rgb(206, 162, 253))
  "#ffb347", // Pastel Orange (rgb(255, 179, 71))
  "#ff6961", // Pastel Red (rgb(255, 105, 97))
  "#ffd1dc", // Pastel Pink (rgb(255, 209, 220))
  "#aec6cf", // Pastel Blue (rgb(174, 198, 207))
  "#ffd700", // Pastel Gold (rgb(255, 215, 0))
  "#8fd4be", // Pastel Teal (rgb(143, 212, 190))
  "#ffcc99", // Pastel Peach (rgb(255, 204, 153))
  "#b19cd9", // Pastel Purple (rgb(177, 156, 217))
  "#bdfcc9", // Pastel Mint (rgb(189, 252, 201))
  "#aeeeee", // Pastel Cyan (rgb(174, 238, 238))
  "#fdfd96", // Pastel Yellow (rgb(253, 253, 150))
  "#ffb6c1", // Pastel Light Pink (rgb(255, 182, 193))
  "#c6e2ff", // Pastel Light Blue (rgb(198, 226, 255))
  "#e6e6fa", // Pastel Lavender (rgb(230, 230, 250))
  "#f5deb3", // Pastel Wheat (rgb(245, 222, 179))
  "#fafad2", // Pastel Light Goldenrod (rgb(250, 250, 210))
  "#e0ffff", // Pastel Light Cyan (rgb(224, 255, 255))
  "#ffe4e1", // Pastel Misty Rose (rgb(255, 228, 225))
  "#ffdab9", // Pastel Peach Puff (rgb(255, 218, 185))
  "#d3ffce", // Pastel Light Green (rgb(211, 255, 206))
];

const MAX_INT_32 = Math.pow(2, 32);

export const getPastelColor = (title: string, colors = pastelColors) => {
  const pastelColorsLength = colors.length;
  const hash = murmur3(title);
  const percent = hash / MAX_INT_32;
  const index = Math.round(percent * pastelColorsLength);

  return colors[index];
};

export const getPasterColorsForTitles = (titles: string[]) => {
  if (titles.length === 1) {
    return { [titles[0]]: getPastelColor(titles[0], pastelColors.slice(0, 8)) };
  }

  const sortedTitles = titles.sort();

  return Object.fromEntries(
    sortedTitles.map((title, index) => [
      title,
      pastelColors.length > index ? pastelColors[index] : getPastelColor(title),
    ])
  );
};
