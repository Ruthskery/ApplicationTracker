'use client';
import React from 'react';
import { Job } from '../../../lib/api';
import { Pencil, Trash2 } from 'lucide-react';

type JobsTableProps = {
  jobs?: Job[];
  loading: boolean;
  onEditClick?: (job: Job) => void;
  onDelete?: (job: Job) => void;
};

const JobsTable: React.FC<JobsTableProps> = ({ jobs = [], loading, onEditClick, onDelete }) => {
  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-gray-600 dark:text-gray-400 text-sm">
        <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></span>
        Loading jobs...
      </div>
    );

  if (jobs.length === 0)
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-400 text-sm">
        🚀 No jobs found. Start by adding one!
      </div>
    );

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="px-6">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {['Position', 'Company', 'Status', 'Date Applied', 'Salary', 'Contact', 'Notes', 'Actions'].map((head) => (
                <th
                  key={head}
                  scope="col"
                  className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center border-b border-gray-200 dark:border-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {jobs.map((job, index) => (
              <tr
                key={job.id ?? `${job.position}-${index}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="text-center px-4 py-3">{job.position}</td>
                <td className="text-center px-4 py-3">{job.company}</td>
                <td className="text-center px-4 py-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="text-center px-4 py-3">{formatDate(job.date_applied)}</td>
                <td className="text-center px-4 py-3">{job.salary || '-'}</td>
                <td className="text-center px-4 py-3">{job.contact || '-'}</td>
                <td className="text-center px-4 py-3 text-gray-600 dark:text-gray-400 truncate max-w-xs">{job.notes || '-'}</td>
                <td className="text-center px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      aria-label="Edit job"
                      className="inline-flex items-center justify-center text-blue-600 border border-blue-600 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                      onClick={() => onEditClick?.(job)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Delete job"
                      className="inline-flex items-center justify-center text-red-600 border border-red-600 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      onClick={() => onDelete?.(job)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden mt-4">
        {jobs.map((job, index) => (
          <div
            key={job.id ?? `${job.position}-${index}`}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-base text-gray-900 dark:text-white">{job.position}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>

            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Date:</strong> {formatDate(job.date_applied)}</p>
              <p><strong>Salary:</strong> {job.salary || '-'}</p>
              <p><strong>Contact:</strong> {job.contact || '-'}</p>
              <p><strong>Notes:</strong> {job.notes || '-'}</p>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                aria-label="Edit job"
                className="text-blue-600 border border-blue-600 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                onClick={() => onEditClick?.(job)}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                aria-label="Delete job"
                className="text-red-600 border border-red-600 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                onClick={() => onDelete?.(job)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors =
    status === 'Applied'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
      : status === 'Interview'
      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
      : status === 'Rejected'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
      : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors}`}>{status}</span>;
};

export default JobsTable;
