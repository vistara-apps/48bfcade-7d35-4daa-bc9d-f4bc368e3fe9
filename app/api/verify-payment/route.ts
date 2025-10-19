import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { USDC_BASE_ADDRESS } from '@/lib/payment-config';

// Create a public client to verify transactions
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { txHash, expectedAmount, expectedRecipient } = body;

    if (!txHash) {
      return NextResponse.json(
        { error: 'Transaction hash is required' },
        { status: 400 }
      );
    }

    // Get transaction receipt
    const receipt = await publicClient.getTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    if (!receipt) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Check if transaction was successful
    if (receipt.status !== 'success') {
      return NextResponse.json(
        { error: 'Transaction failed' },
        { status: 400 }
      );
    }

    // Get transaction details
    const transaction = await publicClient.getTransaction({
      hash: txHash as `0x${string}`,
    });

    // Verify it's a USDC transfer
    const isUSDCTransfer = transaction.to?.toLowerCase() === USDC_BASE_ADDRESS.toLowerCase();

    // In a production environment, you would:
    // 1. Decode the transaction data to verify the transfer details
    // 2. Check the amount matches expectedAmount
    // 3. Verify the recipient matches expectedRecipient
    // 4. Update your database with the confirmed payment
    // 5. Trigger order fulfillment

    const confirmations = receipt.blockNumber 
      ? await publicClient.getBlockNumber().then(current => Number(current - receipt.blockNumber))
      : 0;

    return NextResponse.json({
      verified: true,
      transactionHash: txHash,
      status: receipt.status,
      blockNumber: receipt.blockNumber?.toString(),
      confirmations,
      from: transaction.from,
      to: transaction.to,
      isUSDCTransfer,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to verify payment',
        verified: false,
      },
      { status: 500 }
    );
  }
}
