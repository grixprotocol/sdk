/**
 * Formats a trade window milliseconds value into a human-readable string
 *
 * @param trade_window_ms - Time in milliseconds
 * @returns Formatted string like "3 days" or "4 hours"
 */
export function formatTradeWindow(trade_window_ms: number): string {
  const minutes = trade_window_ms / (1000 * 60);
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 1) {
    return `${Math.round(days)} day${days !== 1 ? 's' : ''}`;
  } else if (hours >= 1) {
    return `${Math.round(hours)} hour${hours !== 1 ? 's' : ''}`;
  } else {
    return `${Math.round(minutes)} minute${minutes !== 1 ? 's' : ''}`;
  }
}
