export type PriceSegment = 'low' | 'medium' | 'high';

export const PRICE_SEGMENT_RANGES: Record<PriceSegment, { gte: number; lte: number }> = {
  low: { gte: 100, lte: 300 },
  medium: { gte: 301, lte: 700 },
  high: { gte: 701, lte: 1000 },
};

/**
 * Get segment name from a price number.
 */
export function getPriceSegment(price: number): PriceSegment {
  if (price <= PRICE_SEGMENT_RANGES.low.lte) return 'low';
  if (price <= PRICE_SEGMENT_RANGES.medium.lte) return 'medium';
  
  return 'high';
}
