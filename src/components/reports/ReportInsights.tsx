
import { ReportType } from "@/pages/ReportsAnalytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

interface ReportInsightsProps {
  reportType: ReportType;
}

const ReportInsights = ({ reportType }: ReportInsightsProps) => {
  const getInsights = () => {
    switch (reportType) {
      case "attendance":
        return [
          {
            text: "Attendance has improved by 8% in the last month",
            trend: "up"
          },
          {
            text: "Monday has the highest absenteeism rate",
            trend: "neutral"
          },
          {
            text: "Class 3 has the best attendance record (96%)",
            trend: "up"
          }
        ];
      case "exam":
        return [
          {
            text: "Math scores improved by 12% compared to last semester",
            trend: "up"
          },
          {
            text: "Science scores need attention with 5% decrease",
            trend: "down"
          },
          {
            text: "Top 10% of students showing consistent performance",
            trend: "up"
          }
        ];
      case "fee":
        return [
          {
            text: "Fee collection rate improved to 93% this quarter",
            trend: "up"
          },
          {
            text: "15 students have outstanding fees for over 60 days",
            trend: "down"
          },
          {
            text: "Online payment adoption increased by 24%",
            trend: "up"
          }
        ];
      case "progress":
        return [
          {
            text: "Overall student progress shows positive trend",
            trend: "up"
          },
          {
            text: "Extracurricular participation up by 18%",
            trend: "up"
          },
          {
            text: "Reading skills need more focus in junior classes",
            trend: "down"
          }
        ];
      default:
        return [];
    }
  };

  const insights = getInsights();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium">AI Insights</CardTitle>
          <Badge variant="outline" className="bg-primary/10">
            <Lightbulb className="h-3 w-3 mr-1" />
            <span className="text-xs">AI Generated</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 p-1.5 rounded-full ${
              insight.trend === "up" 
                ? "bg-green-100 text-green-600" 
                : insight.trend === "down"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}>
              {insight.trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : insight.trend === "down" ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Lightbulb className="h-3 w-3" />
              )}
            </div>
            <p className="text-sm">{insight.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportInsights;
