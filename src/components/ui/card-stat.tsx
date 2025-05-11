
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconColor = "bg-primary/10 text-primary",
}: StatCardProps) {
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
              
              {trend && trendValue && (
                <p className={cn("text-xs font-medium mt-2 flex items-center", trendColor)}>
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
                </p>
              )}
            </div>
            <div className={cn("p-3 rounded-full", iconColor)}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
