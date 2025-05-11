
import { useState } from "react";
import { StudyResource } from "@/types/resources";
import ResourceCard from "./ResourceCard";
import ResourceDetailsDialog from "./ResourceDetailsDialog";
import { BookOpen } from "lucide-react";

interface ResourcesListProps {
  subject: string;
  resourceType: string;
  searchQuery: string;
}

const ResourcesList = ({ subject, resourceType, searchQuery }: ResourcesListProps) => {
  const [selectedResource, setSelectedResource] = useState<StudyResource | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data with different resources
  const mockResources: StudyResource[] = [
    {
      id: "1",
      title: "Introduction to Algebra - Video Tutorial",
      description: "A comprehensive video tutorial explaining the fundamentals of algebraic expressions and equations. Perfect for beginners.",
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      subject: "Mathematics",
      gradeLevel: "Grade 8",
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-03-10"),
      teacher: {
        id: "t1",
        name: "Ms. Johnson"
      },
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },
    {
      id: "2",
      title: "Interactive Geometry Learning Tool",
      description: "An interactive website that helps students understand geometric concepts through visual demonstrations and practice exercises.",
      type: "website",
      url: "https://www.geogebra.org/",
      subject: "Mathematics",
      gradeLevel: "Grade 9",
      createdAt: new Date("2025-02-05"),
      updatedAt: new Date("2025-02-05"),
      teacher: {
        id: "t1",
        name: "Ms. Johnson"
      }
    },
    {
      id: "3",
      title: "Cell Biology - Illustrated Guide",
      description: "A comprehensive e-book covering all aspects of cell biology with detailed illustrations and explanations.",
      type: "ebook",
      url: "https://example.com/cell-biology-ebook",
      subject: "Science",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-01-20"),
      updatedAt: new Date("2025-01-25"),
      teacher: {
        id: "t2",
        name: "Mr. Williams"
      }
    },
    {
      id: "4",
      title: "Chemical Reactions - Video Series",
      description: "A series of video lectures explaining different types of chemical reactions with demonstrations.",
      type: "video",
      url: "https://www.youtube.com/watch?v=0RRVV4Diomg",
      subject: "Science",
      gradeLevel: "Grade 11",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-10"),
      teacher: {
        id: "t2",
        name: "Mr. Williams"
      }
    },
    {
      id: "5",
      title: "Shakespeare's Complete Works",
      description: "Digital collection of all of Shakespeare's plays and sonnets with annotations and study guides.",
      type: "document",
      url: "https://example.com/shakespeare-works",
      subject: "English",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-02-15"),
      updatedAt: new Date("2025-02-28"),
      teacher: {
        id: "t3",
        name: "Mrs. Davis"
      }
    },
    {
      id: "6",
      title: "World War II Interactive Timeline",
      description: "An interactive timeline showing key events, battles, and turning points of World War II.",
      type: "website",
      url: "https://example.com/wwii-timeline",
      subject: "History",
      gradeLevel: "Grade 11",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-03-20"),
      teacher: {
        id: "t4",
        name: "Mr. Brown"
      }
    },
    {
      id: "7",
      title: "Climate Change Research Papers",
      description: "Collection of recent research papers on climate change and its impact on different regions.",
      type: "document",
      url: "https://example.com/climate-research",
      subject: "Geography",
      gradeLevel: "Grade 12",
      createdAt: new Date("2025-02-25"),
      updatedAt: new Date("2025-03-05"),
      teacher: {
        id: "t5",
        name: "Ms. Garcia"
      }
    },
    {
      id: "8",
      title: "Web Development Crash Course",
      description: "A comprehensive video series teaching HTML, CSS, and JavaScript for beginners.",
      type: "video",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      subject: "Computers",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-18"),
      teacher: {
        id: "t6",
        name: "Mr. Taylor"
      }
    }
  ];

  // Filter resources based on the selected subject, type and search query
  const filteredResources = mockResources.filter(resource => 
    (subject === "all" || resource.subject.toLowerCase() === subject) && 
    (resourceType === "all" || resource.type === resourceType) &&
    (searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleResourceClick = (resource: StudyResource) => {
    setSelectedResource(resource);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {filteredResources.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/30">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium">No resources found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? "Try adjusting your search terms or filters" 
              : "No resources available for the selected subject and type"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onClick={handleResourceClick}
            />
          ))}
        </div>
      )}

      <ResourceDetailsDialog 
        resource={selectedResource} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
};

export default ResourcesList;
