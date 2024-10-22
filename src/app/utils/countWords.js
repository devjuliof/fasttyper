export default function countWords(text) {
  const words = text.trim().split(/\s+/);
  return words.filter((word) => word.length > 0).length;
}
