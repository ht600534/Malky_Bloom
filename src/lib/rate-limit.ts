const requestLog = new Map<string, number[]>();

export function hitRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const history = requestLog.get(key) ?? [];
  const validHits = history.filter((timestamp) => now - timestamp < windowMs);

  if (validHits.length >= limit) {
    requestLog.set(key, validHits);
    return true;
  }

  validHits.push(now);
  requestLog.set(key, validHits);
  return false;
}
