
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Sample activities data
const activities = [
  {
    id: 1,
    user: { name: "John Doe", role: "student", avatar: "/avatar-student-1.jpg", initials: "JD" },
    action: "submitted",
    subject: "Mathematics Assignment #3",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: { name: "Sarah Wilson", role: "teacher", avatar: "/avatar-teacher-1.jpg", initials: "SW" },
    action: "graded",
    subject: "Physics Quiz",
    time: "30 minutes ago",
  },
  {
    id: 3,
    user: { name: "Admin", role: "admin", avatar: "/avatar-admin-1.jpg", initials: "AD" },
    action: "scheduled",
    subject: "End of Term Exams",
    time: "2 hours ago",
  },
  {
    id: 4,
    user: { name: "Michael Brown", role: "student", avatar: "/avatar-student-2.jpg", initials: "MB" },
    action: "joined",
    subject: "Science Club",
    time: "4 hours ago",
  },
  {
    id: 5,
    user: { name: "Jennifer Kim", role: "teacher", avatar: "/avatar-teacher-2.jpg", initials: "JK" },
    action: "uploaded",
    subject: "Study Materials for Geography",
    time: "Yesterday",
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-blue-100 text-blue-700";
    case "teacher":
      return "bg-green-100 text-green-700";
    case "student":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case "submitted":
      return "text-indigo-600";
    case "graded":
      return "text-green-600";
    case "scheduled":
      return "text-blue-600";
    case "joined":
      return "text-purple-600";
    case "uploaded":
      return "text-amber-600";
    default:
      return "text-gray-600";
  }
};

const RecentActivities = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest actions from users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="flex items-start space-x-4"
            >
              <Avatar>
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="font-medium text-sm">{activity.user.name}</p>
                  <span className={`text-xs font-medium ml-2 px-2 py-0.5 rounded-full capitalize ${getRoleColor(activity.user.role)}`}>
                    {activity.user.role}
                  </span>
                </div>
                <p className="text-sm">
                  <span className={`font-medium ${getActionColor(activity.action)}`}>
                    {activity.action}
                  </span>{" "}
                  {activity.subject}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
