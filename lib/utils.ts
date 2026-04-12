import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';

// Utility for conditional class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format ISO date string for display
export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMMM d, yyyy');
  } catch {
    return dateStr;
  }
}

// Truncate long strings with ellipsis
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
}

// Validate admin secret from request headers
export function isAdminRequest(request: Request): boolean {
  const secret = request.headers.get('x-admin-secret');
  return secret === process.env.ADMIN_SECRET_KEY;
}

// Simple rate limiting map (in-memory, resets on server restart)
// For production, use Redis or Upstash
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (record.count >= maxRequests) {
    return false; // rate limited
  }

  record.count++;
  return true; // allowed
}