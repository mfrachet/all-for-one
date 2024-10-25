export function formatSQL(query: string) {
  return query
    .replace(/\s+/g, " ") // Remove extra whitespace
    .replace(/\b(SELECT|FROM|WHERE|ORDER BY)\b/g, "\n$1") // Add newline before keywords
    .trim(); // Trim leading/trailing whitespace
}
