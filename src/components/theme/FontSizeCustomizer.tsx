
import { useState, useEffect } from "react";
import { Type } from "lucide-react"; // Changed from Typography to Type
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

export function FontSizeCustomizer() {
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedFontSize = localStorage.getItem("app-font-size");
    return savedFontSize ? parseInt(savedFontSize) : 100;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("app-font-size", fontSize.toString());
  }, [fontSize]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handleReset = () => {
    setFontSize(100);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Type className="h-5 w-5" /> {/* Changed from Typography to Type */}
          <span className="sr-only">Adjust font size</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Adjust Font Size</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm">A</span>
            <Slider
              value={[fontSize]}
              min={80}
              max={150}
              step={5}
              onValueChange={handleFontSizeChange}
              className="flex-1"
            />
            <span className="text-lg">A</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{fontSize}%</span>
            <Button size="sm" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
