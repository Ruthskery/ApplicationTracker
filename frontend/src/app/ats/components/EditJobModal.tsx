'use client';
import React, { useState, useEffect } from 'react';
import { updateJob, Job } from '../../../lib/api';

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job; // the job to edit
  onEdit: (job: Job) => void; // callback to update table
}

export default function EditJobModal({ isOpen, onClose, job, onEdit }: EditJobModalProps) {
  const [position, setPosition] = useState(job.position);
  const [company, setCompany] = useState(job.company);
  const [address, setAddress] = useState(job.address);
  const [status, setStatus] = useState(job.status);
  const [dateApplied, setDateApplied] = useState(job.date_applied);
  const [salary, setSalary] = useState(job.salary || '');
  const [contact, setContact] = useState(job.contact);
  const [notes, setNotes] = useState(job.notes || '');
  const [loading, setLoading] = useState(false);

  // Update form values if job changes
  useEffect(() => {
    setPosition(job.position);
    setCompany(job.company);
    setAddress(job.address);
    setStatus(job.status);
    setDateApplied(job.date_applied);
    setSalary(job.salary);
    setContact(job.contact);
    setNotes(job.notes || '');
  }, [job]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!position || !company || !status || !dateApplied) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);

    try {
      const updatedJob = await updateJob(
        job.id,
        position,
        company,
        address,
        status,
        new Date(dateApplied),
        salary,
        contact,
        notes
      );
      onEdit(updatedJob); // update job in table
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        {/* <input
            type="text"
            placeholder="Job ID"
            value={job.id}
            readOnly
            className="p-2 border rounded bg-gray-100 cursor-not-allowed"
        /> */}
        
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
           <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="p-2 border rounded"
          />
           <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
