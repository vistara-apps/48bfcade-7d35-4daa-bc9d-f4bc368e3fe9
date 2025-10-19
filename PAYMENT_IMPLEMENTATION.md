# x402 Payment Flow Implementation

This document describes the x402 payment integration for Cement Canvas marketplace.

## Overview

The payment system uses:
- **wagmi** for wallet connection and management
- **x402-axios** for HTTP 402 payment interception
- **USDC on Base** as the payment token
- **OnchainKit** for Coinbase wallet integration

## Architecture

### Components

1. **PaymentButton.tsx** - Main payment UI component
   - Handles wallet connection
   - Processes payments via x402
   - Shows transaction status and confirmations
   - Error handling and retry logic

2. **ProductCard.tsx** - Product display with payment integration
   - Displays product information
   - Integrates PaymentButton
   - Handles payment success/error callbacks

3. **Providers.tsx** - React context providers
   - WagmiProvider for wallet management
   - QueryClientProvider for data fetching
   - OnchainKitProvider for Coinbase integration

### API Routes

1. **POST /api/purchase**
   - Receives product purchase requests
   - Returns 402 Payment Required
   - x402-axios intercepts and handles payment
   - Includes payment metadata (amount, token, recipient)

2. **POST /api/verify-payment**
   - Verifies on-chain transactions
   - Checks transaction status
   - Returns confirmation details
   - Used after payment completion

## Payment Flow

1. User clicks "Pay X USDC" button
2. If not connected, wallet connection is initiated
3. Payment request sent to `/api/purchase`
4. API returns 402 with payment details
5. x402-axios intercepts and initiates on-chain payment
6. User approves transaction in wallet
7. Transaction is broadcast to Base network
8. Transaction hash is returned to client
9. Payment verification runs
10. Success state displayed with BaseScan link

## Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# Payment recipient address (your wallet)
NEXT_PUBLIC_PAYMENT_RECIPIENT=0xYourWalletAddress
PAYMENT_RECIPIENT_ADDRESS=0xYourWalletAddress

# x402 API URL (optional)
NEXT_PUBLIC_X402_API_URL=https://api.x402.com
```

### Constants

See `lib/payment-config.ts`:
- USDC Base address: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Chain ID: 8453 (Base mainnet)
- Decimals: 6 (USDC)

## Testing

### Prerequisites

1. Coinbase Wallet or compatible wallet
2. Base network added to wallet
3. USDC on Base for testing payments
4. OnchainKit API key

### Test Checklist

- [ ] Wallet connection works
- [ ] Payment button shows correct amount
- [ ] Transaction is created on Base
- [ ] Transaction hash is captured
- [ ] Confirmation shows BaseScan link
- [ ] Error states display correctly
- [ ] Retry works after failure
- [ ] Multiple payments can be made

### Manual Testing Steps

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to products tab**
   - Should see 3 sample products
   - Each has a "Connect Wallet" or "Pay X USDC" button

3. **Connect wallet**
   - Click button
   - Coinbase Wallet should prompt
   - Approve connection

4. **Make a payment**
   - Click "Pay X USDC"
   - Approve USDC allowance (if first time)
   - Approve transaction
   - Wait for confirmation

5. **Verify transaction**
   - Success message should appear
   - BaseScan link should be clickable
   - Transaction should be visible on BaseScan

## Error Handling

### Implemented Error Cases

1. **Wallet Connection Failure**
   - User rejects connection
   - No wallet installed
   - Network mismatch

2. **Payment Failure**
   - Insufficient USDC balance
   - User rejects transaction
   - Network congestion
   - RPC errors

3. **Verification Failure**
   - Transaction not found
   - Failed transaction status
   - Verification timeout

### User Experience

- All errors show user-friendly messages
- Failed payments allow retry
- Transaction status updates in real-time
- Loading states for all async operations

## Security Considerations

1. **On-Chain Verification**
   - All payments verified on Base blockchain
   - Transaction receipts checked
   - Token address validated

2. **Amount Validation**
   - Amounts parsed with proper decimals
   - BigInt used for precision
   - No floating point math

3. **Address Validation**
   - Recipient address configured via env
   - Token address is constant (USDC)
   - Checksummed addresses used

## Production Checklist

Before deploying to production:

- [ ] Set proper OnchainKit API key
- [ ] Configure payment recipient address
- [ ] Set up proper RPC endpoints
- [ ] Implement order database
- [ ] Add fulfillment workflow
- [ ] Enable transaction monitoring
- [ ] Set up error alerting
- [ ] Add rate limiting
- [ ] Implement proper logging
- [ ] Test on Base testnet first
- [ ] Audit payment flow
- [ ] Set up customer support

## Monitoring

### Recommended Metrics

1. Payment success rate
2. Transaction confirmation time
3. Failed transaction reasons
4. User wallet connection rate
5. Average payment amount
6. Network gas costs

### Logging

Key events to log:
- Payment initiated
- Transaction broadcast
- Transaction confirmed
- Verification completed
- Errors at each stage

## Support

For issues or questions:
- x402 docs: https://docs.x402.com
- wagmi docs: https://wagmi.sh
- OnchainKit docs: https://onchainkit.xyz
- Base docs: https://docs.base.org

## License

MIT
