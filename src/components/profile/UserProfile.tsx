
import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenSquare, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher" | "student";
    profilePicture?: string;
    phone?: string;
    address?: string;
    qualification?: string;
    experience?: string;
    specialization?: string;
    bio?: string;
    [key: string]: any; // For additional fields
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the user data
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setEditMode(false);
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="relative pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="aspect-square h-full w-full"
                  />
                ) : (
                  <div className="bg-primary h-full w-full flex items-center justify-center text-white text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setEditMode(!editMode)} 
              className="absolute top-4 right-4"
            >
              {editMode ? <Save className="h-4 w-4" /> : <PenSquare className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex justify-between">
                    <span className="font-medium">Phone</span>
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex justify-between">
                    <span className="font-medium">Address</span>
                    <span>{user.address}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {user.qualification && (
                  <div className="flex justify-between">
                    <span className="font-medium">Qualification</span>
                    <span>{user.qualification}</span>
                  </div>
                )}
                {user.experience && (
                  <div className="flex justify-between">
                    <span className="font-medium">Experience</span>
                    <span>{user.experience}</span>
                  </div>
                )}
                {user.specialization && (
                  <div className="flex justify-between">
                    <span className="font-medium">Specialization</span>
                    <span>{user.specialization}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      type="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone || ""} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address || ""} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  {(user.role === "admin" || user.role === "teacher") && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input 
                          id="qualification" 
                          name="qualification" 
                          value={formData.qualification || ""} 
                          onChange={handleChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Input 
                          id="experience" 
                          name="experience" 
                          value={formData.experience || ""} 
                          onChange={handleChange} 
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.bio && (
                    <div className="md:col-span-2">
                      <Label>Bio</Label>
                      <p className="mt-1 text-sm">{user.bio}</p>
                    </div>
                  )}
                  
                  {user.specialization && (
                    <div>
                      <Label>Specialization</Label>
                      <p className="mt-1 text-sm">{user.specialization}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter current password" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter new password" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm new password" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button>Change Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                User preferences settings will appear here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
