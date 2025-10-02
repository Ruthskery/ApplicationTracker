'use client';
import React, { useEffect, useState } from 'react';
import JobsTable from './components/JobsTable';
import AddJobButton from './components/AddJobButton';
import EditJobModal from './components/EditJobModal';
import { fetchJobs, Job, deleteJob } from '../../lib/api';

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // For edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Callback for updating job in table after edit
  const handleJobEdit = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  //Delete jobs
  const handleDelete = async (job: Job) => {
    if (!confirm(`Delete job: ${job.position}?`)) return;

    try {
      await deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="h-screen">
      <h1 className="text-4xl font-bold text-center mt-auto p-10">
        Application Tracking
      </h1>
      <AddJobButton onAdd={(newJob) => setJobs((prev) => [...prev, newJob])} />
      
      <JobsTable
        jobs={jobs}
        loading={loading}
        onEditClick={(job) => {
          setEditingJob(job);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {editingJob && (
        <EditJobModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          job={editingJob}
          onEdit={handleJobEdit}
        />
      )}
    </div>
  );
}

export default Home;
