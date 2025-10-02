'use client';
import React, { useState } from 'react';
import AddJobModal from './AddJobModal';
import { Job } from '../../../lib/api';

interface AddJobButtonProps {
  onAdd: (job: Job) => void;
}

export default function AddJobButton({ onAdd }: AddJobButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-start py-5 px-10">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Job
        </button>
      </div>

      <AddJobModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(job) => {
          onAdd(job); // updates the table
          setIsOpen(false); // close modal
        }}
      />
    </>
  );
}
