'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
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
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Job
        </button>
      </div>

      <AddJobModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(job) => {
          onAdd(job); // update the table
          setIsOpen(false); // close modal
        }}
      />
    </>
  );
}
