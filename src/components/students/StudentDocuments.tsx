
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, PenSquare } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  file: File | string;
  dateUploaded?: string;
}

interface StudentDocumentsProps {
  documents: Document[];
  onView?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
}

const StudentDocuments = ({ 
  documents, 
  onView, 
  onEdit, 
  onDownload 
}: StudentDocumentsProps) => {
  
  // Group documents by type
  const groupedDocuments = documents.reduce((groups: Record<string, Document[]>, document) => {
    const type = document.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    
    groups[type].push(document);
    return groups;
  }, {});
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Student Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedDocuments).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedDocuments).map(([type, docs]) => (
              <div key={type} className="space-y-3">
                <h3 className="text-lg font-semibold capitalize">{type} Documents</h3>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.dateUploaded || "Recently uploaded"}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {onView && (
                          <Button variant="ghost" size="icon" onClick={() => onView(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="ghost" size="icon" onClick={() => onEdit(doc)}>
                            <PenSquare className="h-4 w-4" />
                          </Button>
                        )}
                        {onDownload && (
                          <Button variant="ghost" size="icon" onClick={() => onDownload(doc)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No documents available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentDocuments;
