
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectType } from "@/types/topics";

const subjectIcons: Record<SubjectType, string> = {
  mathematics: "🧮",
  science: "🧪",
  english: "📝",
  history: "🏛️",
  geography: "🌍",
  computers: "💻",
  arts: "🎨",
  other: "📚"
};

interface SubjectTabsProps {
  activeSubject: SubjectType;
  setActiveSubject: (subject: SubjectType) => void;
}

const SubjectTabs = ({ activeSubject, setActiveSubject }: SubjectTabsProps) => {
  const subjects: { value: SubjectType; label: string }[] = [
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "computers", label: "Computers" },
    { value: "arts", label: "Arts" },
    { value: "other", label: "Other" },
  ];

  return (
    <Tabs 
      value={activeSubject} 
      onValueChange={(value) => setActiveSubject(value as SubjectType)}
      className="w-full"
    >
      <TabsList className="w-full grid grid-cols-4 md:grid-cols-8">
        {subjects.map((subject) => (
          <TabsTrigger key={subject.value} value={subject.value} className="flex items-center gap-1">
            <span>{subjectIcons[subject.value]}</span>
            <span className="hidden md:inline">{subject.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default SubjectTabs;
