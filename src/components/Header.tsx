import { Bell, HelpCircle, Search, type LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComponentType } from "react";

interface actionButton {
  id: number;
  tooltip: string;
  icon: ComponentType<LucideProps>;
  action: () => void;
}

function Header() {
  const appName = "DemoApp";

  const actionButtons: actionButton[] = [
    {
      id: 1,
      tooltip: "Search",
      icon: Search,
      action: () => console.debug("Search clicked!"),
    },
    {
      id: 2,
      tooltip: "Help",
      icon: HelpCircle,
      action: () => console.debug("Help clicked!"),
    },
    {
      id: 3,
      tooltip: "Notifications",
      icon: Bell,
      action: () => console.debug("Notifications clicked!"),
    },
  ];

  return (
    <nav className="relative bg-white border-b border-gray-200 px-6 py-3">
      <div className=" flex items-center justify-between ">
        {/* App Name */}
        <span className="text-2xl font-bold">{appName}</span>

        {/* Action button area */}
        <div className="flex flex-row gap-2">
          {/* Action button list */}
          {actionButtons.map((button) => (
            <Tooltip key={button.id}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={button.action}>
                  <button.icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Header;
