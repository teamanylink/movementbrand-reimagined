import { ChatMessage, ChatMessageInsert, ChatMessageUpdate } from './chat';
import { Profile, ProfileInsert, ProfileUpdate } from './profile';
import { Project, ProjectInsert, ProjectUpdate } from './project';
import { Task, TaskInsert, TaskUpdate } from './task';

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: ChatMessage;
        Insert: ChatMessageInsert;
        Update: ChatMessageUpdate;
      };
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      tasks: {
        Row: Task;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];