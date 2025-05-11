
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChevronDown } from "lucide-react";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for performance history
const performanceData = {
  term1: [
    { subject: "Mathematics", marks: 87 },
    { subject: "Physics", marks: 72 },
    { subject: "Chemistry", marks: 91 },
    { subject: "Biology", marks: 68 },
    { subject: "English", marks: 78 }
  ],
  term2: [
    { subject: "Mathematics", marks: 82 },
    { subject: "Physics", marks: 79 },
    { subject: "Chemistry", marks: 88 },
    { subject: "Biology", marks: 74 },
    { subject: "English", marks: 81 }
  ],
  term3: [
    { subject: "Mathematics", marks: 91 },
    { subject: "Physics", marks: 83 },
    { subject: "Chemistry", marks: 90 },
    { subject: "Biology", marks: 77 },
    { subject: "English", marks: 85 }
  ]
};

// Data for subject-wise trends
const subjectTrends = [
  { term: "Term 1", Mathematics: 87, Physics: 72, Chemistry: 91, Biology: 68, English: 78 },
  { term: "Term 2", Mathematics: 82, Physics: 79, Chemistry: 88, Biology: 74, English: 81 },
  { term: "Term 3", Mathematics: 91, Physics: 83, Chemistry: 90, Biology: 77, English: 85 }
];

// Monthly Progress Data
const monthlyProgress = [
  { month: "Jan", average: 71 },
  { month: "Feb", average: 75 },
  { month: "Mar", average: 78 },
  { month: "Apr", average: 82 },
  { month: "May", average: 85 },
  { month: "Jun", average: 81 },
  { month: "Jul", average: 84 },
  { month: "Aug", average: 88 },
  { month: "Sep", average: 91 }
];

const PerformanceGraph = () => {
  const [selectedTerm, setSelectedTerm] = useState("term3");
  const [chartType, setChartType] = useState<"subjects" | "trends" | "monthly">("subjects");
  
  const chartData = performanceData[selectedTerm as keyof typeof performanceData];
  
  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathematics: "#8884d8",
      Physics: "#82ca9d",
      Chemistry: "#ffc658",
      Biology: "#ff8042",
      English: "#0088fe"
    };
    return colors[subject as keyof typeof colors] || "#8884d8";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Button 
            variant={chartType === "subjects" ? "default" : "outline"} 
            onClick={() => setChartType("subjects")}
          >
            Subject Comparison
          </Button>
          <Button 
            variant={chartType === "trends" ? "default" : "outline"} 
            onClick={() => setChartType("trends")}
          >
            Term Trends
          </Button>
          <Button 
            variant={chartType === "monthly" ? "default" : "outline"} 
            onClick={() => setChartType("monthly")}
          >
            Monthly Progress
          </Button>
        </div>
        
        {chartType === "subjects" && (
          <Select 
            value={selectedTerm} 
            onValueChange={setSelectedTerm}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="term1">Term 1</SelectItem>
              <SelectItem value="term2">Term 2</SelectItem>
              <SelectItem value="term3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      
      <Card className="p-4">
        <CardHeader className="pb-2">
          <CardTitle>
            {chartType === "subjects" 
              ? `Performance by Subject (${selectedTerm.replace(/([A-Z])/g, ' $1').replace("term", "Term ")})` 
              : chartType === "trends" 
                ? "Subject Trends Across Terms"
                : "Monthly Performance Progress"
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {chartType === "subjects" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marks" name="Marks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {chartType === "trends" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subjectTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Mathematics" stroke={getSubjectColor("Mathematics")} />
                  <Line type="monotone" dataKey="Physics" stroke={getSubjectColor("Physics")} />
                  <Line type="monotone" dataKey="Chemistry" stroke={getSubjectColor("Chemistry")} />
                  <Line type="monotone" dataKey="Biology" stroke={getSubjectColor("Biology")} />
                  <Line type="monotone" dataKey="English" stroke={getSubjectColor("English")} />
                </LineChart>
              </ResponsiveContainer>
            )}
            
            {chartType === "monthly" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="average" name="Average Score" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your strongest subject is <span className="font-medium">Chemistry</span> with an average of 90%. 
              Focus on improving <span className="font-medium">Biology</span> which has the lowest average at 73%.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Term-on-Term Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You've shown consistent improvement across terms, with an overall 
              increase of <span className="font-medium">8.2%</span> from Term 1 to Term 3.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Based on your performance, we recommend allocating more time to 
              <span className="font-medium"> Biology</span> and <span className="font-medium">Physics</span> 
              while maintaining your excellent Chemistry routine.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceGraph;
