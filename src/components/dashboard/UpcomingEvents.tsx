
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Sample upcoming events data
const events = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    date: "June 15, 2023",
    time: "09:00 AM - 11:00 AM",
    type: "exam",
  },
  {
    id: 2,
    title: "Science Fair",
    date: "June 20, 2023",
    time: "02:00 PM - 05:00 PM",
    type: "event",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    date: "June 25, 2023",
    time: "04:30 PM - 07:00 PM",
    type: "meeting",
  },
  {
    id: 4,
    title: "Sports Day",
    date: "June 30, 2023",
    time: "All Day",
    type: "event",
  },
];

const getEventTypeStyles = (type: string) => {
  switch (type) {
    case "exam":
      return "bg-red-100 text-red-800 border-red-200";
    case "event":
      return "bg-green-100 text-green-800 border-green-200";
    case "meeting":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "holiday":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const UpcomingEvents = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Schedule for the next few weeks</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <span>View Calendar</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="bg-card p-2 rounded-md border">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant="outline" className={getEventTypeStyles(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
