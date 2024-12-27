export type Profile = {
  id: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type ProfileInsert = {
  created_at?: string;
  email?: string | null;
  avatar_url?: string | null;
  id: string;
};

export type ProfileUpdate = {
  created_at?: string;
  email?: string | null;
  avatar_url?: string | null;
  id?: string;
};