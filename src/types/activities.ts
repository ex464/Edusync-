
export type ActivityCategory = "sports" | "music" | "dance" | "debate" | "art" | "other";

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  date: Date;
  location: string;
  organizer: {
    id: string;
    name: string;
  };
  maxParticipants?: number;
  participants: {
    id: string;
    name: string;
    status: "registered" | "confirmed" | "waitlisted" | "cancelled";
  }[];
  registrationDeadline: Date;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  score?: {
    teamA?: string;
    teamAScore?: number;
    teamB?: string;
    teamBScore?: number;
  };
}
