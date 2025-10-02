'use client';
import React, { useState } from 'react';
import { createJob, Job } from '../../../lib/api';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (job: Job) => void; // callback to update table
}

export default function AddJobModal({ isOpen, onClose, onAdd }: AddJobModalProps) {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!position || !company || !status || !dateApplied) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);

    try {
      const job = await createJob(
        position,
        company,
        address,
        status,
        new Date(dateApplied),
        notes
      );
      onAdd(job); // add new job to table
      onClose();
      setPosition('');
      setCompany('');
      setAddress('');
      setStatus('');
      setDateApplied('');
      setNotes('');
    } catch (err) {
      console.error(err);
      alert('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Job</h2>

        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Date Applied"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
