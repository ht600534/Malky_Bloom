/**
 * בודק האם URL הוא קישור של Google Drive.
 */
export function isGoogleDriveUrl(input: string): boolean {
  return /drive\.google\.com\/file\/d\//.test(input);
}

/**
 * ממיר קישורי Google Drive לקישור ישיר.
 *
 * Google Drive:
 *   https://drive.google.com/file/d/FILE_ID/view
 *   → https://drive.google.com/uc?export=view&id=FILE_ID
 */
export function normalizeImageUrl(input: string): string {
  const trimmed = input.trim();

  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  return trimmed;
}

