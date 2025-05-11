
export type EventType = "exam" | "holiday" | "meeting" | "class" | "event";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  type: EventType;
  location?: string;
  createdBy: {
    id: string;
    name: string;
    role: "admin" | "teacher";
  };
}
