'use client';
import { useLoading } from '../app/context/LoadingContext';

// Hook that returns a wrapper function
export function useWithLoading() {
  const { setLoading } = useLoading();

  const withLoading = async <T,>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true);
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  return withLoading;
}
