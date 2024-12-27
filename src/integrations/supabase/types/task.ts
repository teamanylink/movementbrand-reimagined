export type Task = {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: string;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskInsert = {
  assigned_to?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  project_id?: string | null;
  status?: string;
  title: string;
  updated_at?: string;
};

export type TaskUpdate = {
  assigned_to?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  project_id?: string | null;
  status?: string;
  title?: string;
  updated_at?: string;
};