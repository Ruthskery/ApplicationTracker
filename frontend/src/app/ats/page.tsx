'use client';
import React, { useEffect, useState } from 'react';
import JobsTable from './components/JobsTable';
import AddJobButton from './components/AddJobButton';
import EditJobModal from './components/EditJobModal';
import DeleteJobModal from './components/DeleteJobModal';
import { fetchJobs, Job, deleteJob } from '../../lib/api';

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleJobEdit = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const handleDeleteConfirm = async () => {
    if (!deletingJob) return;

    try {
      await deleteJob(deletingJob.id);
      setJobs((prev) => prev.filter((j) => j.id !== deletingJob.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cover photo section */}
      <div className="relative h-[40vh] w-full">
        <img
          src="/cover.jpg" // replace with your image path
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Application Tracking
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <AddJobButton onAdd={(newJob) => setJobs((prev) => [...prev, newJob])} />

        <JobsTable
          jobs={jobs}
          loading={loading}
          onEditClick={(job) => {
            setEditingJob(job);
            setIsEditModalOpen(true);
          }}
          onDelete={(job) => {
            setDeletingJob(job);
            setIsDeleteModalOpen(true);
          }}
        />

        {editingJob && (
          <EditJobModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            job={editingJob}
            onEdit={handleJobEdit}
          />
        )}

        {deletingJob && (
          <DeleteJobModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            job={deletingJob}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
