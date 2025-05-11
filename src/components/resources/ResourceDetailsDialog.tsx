
import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, FileText, Link as LinkIcon, User, Calendar, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyResource } from "@/types/resources";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface ResourceDetailsDialogProps {
  resource: StudyResource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResourceDetailsDialog = ({ resource, open, onOpenChange }: ResourceDetailsDialogProps) => {
  if (!resource) return null;

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="h-5 w-5" />;
      case "website":
        return <LinkIcon className="h-5 w-5" />;
      case "document":
      case "ebook":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    
    if (url.includes("youtube.com/watch")) {
      videoId = new URL(url).searchParams.get("v") || "";
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || "";
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{resource.title}</DialogTitle>
            <Badge variant="outline">{resource.gradeLevel}</Badge>
            <Badge variant="secondary" className="capitalize">
              {getResourceIcon(resource.type)}
              <span className="ml-1">{resource.type}</span>
            </Badge>
          </div>
          <DialogDescription>
            {resource.subject} - Added by {resource.teacher.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm">{resource.description}</p>
          </div>
          
          {resource.type === "video" && isYouTubeUrl(resource.url) && (
            <div className="mt-4">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border">
                <iframe
                  src={getYouTubeEmbedUrl(resource.url)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Added by:</span>
              <span>{resource.teacher.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Created:</span>
              <span>{format(new Date(resource.createdAt), "MMM d, yyyy")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Last Updated:</span>
              <span>{format(new Date(resource.updatedAt), "MMM d, yyyy")}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full sm:w-auto" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Resource
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDetailsDialog;
