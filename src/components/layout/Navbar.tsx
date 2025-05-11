
import { Bell, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FontSizeCustomizer } from "@/components/theme/FontSizeCustomizer";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";

interface NavbarProps {
  onMenuButtonClick: () => void;
  role: "admin" | "teacher" | "student";
}

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "Fee Payment Reminder",
    message: "Last date for fee payment is 15th August",
    time: "10:30 AM",
    isRead: false,
    priority: "high"
  },
  {
    id: 2,
    title: "Exam Schedule Updated",
    message: "Science exam postponed to 25th August",
    time: "Yesterday",
    isRead: false,
    priority: "medium"
  },
  {
    id: 3,
    title: "Attendance Alert",
    message: "Your attendance is below required threshold",
    time: "2 days ago",
    isRead: true,
    priority: "high"
  }
];

const Navbar = ({ onMenuButtonClick, role }: NavbarProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    navigate("/login");
  };

  const getRoleColor = () => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-700";
      case "teacher":
        return "bg-green-100 text-green-700";
      case "student":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? {...notif, isRead: true} : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({...notif, isRead: true}))
    );
  };

  const viewAllNotifications = () => {
    navigate(`/${role}/notifications`);
  };

  return (
    <header className="h-16 z-30 border-b bg-card/60 backdrop-blur-md">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onMenuButtonClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getRoleColor()}`}>
            {role}
          </span>
          
          <LanguageSelector />
          <ThemeToggle />
          <FontSizeCustomizer />
          
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                    >
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-80">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-4 hover:bg-accent cursor-pointer ${!notif.isRead ? 'bg-muted/50' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium flex items-center gap-2">
                              {notif.title}
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              )}
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${getPriorityColor(notif.priority)} text-white text-xs`}
                            >
                              {notif.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </ScrollArea>
                <div className="p-2 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={viewAllNotifications}
                  >
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 rounded-full" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar-placeholder.jpg" alt="User" />
                  <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/${role}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/${role}/settings`)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
