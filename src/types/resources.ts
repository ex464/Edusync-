
export type ResourceType = "video" | "website" | "document" | "ebook" | "other";

export interface StudyResource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  subject: string;
  gradeLevel: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    id: string;
    name: string;
  };
  thumbnail?: string; // Thumbnail URL for video or preview image
}
