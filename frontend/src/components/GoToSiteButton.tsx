// components/GoToSiteButton.tsx
import Link from 'next/link';
import React from 'react';

export default function GoToSiteButton() {
  return (
    <Link href="/ats">
      <button className="group flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Go to the site
        <span className="transform transition-transform group-hover:translate-x-1">→</span>
      </button>
    </Link>
  );
}
