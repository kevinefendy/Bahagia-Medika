'use client';

import { useEffect } from 'react';

// Suppress known benign third-party browser extension / Cast SDK errors early
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function (...args: unknown[]) {
    const firstArg = typeof args[0] === 'string' ? args[0] : '';
    if (
      firstArg.includes('Sender: Failed to get initial state') ||
      firstArg.includes('cast_sender') ||
      firstArg.includes('chrome-extension://')
    ) {
      // Benign Google Cast / Chromecast extension background probe error on localhost
      return;
    }
    originalError.apply(console, args);
  };
}

export default function BrowserErrorFilter() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || '';
      if (
        msg.includes('Sender: Failed to get initial state') ||
        msg.includes('cast_sender')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason || '');
      if (
        reason.includes('Sender: Failed to get initial state') ||
        reason.includes('cast_sender')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
