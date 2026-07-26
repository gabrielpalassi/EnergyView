import * as React from "react";
import { Info } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";

interface InfoTooltipProps {
  label: string;
  children: React.ReactNode;
}

export function InfoTooltip({ label, children }: InfoTooltipProps) {
  const supportsHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const trigger = (
    <button
      type="button"
      aria-label={`About ${label}`}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -m-2 flex size-8 cursor-help items-center justify-center rounded-md outline-none focus-visible:ring-2"
    >
      <Info aria-hidden="true" className="size-4" />
    </button>
  );

  if (!supportsHover) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          sideOffset={4}
          className="bg-primary text-primary-foreground w-fit max-w-64 border-0 px-3 py-1.5 text-xs text-balance"
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
