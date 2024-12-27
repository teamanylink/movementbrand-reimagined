export type ChatMessage = {
  id: string;
  project_id: string | null;
  user_id: string | null;
  message: string;
  created_at: string;
};

export type ChatMessageInsert = {
  created_at?: string;
  id?: string;
  message: string;
  project_id?: string | null;
  user_id?: string | null;
};

export type ChatMessageUpdate = {
  created_at?: string;
  id?: string;
  message?: string;
  project_id?: string | null;
  user_id?: string | null;
};