
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PromotionRules = () => {
  const handleSaveRules = () => {
    toast.success("Promotion rules saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotion Rules Configuration</CardTitle>
        <CardDescription>
          Configure automatic promotion rules for different classes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General Rules</TabsTrigger>
            <TabsTrigger value="academic">Academic Criteria</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-promote">Auto-promote passing students</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically promote students with "Pass" status
                  </p>
                </div>
                <Switch id="auto-promote" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="retain-failing">Retain failing students</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep students with "Fail" status in the same class
                  </p>
                </div>
                <Switch id="retain-failing" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deactivate-tc">Deactivate students with TC</Label>
                  <p className="text-sm text-muted-foreground">
                    Mark students with Transfer Certificate as inactive
                  </p>
                </div>
                <Switch id="deactivate-tc" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deactivate-dropout">Deactivate dropouts</Label>
                  <p className="text-sm text-muted-foreground">
                    Mark dropout students as inactive in the system
                  </p>
                </div>
                <Switch id="deactivate-dropout" defaultChecked />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-attendance">Minimum Attendance Required (%)</Label>
                  <Input id="min-attendance" type="number" defaultValue="75" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-grade">Minimum Grade Required</Label>
                  <Input id="min-grade" type="text" defaultValue="D" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-fails">Maximum Failed Subjects Allowed</Label>
                <Input id="max-fails" type="number" defaultValue="2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Students failing in more than this number of subjects will be retained
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-grace">Allow Grace Marks</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply grace marks to borderline cases
                  </p>
                </div>
                <Switch id="allow-grace" defaultChecked />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-parents">Notify Parents</Label>
                  <p className="text-sm text-muted-foreground">
                    Send promotion notifications to parents
                  </p>
                </div>
                <Switch id="notify-parents" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-teachers">Notify Class Teachers</Label>
                  <p className="text-sm text-muted-foreground">
                    Send promotion notifications to respective class teachers
                  </p>
                </div>
                <Switch id="notify-teachers" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-template">Notification Template</Label>
                <textarea 
                  id="notification-template" 
                  className="w-full min-h-[100px] p-2 border rounded-md resize-y"
                  defaultValue="Dear {parent_name}, your child {student_name} has been promoted to {new_class} for the academic year {academic_year}. Please complete the promotion formalities by {date}. Thank you."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveRules}>Save Rules</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionRules;
