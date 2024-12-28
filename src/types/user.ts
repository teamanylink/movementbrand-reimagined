export interface UserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  website_url: string | null;
  phone_number: string | null;
  avatar_url: string | null;
}