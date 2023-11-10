export function extractIValueFromUrl(url: string | undefined, pattern: RegExp): string | null {
  if (!url) return null;

  const match = url.match(pattern);

  if (match) {
    const extractedNumber = match[1];
    return extractedNumber;
  } else {
    return null;
  }
}
