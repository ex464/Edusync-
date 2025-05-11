
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityCard } from "./ActivityCard";
import { Activity, ActivityCategory } from "@/types/activities";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock activities data
const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Annual Football Tournament",
    category: "sports",
    description: "Inter-class football tournament for all age groups. Teams of 11 players.",
    date: new Date("2023-08-15T09:00:00"),
    location: "School Football Ground",
    organizer: {
      id: "t1",
      name: "Mr. Johnson",
    },
    maxParticipants: 110,
    participants: [
      { id: "s1", name: "John Doe", status: "confirmed" },
      { id: "s2", name: "Jane Smith", status: "registered" },
    ],
    registrationDeadline: new Date("2023-08-10T23:59:59"),
    status: "upcoming",
    score: {
      teamA: "Class 10A",
      teamAScore: 2,
      teamB: "Class 10B",
      teamBScore: 1,
    },
  },
  {
    id: "2",
    title: "Chess Competition",
    category: "sports",
    description: "Annual chess competition for all students. Individual participation.",
    date: new Date("2023-08-20T10:00:00"),
    location: "School Auditorium",
    organizer: {
      id: "t2",
      name: "Mrs. Davis",
    },
    maxParticipants: 50,
    participants: [
      { id: "s3", name: "Alex Johnson", status: "confirmed" },
    ],
    registrationDeadline: new Date("2023-08-18T23:59:59"),
    status: "upcoming",
  },
  {
    id: "3",
    title: "Annual Music Concert",
    category: "music",
    description: "Showcase your musical talents. Solo and group performances welcome.",
    date: new Date("2023-09-05T17:00:00"),
    location: "School Auditorium",
    organizer: {
      id: "t3",
      name: "Ms. Wilson",
    },
    maxParticipants: 30,
    participants: [],
    registrationDeadline: new Date("2023-09-01T23:59:59"),
    status: "upcoming",
  },
  {
    id: "4",
    title: "Dance Competition",
    category: "dance",
    description: "Annual dance competition with various styles. Solo and group performances.",
    date: new Date("2023-09-10T16:00:00"),
    location: "School Auditorium",
    organizer: {
      id: "t4",
      name: "Mr. Garcia",
    },
    maxParticipants: 40,
    participants: [],
    registrationDeadline: new Date("2023-09-05T23:59:59"),
    status: "upcoming",
  },
  {
    id: "5",
    title: "Debate Competition",
    category: "debate",
    description: "Inter-class debate competition on current affairs.",
    date: new Date("2023-09-15T10:00:00"),
    location: "School Conference Room",
    organizer: {
      id: "t5",
      name: "Mrs. Thompson",
    },
    maxParticipants: 20,
    participants: [],
    registrationDeadline: new Date("2023-09-10T23:59:59"),
    status: "upcoming",
  }
];

interface ActivityListProps {
  category: ActivityCategory;
  searchQuery: string;
  role: "admin" | "teacher" | "student";
}

const ActivityList = ({ category, searchQuery, role }: ActivityListProps) => {
  const [activities] = useState<Activity[]>(mockActivities);
  const { toast } = useToast();

  // Filter activities based on category and search query
  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = activity.category === category;
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  const handleJoinActivity = (activity: Activity) => {
    // In a real app, this would make an API call to join the activity
    toast({
      title: "Registration Successful",
      description: `You have registered for ${activity.title}. Wait for confirmation.`,
    });
  };

  if (filteredActivities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <h3 className="mt-4 text-lg font-medium">No activities found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {searchQuery 
            ? "Try a different search term or category." 
            : `There are no ${category} activities available at the moment.`}
        </p>
        {role === "admin" || role === "teacher" ? (
          <p className="mt-4 text-sm">
            Click the "Create Activity" button to add a new activity.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ActivityCard 
              activity={activity} 
              role={role}
              onJoin={handleJoinActivity}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ActivityList;
