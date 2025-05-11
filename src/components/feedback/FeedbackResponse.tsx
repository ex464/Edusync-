
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface FeedbackResponseProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: any | null;
}

const FeedbackResponse = ({ isOpen, onClose, feedback }: FeedbackResponseProps) => {
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const handleSubmitResponse = () => {
    if (!response.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to a backend
    toast({
      title: "Response sent",
      description: "Your response has been sent successfully",
    });

    setResponse("");
    onClose();
  };

  if (!feedback) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{feedback.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 pt-2">
            <span>Category: {getCategoryLabel(feedback.category)}</span>
            <span>•</span>
            <span>From: {feedback.sender}</span>
            <span>•</span>
            <span>Date: {feedback.date}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm">{feedback.message}</p>
          </div>

          {feedback.status === "responded" ? (
            <div>
              <p className="text-sm font-medium mb-2">Your Response:</p>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm">Thank you for your valuable feedback. We will consider your suggestions for improvement.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="response" className="text-sm font-medium">
                Your Response
              </label>
              <Textarea
                id="response"
                placeholder="Type your response here..."
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {feedback.status === "responded" ? "Close" : "Cancel"}
          </Button>
          
          {feedback.status === "pending" && (
            <Button onClick={handleSubmitResponse}>
              Send Response
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackResponse;
