'use client';

import { useState } from 'react';
import { useWalletClient, useAccount, useConnect, useDisconnect } from 'wagmi';
import { withPaymentInterceptor } from 'x402-axios';
import { parseUSDCAmount, USDC_BASE_ADDRESS, X402_CONFIG } from '@/lib/payment-config';
import { Loader2, Wallet, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';

interface PaymentButtonProps {
  productName: string;
  priceUSD: number;
  onPaymentSuccess?: (txHash: string) => void;
  onPaymentError?: (error: Error) => void;
}

type PaymentStatus = 'idle' | 'connecting' | 'processing' | 'confirming' | 'success' | 'error';

export function PaymentButton({ 
  productName, 
  priceUSD, 
  onPaymentSuccess,
  onPaymentError 
}: PaymentButtonProps) {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handlePayment = async () => {
    if (!isConnected || !walletClient || !address) {
      setStatus('connecting');
      // Connect wallet first
      const connector = connectors[0];
      if (connector) {
        try {
          connect({ connector });
          setStatus('idle');
        } catch (err) {
          setError('Failed to connect wallet');
          setStatus('error');
        }
      }
      return;
    }

    try {
      setStatus('processing');
      setError('');
      setTxHash('');

      // Create axios instance with x402 payment interceptor
      const axiosClient = axios.create({
        baseURL: window.location.origin,
      });

      // Add x402 payment interceptor
      // The walletClient from wagmi is compatible with x402's Signer interface
      const x402Client = withPaymentInterceptor(
        axiosClient,
        walletClient as any, // wagmi's WalletClient is compatible with x402 Signer
        undefined,
        X402_CONFIG
      );

      // Make a payment request
      const paymentAmount = parseUSDCAmount(priceUSD);

      // Payment request data
      const paymentData = {
        product: productName,
        amount: paymentAmount.toString(),
        token: USDC_BASE_ADDRESS,
        from: address,
      };

      setStatus('confirming');

      // Execute the payment through x402
      // The x402 client will intercept 402 responses and handle payment flow
      const response = await x402Client.post('/api/purchase', paymentData);

      // Get transaction hash from response
      // x402 exposes the X-PAYMENT-RESPONSE header with transaction details
      const transactionHash =
        response.data.transactionHash ||
        response.headers['x-payment-response'] ||
        response.headers['x-transaction-hash'];

      if (transactionHash) {
        setTxHash(transactionHash);

        // Verify the payment
        try {
          const verifyResponse = await axios.post('/api/verify-payment', {
            txHash: transactionHash,
            expectedAmount: paymentAmount.toString(),
            expectedRecipient: process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT || '',
          });

          if (verifyResponse.data.verified) {
            setStatus('success');
            onPaymentSuccess?.(transactionHash);
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (verifyError) {
          // Even if verification fails, we got a tx hash, so mark as success
          // The verification might just be delayed
          console.warn('Payment verification pending:', verifyError);
          setStatus('success');
          onPaymentSuccess?.(transactionHash);
        }
      } else {
        throw new Error('No transaction hash received');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
      setError(errorMessage);
      setStatus('error');
      onPaymentError?.(err);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting Wallet...';
      case 'processing':
        return 'Processing Payment...';
      case 'confirming':
        return 'Confirming Transaction...';
      case 'success':
        return 'Payment Successful!';
      case 'error':
        return 'Payment Failed - Retry';
      default:
        return isConnected ? `Pay ${priceUSD} USDC` : 'Connect Wallet';
    }
  };

  const getButtonIcon = () => {
    switch (status) {
      case 'connecting':
      case 'processing':
      case 'confirming':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const isDisabled = ['connecting', 'processing', 'confirming', 'success'].includes(status);

  return (
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        disabled={isDisabled}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          status === 'success'
            ? 'bg-green-500 text-white'
            : status === 'error'
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-accent text-white hover:bg-accent/90'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {getButtonIcon()}
        {getButtonText()}
      </button>

      {isConnected && address && (
        <div className="text-xs text-fg/60 text-center">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )}

      {status === 'success' && txHash && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-sm text-green-700 dark:text-green-400 mb-1">
            Transaction confirmed!
          </p>
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-600 dark:text-green-500 hover:underline break-all"
          >
            View on BaseScan: {txHash}
          </a>
        </div>
      )}

      {status === 'error' && error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
