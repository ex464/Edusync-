
import { ExternalLink, FileText, Link as LinkIcon, Youtube } from "lucide-react";
import { format } from "date-fns";
import { StudyResource } from "@/types/resources";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ResourceCardProps {
  resource: StudyResource;
  onClick: (resource: StudyResource) => void;
}

const ResourceCard = ({ resource, onClick }: ResourceCardProps) => {
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
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{resource.title}</CardTitle>
          <Badge variant="outline">{resource.gradeLevel}</Badge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {getResourceIcon(resource.type)}
          <span className="capitalize">{resource.type}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {resource.description}
        </p>
        
        {resource.type === "video" && isYouTubeUrl(resource.url) && (
          <div className="mb-3">
            <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-md">
              {resource.thumbnail ? (
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => onClick(resource)}
                />
              ) : (
                <iframe
                  src={getYouTubeEmbedUrl(resource.url)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </AspectRatio>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground flex flex-col gap-1">
          <div>
            <span className="font-medium">Subject:</span> {resource.subject}
          </div>
          <div>
            <span className="font-medium">Added by:</span> {resource.teacher.name}
          </div>
          <div>
            <span className="font-medium">Updated:</span> {format(new Date(resource.updatedAt), "MMM d, yyyy")}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <div className="w-full flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onClick(resource)}>
            View Details
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Open
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
