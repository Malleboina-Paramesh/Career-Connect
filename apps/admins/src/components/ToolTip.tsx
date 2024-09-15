import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@local/ui/components/tooltip";
import React from "react";

interface ToolTipProps {
  trigger: React.ReactNode;
  content: string;
}

const ToolTip = ({ content, trigger }: ToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
