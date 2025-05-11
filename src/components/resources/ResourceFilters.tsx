
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResourceFiltersProps {
  activeSubject: string;
  setActiveSubject: (subject: string) => void;
  activeType: string;
  setActiveType: (type: string) => void;
}

const ResourceFilters = ({ 
  activeSubject, 
  setActiveSubject, 
  activeType, 
  setActiveType 
}: ResourceFiltersProps) => {
  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "computers", label: "Computers" },
    { value: "arts", label: "Arts" }
  ];

  const resourceTypes = [
    { value: "all", label: "All Types" },
    { value: "video", label: "Videos 🎬" },
    { value: "website", label: "Websites 🌐" },
    { value: "document", label: "Documents 📄" },
    { value: "ebook", label: "E-Books 📚" },
    { value: "other", label: "Other 📁" }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium leading-none">Subject</h3>
        <Tabs 
          value={activeSubject} 
          onValueChange={setActiveSubject}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {subjects.map((subject) => (
              <TabsTrigger key={subject.value} value={subject.value}>
                {subject.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium leading-none">Resource Type</h3>
        <Tabs 
          value={activeType} 
          onValueChange={setActiveType}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {resourceTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceFilters;
