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
    return <div className="text-center py-10 text-gray-600">Loading jobs...</div>;

  if (jobs.length === 0)
    return <div className="text-center py-10 text-gray-600">No jobs found.</div>;

  return (
    <div className="overflow-x-auto px-6">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {['Position', 'Company', 'Status', 'Date Applied', 'Salary', 'Contact', 'Notes', 'Actions'].map((head) => (
              <th
                key={head}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center border-b border-gray-200 dark:border-gray-700"
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
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'Applied'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : job.status === 'Interview'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                      : job.status === 'Rejected'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="text-center px-4 py-3">
                {job.date_applied ? new Date(job.date_applied).toLocaleDateString() : '-'}
              </td>
              <td className="text-center px-4 py-3">{job.salary || '-'}</td>
              <td className="text-center px-4 py-3">{job.contact || '-'}</td>
              <td className="text-center px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {job.notes || '-'}
              </td>
              <td className="text-center px-4 py-3 flex justify-center gap-2">
                <button
                  className="flex items-center gap-1 text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                  onClick={() => onEditClick && onEditClick(job)}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 text-red-600 border border-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  onClick={() => onDelete && onDelete(job)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
