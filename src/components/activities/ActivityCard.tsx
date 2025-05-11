
import { format } from "date-fns";
import { Award, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Activity } from "@/types/activities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface ActivityCardProps {
  activity: Activity;
  role: "admin" | "teacher" | "student";
  onJoin: (activity: Activity) => void;
}

export const ActivityCard = ({ activity, role, onJoin }: ActivityCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const isRegistrationOpen = new Date() < activity.registrationDeadline;
  const isFull = activity.maxParticipants !== undefined && 
                activity.participants.length >= activity.maxParticipants;
  
  const isUserRegistered = false; // In a real app, check if current user is registered
  
  const participationPercentage = activity.maxParticipants 
    ? (activity.participants.length / activity.maxParticipants) * 100
    : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sports": return "bg-green-100 text-green-800 border-green-200";
      case "music": return "bg-blue-100 text-blue-800 border-blue-200";
      case "dance": return "bg-purple-100 text-purple-800 border-purple-200";
      case "debate": return "bg-amber-100 text-amber-800 border-amber-200";
      case "art": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 border-blue-200";
      case "ongoing": return "bg-green-100 text-green-800 border-green-200";
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 flex flex-row justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{activity.title}</h3>
              <Badge variant="outline" className={getCategoryColor(activity.category)}>
                {activity.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(activity.date, "PPP")}</span>
              <span className="mx-1">•</span>
              <Clock className="h-3.5 w-3.5" />
              <span>{format(activity.date, "p")}</span>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(activity.status)}>
            {activity.status}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="text-sm text-muted-foreground flex items-start gap-2 mb-3">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{activity.location}</span>
          </div>
          
          <p className="text-sm mb-4 line-clamp-3">{activity.description}</p>
          
          {activity.maxParticipants && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Participants
                </span>
                <span>{activity.participants.length} / {activity.maxParticipants}</span>
              </div>
              <Progress value={participationPercentage} className="h-1.5" />
            </div>
          )}
          
          {activity.score && activity.status !== "upcoming" && (
            <div className="mt-4 border rounded-md p-2 bg-muted/20">
              <div className="text-xs font-medium mb-1 flex items-center">
                <Award className="h-3.5 w-3.5 mr-1.5" />
                Live Score
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <div className="font-medium">{activity.score.teamA}</div>
                  <div className="text-2xl font-bold">{activity.score.teamAScore}</div>
                </div>
                <div className="text-muted-foreground">vs</div>
                <div className="text-center flex-1">
                  <div className="font-medium">{activity.score.teamB}</div>
                  <div className="text-2xl font-bold">{activity.score.teamBScore}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-4 flex gap-2 justify-between border-t">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setDialogOpen(true)}
          >
            View Details
          </Button>
          
          {role === "student" && (
            <Button 
              className="flex-1"
              disabled={!isRegistrationOpen || isFull || isUserRegistered}
              onClick={() => onJoin(activity)}
            >
              {isUserRegistered ? "Registered" : "Join"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {activity.title}
              <Badge variant="outline" className={getCategoryColor(activity.category)}>
                {activity.category}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Organized by {activity.organizer.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Date & Time</div>
                <div className="font-medium">
                  {format(activity.date, "PPP")} at {format(activity.date, "p")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Location</div>
                <div className="font-medium">{activity.location}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Registration Deadline</div>
                <div className="font-medium">
                  {format(activity.registrationDeadline, "PPP")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Participants</div>
                <div className="font-medium">
                  {activity.participants.length} 
                  {activity.maxParticipants && ` / ${activity.maxParticipants}`}
                </div>
              </div>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">Description</div>
              <p>{activity.description}</p>
            </div>
            
            <Tabs defaultValue="participants">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                {activity.score && <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="participants" className="mt-4">
                {activity.participants.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No participants have registered yet.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {(role === "admin" || role === "teacher") && (
                          <TableHead style={{ width: 50 }}></TableHead>
                        )}
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activity.participants.map((participant) => (
                        <TableRow key={participant.id}>
                          {(role === "admin" || role === "teacher") && (
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                          )}
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              participant.status === "confirmed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }>
                              {participant.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              {activity.score && (
                <TabsContent value="scoreboard" className="mt-4">
                  <div className="border rounded-lg p-6 bg-muted/10">
                    <div className="flex justify-between items-center">
                      <div className="text-center flex-1">
                        <div className="font-medium">{activity.score.teamA}</div>
                        <div className="text-5xl font-bold mt-2">{activity.score.teamAScore}</div>
                      </div>
                      <div className="text-2xl text-muted-foreground font-medium px-4">vs</div>
                      <div className="text-center flex-1">
                        <div className="font-medium">{activity.score.teamB}</div>
                        <div className="text-5xl font-bold mt-2">{activity.score.teamBScore}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
          
          {role === "student" && (
            <div className="flex justify-end mt-4">
              <Button 
                disabled={!isRegistrationOpen || isFull || isUserRegistered}
                onClick={() => {
                  onJoin(activity);
                  setDialogOpen(false);
                }}
              >
                {isUserRegistered ? "Registered" : "Join Activity"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
