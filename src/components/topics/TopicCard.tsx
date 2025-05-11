
import { CalendarDays, FileText, User } from "lucide-react";
import { format } from "date-fns";
import { Topic } from "@/types/topics";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  // Helper function to get the correct icon for attachment type
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

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{topic.title}</CardTitle>
          <Badge variant="outline">{topic.gradeLevel}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {topic.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <User className="h-3 w-3" />
          <span>{topic.teacher.name}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <CalendarDays className="h-3 w-3" />
          <span>{format(new Date(topic.updatedAt), "MMM d, yyyy")}</span>
        </div>
        
        {topic.attachments.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="attachments" className="border-0">
              <AccordionTrigger className="py-1 text-sm">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{topic.attachments.length} Attachments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {topic.attachments.map((attachment) => (
                    <li key={attachment.id} className="text-xs flex items-center gap-1">
                      <span>{getAttachmentIcon(attachment.type)}</span>
                      <span className="truncate">{attachment.name}</span>
                      {attachment.size && (
                        <span className="text-muted-foreground ml-auto">
                          {attachment.size > 1024 
                            ? `${(attachment.size / 1024).toFixed(1)} MB` 
                            : `${attachment.size} KB`}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full" onClick={() => onClick(topic)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
