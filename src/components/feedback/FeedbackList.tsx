
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search } from "lucide-react";

// Mock data - in a real app this would come from an API
const mockFeedback = [
  {
    id: 1,
    title: "Suggestion for Science Curriculum",
    category: "classes",
    message: "I think we should add more practical experiments in science classes.",
    date: "2025-04-05",
    sender: "Teacher: John Smith",
    status: "pending",
    isAnonymous: false,
  },
  {
    id: 2,
    title: "Feedback on Math Teaching Methods",
    category: "teaching",
    message: "The new interactive teaching methods have really helped improve understanding.",
    date: "2025-04-02",
    sender: "Anonymous",
    status: "responded",
    isAnonymous: true,
  },
  {
    id: 3,
    title: "Sports Day Organization",
    category: "sports",
    message: "The recent sports day was well organized but could use more water stations.",
    date: "2025-03-28",
    sender: "Student: Emma Johnson",
    status: "pending",
    isAnonymous: false,
  },
  {
    id: 4,
    title: "Library Resources Request",
    category: "facilities",
    message: "We need more study spaces and updated reference books in the library.",
    date: "2025-03-25",
    sender: "Teacher: Sarah Williams",
    status: "pending",
    isAnonymous: false,
  },
  {
    id: 5,
    title: "Annual Day Suggestions",
    category: "events",
    message: "The annual day could include more student performances and better seating arrangements.",
    date: "2025-03-20",
    sender: "Anonymous",
    status: "responded",
    isAnonymous: true,
  },
];

const getCategoryLabel = (categoryId: string) => {
  const categories: Record<string, string> = {
    classes: "Classes & Curriculum",
    teaching: "Teaching Quality",
    sports: "Sports & Activities",
    facilities: "Facilities",
    events: "Events",
  };
  return categories[categoryId] || categoryId;
};

interface FeedbackListProps {
  onSelectFeedback: (feedback: any) => void;
}

const FeedbackList = ({ onSelectFeedback }: FeedbackListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const filteredFeedback = mockFeedback.filter(feedback => {
    const matchesSearch = searchQuery === "" || 
      feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === "" || feedback.category === categoryFilter;
    const matchesStatus = statusFilter === "" || feedback.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Submissions</CardTitle>
        <CardDescription>
          Review and respond to feedback from students and teachers
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              className="pl-8"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="classes">Classes & Curriculum</SelectItem>
                <SelectItem value="teaching">Teaching Quality</SelectItem>
                <SelectItem value="sports">Sports & Activities</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No feedback found
                </TableCell>
              </TableRow>
            ) : (
              filteredFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.title}</TableCell>
                  <TableCell>
                    {getCategoryLabel(feedback.category)}
                  </TableCell>
                  <TableCell>{feedback.sender}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell>
                    <Badge variant={feedback.status === "pending" ? "outline" : "secondary"}>
                      {feedback.status === "pending" ? "Pending" : "Responded"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSelectFeedback(feedback)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {feedback.status === "pending" ? "Respond" : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeedbackList;
