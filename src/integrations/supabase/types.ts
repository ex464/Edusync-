export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admission_documents: {
        Row: {
          admission_id: string
          document_type: string
          file_path: string
          id: string
          uploaded_at: string
          verified: boolean | null
        }
        Insert: {
          admission_id: string
          document_type: string
          file_path: string
          id?: string
          uploaded_at?: string
          verified?: boolean | null
        }
        Update: {
          admission_id?: string
          document_type?: string
          file_path?: string
          id?: string
          uploaded_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "admission_documents_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
        ]
      }
      admission_payments: {
        Row: {
          admission_id: string
          amount: number
          created_at: string
          id: string
          payment_date: string | null
          payment_method: string
          payment_status: string
          transaction_id: string | null
        }
        Insert: {
          admission_id: string
          amount: number
          created_at?: string
          id?: string
          payment_date?: string | null
          payment_method: string
          payment_status?: string
          transaction_id?: string | null
        }
        Update: {
          admission_id?: string
          amount?: number
          created_at?: string
          id?: string
          payment_date?: string | null
          payment_method?: string
          payment_status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admission_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
        ]
      }
      admissions: {
        Row: {
          address: string | null
          class_applied: string
          created_at: string
          date_of_birth: string | null
          email: string
          form_completed: boolean
          id: string
          last_updated: string
          notes: string | null
          parent_name: string
          phone: string
          section_applied: string | null
          status: Database["public"]["Enums"]["admission_status"]
          student_name: string
        }
        Insert: {
          address?: string | null
          class_applied: string
          created_at?: string
          date_of_birth?: string | null
          email: string
          form_completed?: boolean
          id?: string
          last_updated?: string
          notes?: string | null
          parent_name: string
          phone: string
          section_applied?: string | null
          status?: Database["public"]["Enums"]["admission_status"]
          student_name: string
        }
        Update: {
          address?: string | null
          class_applied?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          form_completed?: boolean
          id?: string
          last_updated?: string
          notes?: string | null
          parent_name?: string
          phone?: string
          section_applied?: string | null
          status?: Database["public"]["Enums"]["admission_status"]
          student_name?: string
        }
        Relationships: []
      }
      class_capacity: {
        Row: {
          academic_year: string
          class_name: string
          current_occupancy: number
          id: string
          max_capacity: number
          section_name: string | null
        }
        Insert: {
          academic_year: string
          class_name: string
          current_occupancy?: number
          id?: string
          max_capacity: number
          section_name?: string | null
        }
        Update: {
          academic_year?: string
          class_name?: string
          current_occupancy?: number
          id?: string
          max_capacity?: number
          section_name?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          class_interested: string | null
          converted_to_admission_id: string | null
          created_at: string
          email: string | null
          followed_up_at: string | null
          id: string
          message: string | null
          parent_name: string
          phone: string
          status: string | null
          student_name: string | null
        }
        Insert: {
          class_interested?: string | null
          converted_to_admission_id?: string | null
          created_at?: string
          email?: string | null
          followed_up_at?: string | null
          id?: string
          message?: string | null
          parent_name: string
          phone: string
          status?: string | null
          student_name?: string | null
        }
        Update: {
          class_interested?: string | null
          converted_to_admission_id?: string | null
          created_at?: string
          email?: string | null
          followed_up_at?: string | null
          id?: string
          message?: string | null
          parent_name?: string
          phone?: string
          status?: string | null
          student_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_converted_to_admission_id_fkey"
            columns: ["converted_to_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          admission_id: string | null
          enquiry_id: string | null
          id: string
          message: string
          notification_type: string
          recipient: string
          sent_at: string
          status: string
          subject: string | null
        }
        Insert: {
          admission_id?: string | null
          enquiry_id?: string | null
          id?: string
          message: string
          notification_type: string
          recipient: string
          sent_at?: string
          status: string
          subject?: string | null
        }
        Update: {
          admission_id?: string | null
          enquiry_id?: string | null
          id?: string
          message?: string
          notification_type?: string
          recipient?: string
          sent_at?: string
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admission_status: "pending" | "under_review" | "confirmed" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admission_status: ["pending", "under_review", "confirmed", "rejected"],
    },
  },
} as const
