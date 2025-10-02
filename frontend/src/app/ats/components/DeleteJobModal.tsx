'use client';
import React, { useState } from 'react';
import { Job } from '../../../lib/api';

interface DeleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  onConfirm: () => Promise<void> | void;
}

export default function DeleteJobModal({
  isOpen,
  onClose,
  job,
  onConfirm,
}: DeleteJobModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50 px-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Delete Job
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete the job{' '}
          <span className="font-medium text-gray-900 dark:text-white">
            {job.position}
          </span>{' '}
          at{' '}
          <span className="font-medium text-gray-900 dark:text-white">
            {job.company}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
