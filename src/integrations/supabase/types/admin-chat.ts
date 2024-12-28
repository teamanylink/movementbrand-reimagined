export type AdminChatMessage = {
  id: string;
  admin_id: string | null;
  user_id: string | null;
  message: string;
  created_at: string;
};

export type AdminChatMessageInsert = {
  admin_id?: string | null;
  user_id?: string | null;
  message: string;
  created_at?: string;
};

export type AdminChatMessageUpdate = {
  admin_id?: string | null;
  user_id?: string | null;
  message?: string;
  created_at?: string;
};