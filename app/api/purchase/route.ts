import { NextRequest, NextResponse } from 'next/server';
import { USDC_BASE_ADDRESS } from '@/lib/payment-config';

// This is a mock API endpoint for demonstration
// In production, you would:
// 1. Validate the payment request
// 2. Check product availability
// 3. Verify the transaction on-chain
// 4. Update your database
// 5. Trigger fulfillment

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, amount, token, from } = body;

    // Validate request
    if (!product || !amount || !from) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate token is USDC on Base
    if (token?.toLowerCase() !== USDC_BASE_ADDRESS.toLowerCase()) {
      return NextResponse.json(
        { error: 'Only USDC payments are accepted' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Create an order record in your database
    // 2. Return a 402 Payment Required response with payment details
    // 3. x402 will intercept this and handle the payment flow
    // 4. Once payment is confirmed, the client will retry this request
    // 5. You verify the transaction and fulfill the order

    // For demonstration, we'll return a 402 with payment info
    // x402-axios will intercept this and trigger the payment flow
    const paymentRequired = {
      chainId: 8453, // Base
      token: USDC_BASE_ADDRESS,
      amount: amount,
      recipient: process.env.PAYMENT_RECIPIENT_ADDRESS || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Your receiving address
      metadata: {
        product,
        orderId: `order_${Date.now()}`,
      },
    };

    // Return 402 to trigger x402 payment flow
    return new NextResponse(
      JSON.stringify({
        message: 'Payment required',
        payment: paymentRequired,
      }),
      {
        status: 402,
        headers: {
          'Content-Type': 'application/json',
          'X-Payment-Required': 'true',
          'X-Payment-Chain': '8453',
          'X-Payment-Token': USDC_BASE_ADDRESS,
          'X-Payment-Amount': amount,
        },
      }
    );
  } catch (error: any) {
    console.error('Purchase API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET request to check order status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const txHash = searchParams.get('txHash');

  if (!orderId && !txHash) {
    return NextResponse.json(
      { error: 'Missing orderId or txHash parameter' },
      { status: 400 }
    );
  }

  // In production, query your database for order status
  return NextResponse.json({
    orderId,
    txHash,
    status: 'pending',
    message: 'Order processing - transaction confirmation in progress',
  });
}
