'use client';

import { useEffect } from 'react';

const isBenignError = (str: string) =>
  str.includes('Sender: Failed to get initial state') ||
  str.includes('cast_sender') ||
  str.includes('chrome-extension://') ||
  str.includes('sender_getProviderState') ||
  str.includes('sender-wallet') ||
  str.includes('epapihdplajcdnnkdeiahlgigofloibg') ||
  str.includes('fdprocessedid');

// Suppress known benign third-party browser extension / Cast SDK errors early
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function (...args: unknown[]) {
    try {
      const fullText = args
        .map((a) => {
          if (typeof a === 'string') return a;
          if (a instanceof Error) return `${a.message} ${a.stack || ''}`;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(' ');

      if (isBenignError(fullText)) {
        return;
      }
    } catch {
      // fallback to original error
    }
    originalError.apply(console, args);
  };
}

export default function BrowserErrorFilter() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || '';
      const filename = event.filename || '';
      if (isBenignError(msg) || isBenignError(filename)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason || '');
      if (isBenignError(reason)) {
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
