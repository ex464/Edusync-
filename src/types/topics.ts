
export type SubjectType = "mathematics" | "science" | "english" | "history" | "geography" | "computers" | "arts" | "other";

export type AttachmentType = "pdf" | "document" | "presentation" | "image" | "video" | "link";

export interface TopicAttachment {
  id: string;
  name: string;
  type: AttachmentType;
  url: string;
  uploadedAt: Date;
  size?: number; // in KB
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  subject: SubjectType;
  gradeLevel: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    id: string;
    name: string;
  };
  attachments: TopicAttachment[];
}
