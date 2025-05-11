
import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ExternalLink, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Topic, TopicAttachment } from "@/types/topics";
import { Badge } from "@/components/ui/badge";

interface TopicDetailsDialogProps {
  topic: Topic | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TopicDetailsDialog = ({ topic, open, onOpenChange }: TopicDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "attachments">("info");

  if (!topic) return null;

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "document":
        return "📝";
      case "presentation":
        return "📊";
      case "image":
        return "🖼️";
      case "video":
        return "🎬";
      case "link":
        return "🔗";
      default:
        return "📁";
    }
  };

  const renderAttachment = (attachment: TopicAttachment) => (
    <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md mb-2 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{getAttachmentIcon(attachment.type)}</div>
        <div className="overflow-hidden">
          <p className="font-medium truncate">{attachment.name}</p>
          <p className="text-xs text-muted-foreground">
            Added {format(new Date(attachment.uploadedAt), "MMM d, yyyy")}
            {attachment.size && ` • ${attachment.size > 1024 
              ? `${(attachment.size / 1024).toFixed(1)} MB` 
              : `${attachment.size} KB`}`}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        {attachment.type === "link" ? (
          <Button variant="outline" size="icon" asChild>
            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="icon" asChild>
            <a href={attachment.url} download={attachment.name}>
              <Download className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{topic.title}</DialogTitle>
            <Badge variant="outline">{topic.gradeLevel}</Badge>
          </div>
          <DialogDescription>
            {topic.subject.charAt(0).toUpperCase() + topic.subject.slice(1)}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "info" | "attachments")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="attachments">
              Attachments ({topic.attachments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 pt-4">
            <div className="space-y-1">
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm">{topic.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Teacher:</span>
                <span className="text-sm">{topic.teacher.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm">{format(new Date(topic.createdAt), "MMM d, yyyy")}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated:</span>
                <span className="text-sm">{format(new Date(topic.updatedAt), "MMM d, yyyy")}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="attachments" className="space-y-2 pt-4">
            {topic.attachments.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">No attachments available</h3>
                <p className="text-sm text-muted-foreground">
                  This topic doesn't have any attached files or links
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {topic.attachments.map(renderAttachment)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDetailsDialog;
