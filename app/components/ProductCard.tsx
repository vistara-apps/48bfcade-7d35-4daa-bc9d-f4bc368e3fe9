'use client';

import { Package } from 'lucide-react';
import { PaymentButton } from './PaymentButton';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const handlePaymentSuccess = (txHash: string) => {
    console.log('Payment successful!', txHash);
    // You can add additional logic here like:
    // - Update order status
    // - Send confirmation email
    // - Show success modal
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment failed:', error);
    // You can add additional error handling here
  };

  return (
    <div className="bg-muted/30 rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-colors">
      <div className="aspect-square bg-muted/50 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-16 h-16 text-accent/40" />
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold mb-1">{product.name}</h3>
          <p className="text-sm text-fg/60 mb-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-lg">In Stock</span>
        </div>

        <PaymentButton
          productName={product.name}
          priceUSD={product.price}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    </div>
  );
}
