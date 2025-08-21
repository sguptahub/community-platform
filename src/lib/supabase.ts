import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from your Supabase dashboard)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          username: string | null
          avatar_url: string | null
          bio: string | null
          job_title: string | null
          company: string | null
          location: string | null
          skills: string[] | null
          social_links: any | null
          is_verified: boolean | null
          is_moderator: boolean | null
          is_admin: boolean | null
          is_approved: boolean | null
          approval_status: string | null
          approval_notes: string | null
          approved_by: string | null
          approved_at: string | null
          last_seen: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          company?: string | null
          location?: string | null
          skills?: string[] | null
          social_links?: any | null
          is_verified?: boolean | null
          is_moderator?: boolean | null
          is_admin?: boolean | null
          is_approved?: boolean | null
          approval_status?: string | null
          approval_notes?: string | null
          approved_by?: string | null
          approved_at?: string | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          company?: string | null
          location?: string | null
          skills?: string[] | null
          social_links?: any | null
          is_verified?: boolean | null
          is_moderator?: boolean | null
          is_admin?: boolean | null
          is_approved?: boolean | null
          approval_status?: string | null
          approval_notes?: string | null
          approved_by?: string | null
          approved_at?: string | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          author_id: string
          category: string | null
          tags: string[] | null
          is_pinned: boolean | null
          is_locked: boolean | null
          view_count: number | null
          like_count: number | null
          comment_count: number | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          author_id: string
          category?: string | null
          tags?: string[] | null
          is_pinned?: boolean | null
          is_locked?: boolean | null
          view_count?: number | null
          like_count?: number | null
          comment_count?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          author_id?: string
          category?: string | null
          tags?: string[] | null
          is_pinned?: boolean | null
          is_locked?: boolean | null
          view_count?: number | null
          like_count?: number | null
          comment_count?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string
          parent_id: string | null
          content: string
          like_count: number | null
          is_edited: boolean | null
          edited_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          parent_id?: string | null
          content: string
          like_count?: number | null
          is_edited?: boolean | null
          edited_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          parent_id?: string | null
          content?: string
          like_count?: number | null
          is_edited?: boolean | null
          edited_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          title: string | null
          is_group_chat: boolean | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          is_group_chat?: boolean | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          is_group_chat?: boolean | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          role: string | null
          joined_at: string
          left_at: string | null
          is_active: boolean | null
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          role?: string | null
          joined_at?: string
          left_at?: string | null
          is_active?: boolean | null
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          role?: string | null
          joined_at?: string
          left_at?: string | null
          is_active?: boolean | null
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          author_id: string
          content: string
          message_type: string | null
          file_url: string | null
          file_name: string | null
          file_size: number | null
          is_edited: boolean | null
          edited_at: string | null
          is_deleted: boolean | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          author_id: string
          content: string
          message_type?: string | null
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          is_edited?: boolean | null
          edited_at?: string | null
          is_deleted?: boolean | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          author_id?: string
          content?: string
          message_type?: string | null
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          is_edited?: boolean | null
          edited_at?: string | null
          is_deleted?: boolean | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string | null
          event_type: string | null
          start_date: string
          end_date: string
          max_participants: number | null
          current_participants: number | null
          organizer_id: string
          is_featured: boolean | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: string | null
          event_type?: string | null
          start_date: string
          end_date: string
          max_participants?: number | null
          current_participants?: number | null
          organizer_id: string
          is_featured?: boolean | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string | null
          event_type?: string | null
          start_date?: string
          end_date?: string
          max_participants?: number | null
          current_participants?: number | null
          organizer_id?: string
          is_featured?: boolean | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      event_participants: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: string | null
          registered_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status?: string | null
          registered_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: string | null
          registered_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          target_type: string
          target_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_type: string
          target_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_type?: string
          target_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          content: string | null
          reference_type: string | null
          reference_id: string | null
          is_read: boolean | null
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          content?: string | null
          reference_type?: string | null
          reference_id?: string | null
          is_read?: boolean | null
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          content?: string | null
          reference_type?: string | null
          reference_id?: string | null
          is_read?: boolean | null
          read_at?: string | null
          created_at?: string
        }
      }
    }
  }
}
