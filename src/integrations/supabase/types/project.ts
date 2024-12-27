export type Project = {
  id: string;
  name: string;
  description: string | null;
  project_type: string;
  status: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  is_draft: boolean | null;
};

export type ProjectInsert = {
  created_at?: string;
  description?: string | null;
  id?: string;
  is_draft?: boolean | null;
  name: string;
  project_type: string;
  status?: string | null;
  updated_at?: string;
  user_id?: string | null;
};

export type ProjectUpdate = {
  created_at?: string;
  description?: string | null;
  id?: string;
  is_draft?: boolean | null;
  name?: string;
  project_type?: string;
  status?: string | null;
  updated_at?: string;
  user_id?: string | null;
};