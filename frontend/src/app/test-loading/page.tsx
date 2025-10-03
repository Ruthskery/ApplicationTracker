'use client';

import React, { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';

export default function TestLoadingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake a 3-second loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Content Loaded Successfully!
      </h1>
    </div>
  );
}
