export type Job = {
  id: number;
  position: string;
  company: string;
  address: string;
  status: string;
  date_applied: string;
  salary: string;
  contact: string;
  notes?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchJobs(): Promise<Job[]> {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }
    return response.json();
}

export async function createJob(
  position: string,
  company: string,
  address: string,
  status: string,
  date_applied: Date,
  salary: string,
  contact: string,
  notes?: string
): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs/`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      position,
      company,
      address,
      status,
      date_applied: date_applied.toISOString().split('T')[0], // "YYYY-MM-DD"
      salary,
      contact,
      notes
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  const data: Job = await response.json();
  return data;
}

export async function updateJob(
    id: number,
    position: string,
    company: string,
    address: string,
    status: string,
    date_applied: Date,
    salary: string,
    contact: string,
    notes?: string
): Promise<Job> {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            position,
            company,
            address,
            status,
            date_applied: date_applied.toISOString().split('T')[0],
            salary,
            contact,
            notes
        }),
    });
    if (!response.ok) {
        const text = await response.text();
        console.error('Server response:', text);
        throw new Error('Failed to update job');
    }
    const data: Job = await response.json();
    return data;
}


export async function deleteJob(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete job');
    }
}