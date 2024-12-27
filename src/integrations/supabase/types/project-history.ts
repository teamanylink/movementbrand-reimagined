export type ProjectHistory = {
  id: string;
  project_id: string | null;
  type: 'project' | 'task' | 'status_change';
  action: string;
  previous_status: string | null;
  new_status: string | null;
  created_at: string;
};

export type ProjectHistoryInsert = {
  id?: string;
  project_id?: string | null;
  type: 'project' | 'task' | 'status_change';
  action: string;
  previous_status?: string | null;
  new_status?: string | null;
  created_at?: string;
};

export type ProjectHistoryUpdate = {
  id?: string;
  project_id?: string | null;
  type?: 'project' | 'task' | 'status_change';
  action?: string;
  previous_status?: string | null;
  new_status?: string | null;
  created_at?: string;
};