'use client';
import React from 'react';
import { Job } from '../../../lib/api';

type JobsTableProps = {
  jobs?: Job[];
  loading: boolean;
  onEditClick?: (job: Job) => void;
  onDelete?: (job: Job) => void;
};

const JobsTable: React.FC<JobsTableProps> = ({ jobs = [], loading, onEditClick, onDelete }) => {
  if (loading) return <div className="text-center py-10 text-gray-600">Loading jobs...</div>;
  if (jobs.length === 0) return <div className="text-center py-10 text-gray-600">No jobs found.</div>;

  return (
    <div className="overflow-x-auto px-10">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-200">
            <th className="text-md text-center">Position</th>
            <th className="text-md text-center">Company</th>
            <th className="text-md text-center">Status</th>
            <th className="text-md text-center">Date Applied</th>
            <th className="text-md text-center">Salary</th>
            <th className="text-md text-center">Contact</th>
            <th className="text-md text-center">Notes</th>
            <th className="text-md text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id ?? `${job.position}-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="text-center p-4">{job.position}</td>
              <td className="text-center p-4">{job.company}</td>
              <td className="text-center p-4">{job.status}</td>
              <td className="text-center p-4">{job.date_applied ? new Date(job.date_applied).toLocaleDateString() : '-'}</td>
              <td className="text-center p-4">{job.salary}</td>
              <td className="text-center p-4">{job.contact}</td>
              <td className="text-center p-4">{job.notes || '-'}</td>
              <td className="text-center p-4 flex justify-center gap-2">
                <button
                  className="text-blue-500 border border-blue-500 px-2 py-1 rounded hover:bg-blue-50 hover:border-blue-600"
                  onClick={() => onEditClick && onEditClick(job)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-50 hover:border-red-600"
                  onClick={() => onDelete && onDelete(job)}
                >
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
