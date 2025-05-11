
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "classes", label: "Classes & Curriculum" },
  { id: "teaching", label: "Teaching Quality" },
  { id: "sports", label: "Sports & Extra Activities" },
  { id: "facilities", label: "School Facilities" },
  { id: "events", label: "School Events" },
];

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send data to a backend
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setTitle("");
    setCategory("");
    setMessage("");
    setIsAnonymous(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>
          Share your thoughts to help us improve the school experience
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Subject</Label>
            <Input
              id="title"
              placeholder="Brief description of your feedback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Feedback Details</Label>
            <Textarea
              id="message"
              placeholder="Please provide detailed feedback"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous">Submit anonymously</Label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">Submit Feedback</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
