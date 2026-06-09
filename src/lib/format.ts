import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date: Date | string | number): string {
  return format(new Date(date), "MMM dd, yyyy");
}

export function formatDateTime(date: Date | string | number): string {
  return format(new Date(date), "MMM dd, yyyy 'at' h:mm a");
}

export function formatRelativeTime(date: Date | string | number): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatScore(score: number): string {
  return `${Math.round(score)}/100`;
}
