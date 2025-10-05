/**
 * Calculate estimated reading time for content
 * @param content - The text content to calculate reading time for
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  if (!content || typeof content !== 'string') {
    return 0;
  }

  // Remove HTML tags and extra whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Count words (split by spaces)
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;

  // Calculate reading time in minutes
  const readingTimeMinutes = wordCount / wordsPerMinute;

  // Round up to nearest minute (minimum 1 minute)
  return Math.max(1, Math.ceil(readingTimeMinutes));
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 0) return '0 min read';
  return `${minutes} min read`;
}
