'use client';

import React, { useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount: string;
  description: string;
  name: string;
  className?: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  description, 
  name,
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if PayPal SDK is loaded and container exists
    if (typeof window !== 'undefined' && containerRef.current && (window as any).paypal) {
      // Render PayPal Smart Payment Button
      (window as any).paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'USD'
              },
              description: description,
              name: name
            }]
          });
        },
        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            // Show a success message to the buyer
            alert('Thank you for your booking! Your order has been confirmed.');
            console.log('Transaction completed by ' + details.payer.name.given_name);
            // You can also redirect to a success page here
          });
        },
        onError: function(err: any) {
          // Show an error message to the buyer
          alert('Sorry, there was an error processing your payment. Please try again.');
          console.error('PayPal payment error:', err);
        }
      }).render(containerRef.current);
    }
  }, [amount, description, name]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full ${className}`}
    />
  );
};

export default PayPalButton;