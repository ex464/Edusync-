
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Mail,
  Share2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ExportOptionsProps {
  title?: string;
  onExport?: (format: string) => void;
}

export function ExportOptions({ title = "Export Data", onExport }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: string) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      
      if (onExport) {
        onExport(format);
      } else {
        toast({
          title: `Export Successful`,
          description: `Data has been exported as ${format} file.`,
        });
      }
    }, 800);
  };

  const handleEmailReport = () => {
    toast({
      title: "Report Emailed",
      description: "The financial report has been sent to registered email addresses.",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">Choose export format</p>
        </div>
        <Separator className="my-2" />
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            disabled={isExporting}
            onClick={() => handleExport("Excel")}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel (.xlsx)
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            disabled={isExporting}
            onClick={() => handleExport("PDF")}
          >
            <FileText className="h-4 w-4 mr-2" />
            PDF Document
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            disabled={isExporting}
            onClick={() => handleExport("CSV")}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV File
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={() => handleEmailReport()}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={() => toast({
              title: "Print Dialog Opened",
              description: "Prepare to print your financial report."
            })}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={() => toast({
              title: "Share Link Generated",
              description: "Report link has been copied to clipboard."
            })}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
