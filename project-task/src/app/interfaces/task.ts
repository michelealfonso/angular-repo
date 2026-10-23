export interface Task {
  id: number;
  description: string;
  status: 'open' | 'In Progress' | 'Completed';  // Stato del task
  id_project?: number;
  assigned_to?: null | number;
}
