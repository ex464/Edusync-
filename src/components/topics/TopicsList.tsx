
import { useState } from "react";
import { Topic, SubjectType } from "@/types/topics";
import TopicCard from "./TopicCard";
import TopicDetailsDialog from "./TopicDetailsDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TopicsListProps {
  subject: SubjectType;
}

const TopicsList = ({ subject }: TopicsListProps) => {
  // This would normally come from a database or API
  // For now, we'll use mock data
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data with different topics for each subject
  const mockTopics: Topic[] = [
    {
      id: "1",
      title: "Introduction to Algebra",
      description: "Learn the basic concepts of algebraic expressions and equations. This topic covers variables, constants, and simple equations.",
      subject: "mathematics",
      gradeLevel: "Grade 8",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-03-15"),
      teacher: {
        id: "t1",
        name: "Ms. Johnson"
      },
      attachments: [
        {
          id: "a1",
          name: "Algebra Basics.pdf",
          type: "pdf",
          url: "/files/algebra-basics.pdf",
          uploadedAt: new Date("2025-03-15"),
          size: 2048
        },
        {
          id: "a2",
          name: "Practice Problems.docx",
          type: "document",
          url: "/files/algebra-practice.docx",
          uploadedAt: new Date("2025-03-15"),
          size: 512
        }
      ]
    },
    {
      id: "2",
      title: "Geometry Fundamentals",
      description: "An overview of basic geometric shapes, properties, and theorems. Includes triangles, circles, and polygons.",
      subject: "mathematics",
      gradeLevel: "Grade 9",
      createdAt: new Date("2025-02-05"),
      updatedAt: new Date("2025-02-05"),
      teacher: {
        id: "t1",
        name: "Ms. Johnson"
      },
      attachments: [
        {
          id: "a3",
          name: "Geometry Fundamentals.pptx",
          type: "presentation",
          url: "/files/geometry.pptx",
          uploadedAt: new Date("2025-02-05"),
          size: 3500
        }
      ]
    },
    {
      id: "3",
      title: "Cell Structure and Function",
      description: "Exploration of cell biology including organelles, membrane transport, and cell division processes.",
      subject: "science",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-01-20"),
      updatedAt: new Date("2025-01-25"),
      teacher: {
        id: "t2",
        name: "Mr. Williams"
      },
      attachments: [
        {
          id: "a4",
          name: "Cell Diagram.jpg",
          type: "image",
          url: "/files/cell-diagram.jpg",
          uploadedAt: new Date("2025-01-25"),
          size: 1024
        },
        {
          id: "a5",
          name: "Cell Division Video",
          type: "video",
          url: "https://example.com/cell-division",
          uploadedAt: new Date("2025-01-25")
        }
      ]
    },
    {
      id: "4",
      title: "Chemical Reactions",
      description: "Study of different types of chemical reactions, balancing equations, and factors affecting reaction rates.",
      subject: "science",
      gradeLevel: "Grade 11",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-10"),
      teacher: {
        id: "t2",
        name: "Mr. Williams"
      },
      attachments: [
        {
          id: "a6",
          name: "Chemical Reactions Guide.pdf",
          type: "pdf",
          url: "/files/chem-reactions.pdf",
          uploadedAt: new Date("2025-03-10"),
          size: 1850
        }
      ]
    },
    {
      id: "5",
      title: "Shakespeare's Romeo and Juliet",
      description: "Analysis of themes, characters, and literary devices in Shakespeare's famous tragedy.",
      subject: "english",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-02-15"),
      updatedAt: new Date("2025-02-28"),
      teacher: {
        id: "t3",
        name: "Mrs. Davis"
      },
      attachments: [
        {
          id: "a7",
          name: "Romeo and Juliet Full Text.pdf",
          type: "pdf",
          url: "/files/romeo-juliet.pdf",
          uploadedAt: new Date("2025-02-28"),
          size: 4096
        },
        {
          id: "a8",
          name: "Character Analysis Guide.docx",
          type: "document",
          url: "/files/character-analysis.docx",
          uploadedAt: new Date("2025-02-28"),
          size: 750
        }
      ]
    },
    {
      id: "6",
      title: "World War II",
      description: "Comprehensive overview of the causes, key events, and consequences of World War II on global politics.",
      subject: "history",
      gradeLevel: "Grade 11",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-03-20"),
      teacher: {
        id: "t4",
        name: "Mr. Brown"
      },
      attachments: [
        {
          id: "a9",
          name: "WWII Timeline.pdf",
          type: "pdf",
          url: "/files/wwii-timeline.pdf",
          uploadedAt: new Date("2025-03-20"),
          size: 1536
        },
        {
          id: "a10",
          name: "Interactive Map",
          type: "link",
          url: "https://example.com/wwii-map",
          uploadedAt: new Date("2025-03-20")
        }
      ]
    },
    {
      id: "7",
      title: "Climate Zones",
      description: "Exploration of Earth's climate zones, factors influencing climate, and impact of climate change.",
      subject: "geography",
      gradeLevel: "Grade 9",
      createdAt: new Date("2025-02-25"),
      updatedAt: new Date("2025-03-05"),
      teacher: {
        id: "t5",
        name: "Ms. Garcia"
      },
      attachments: [
        {
          id: "a11",
          name: "Climate Zones Map.jpg",
          type: "image",
          url: "/files/climate-zones.jpg",
          uploadedAt: new Date("2025-03-05"),
          size: 2048
        },
        {
          id: "a12",
          name: "Climate Factors Presentation.pptx",
          type: "presentation",
          url: "/files/climate-factors.pptx",
          uploadedAt: new Date("2025-03-05"),
          size: 3200
        }
      ]
    },
    {
      id: "8",
      title: "Introduction to HTML and CSS",
      description: "Learn the fundamentals of web development with HTML structure and CSS styling basics.",
      subject: "computers",
      gradeLevel: "Grade 10",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-18"),
      teacher: {
        id: "t6",
        name: "Mr. Taylor"
      },
      attachments: [
        {
          id: "a13",
          name: "HTML CSS Basics.pdf",
          type: "pdf",
          url: "/files/html-css.pdf",
          uploadedAt: new Date("2025-03-18"),
          size: 1280
        },
        {
          id: "a14",
          name: "Code Examples",
          type: "link",
          url: "https://example.com/code-examples",
          uploadedAt: new Date("2025-03-18")
        }
      ]
    }
  ];

  // Filter topics based on the selected subject and search query
  const filteredTopics = mockTopics.filter(topic => 
    topic.subject === subject && 
    (searchQuery === "" || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredTopics.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No topics found for this subject</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              onClick={handleTopicClick}
            />
          ))}
        </div>
      )}

      <TopicDetailsDialog 
        topic={selectedTopic} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
};

export default TopicsList;
