export function getRandomPastelColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let r = (hash & 0xff0000) >> 16;
  let g = (hash & 0x00ff00) >> 8;
  let b = hash & 0x0000ff;

  const adjustToPastel = (color: number) => Math.floor((color + 255) / 2);

  r = adjustToPastel(r);
  g = adjustToPastel(g);
  b = adjustToPastel(b);

  return `rgb(${r}, ${g}, ${b})`;
}
