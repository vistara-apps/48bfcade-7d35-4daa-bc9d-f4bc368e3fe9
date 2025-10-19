// USDC on Base configuration
export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Payment configuration for x402
// X402Config is optional and can be used to customize RPC URLs
export const X402_CONFIG = undefined; // Use default x402 configuration

// Product pricing in USDC (6 decimals)
export function parseUSDCAmount(usdAmount: number): bigint {
  return BigInt(Math.floor(usdAmount * 1_000_000));
}
