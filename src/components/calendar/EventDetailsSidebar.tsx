
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  User, 
  Calendar as CalendarIcon, 
  Edit, 
  Trash
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface EventDetailsSidebarProps {
  selectedEvent: CalendarEvent | null;
  onClose: () => void;
  onUpdate?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "exam":
      return "bg-red-100 text-red-800 border-red-200";
    case "holiday":
      return "bg-green-100 text-green-800 border-green-200";
    case "meeting":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "class":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "event":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const EventDetailsSidebar = ({
  selectedEvent,
  onClose,
  onUpdate,
  onDelete,
}: EventDetailsSidebarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState<CalendarEvent | null>(null);

  const handleEdit = () => {
    if (selectedEvent) {
      setEditedEvent(selectedEvent);
      setIsEditing(true);
    }
  };

  const handleSaveChanges = () => {
    if (editedEvent && onUpdate) {
      onUpdate(editedEvent);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedEvent(null);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (selectedEvent && onDelete) {
      onDelete(selectedEvent.id);
      setIsDeleteDialogOpen(false);
    }
  };

  if (!selectedEvent) {
    return (
      <Card className="h-full flex items-center justify-center text-center p-6 text-muted-foreground">
        <div>
          <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No event selected</h3>
          <p className="mt-2">Select an event from the calendar to view details</p>
        </div>
      </Card>
    );
  }

  if (isEditing && editedEvent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedEvent.title}
              onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={editedEvent.location || ""}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedEvent.description}
              onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className={cn("flex flex-col gap-2", getEventTypeColor(selectedEvent.type))}>
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-white/30">
              {selectedEvent.type}
            </Badge>
            {onUpdate && onDelete && (
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <CardTitle className="text-xl mt-2">{selectedEvent.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start gap-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Date & Time</div>
              <div className="text-sm text-muted-foreground">
                {format(selectedEvent.start, "EEEE, MMMM d, yyyy")}
              </div>
              {selectedEvent.allDay ? (
                <div className="text-sm text-muted-foreground">All day</div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {format(selectedEvent.start, "h:mm a")} - {format(selectedEvent.end, "h:mm a")}
                </div>
              )}
            </div>
          </div>
          
          {selectedEvent.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-sm text-muted-foreground">{selectedEvent.location}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Created By</div>
              <div className="text-sm text-muted-foreground">
                {selectedEvent.createdBy.name} ({selectedEvent.createdBy.role})
              </div>
            </div>
          </div>
          
          {selectedEvent.description && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event "{selectedEvent.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventDetailsSidebar;
