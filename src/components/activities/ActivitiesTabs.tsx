
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityCategory } from "@/types/activities";

interface ActivitiesTabsProps {
  activeCategory: ActivityCategory;
  setActiveCategory: (category: ActivityCategory) => void;
}

const ActivitiesTabs = ({ activeCategory, setActiveCategory }: ActivitiesTabsProps) => {
  const categories: { value: ActivityCategory; label: string }[] = [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "dance", label: "Dance" },
    { value: "debate", label: "Debate" },
    { value: "art", label: "Art" },
    { value: "other", label: "Other" },
  ];

  return (
    <Tabs 
      value={activeCategory} 
      onValueChange={(value) => setActiveCategory(value as ActivityCategory)}
      className="w-full"
    >
      <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:grid-cols-6">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ActivitiesTabs;
