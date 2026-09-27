export type UserRole = 'admin' | 'user';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'DISCUSSION' | 'QUOTED' | 'WON' | 'LOST';
export type ReviewStatus = 'pending' | 'published' | 'removed';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  business_name?: string;
  email: string;
  whatsapp?: string;
  service: string;
  business_description?: string;
  existing_website: boolean;
  website_url?: string;
  budget?: string;
  timeline?: string;
  reference_websites?: string;
  project_description: string;
  status: LeadStatus;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  business_name?: string;
  email: string;
  rating: number;
  message: string;
  project?: string;
  status: ReviewStatus;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url?: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string };
        Update: Partial<Profile>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Project>;
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at'> & { id?: string; status?: LeadStatus };
        Update: Partial<Lead>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'> & { id?: string; status?: ReviewStatus };
        Update: Partial<Review>;
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never
    };
  };
}
