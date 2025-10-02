import React from 'react';
import GoToSiteButton from '@/components/GoToSiteButton';

export default function JobTrackingSystem() {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Job Tracking System
      </h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to the Job Tracking System! This application helps you manage and track your job applications efficiently.
      </p>

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Features:
      </h2>

      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Add and manage job applications</li>
        <li>Track application status</li>
        <li>Set reminders for follow-ups</li>
        <li>View application history</li>
      </ul>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Get started by navigating to the &apos;Applications&apos; section to add your first job application!
      </p>

      <GoToSiteButton />

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Note: This is a demo application. All data is stored locally in your browser.
      </p>
    </div>
  );
}
