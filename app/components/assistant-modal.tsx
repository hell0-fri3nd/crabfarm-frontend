"use client";

import { BotIcon, XIcon } from "lucide-react";
import { useState, type FC } from "react";

import { Thread } from "~/components/thread";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export const AssistantModal: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <Button
        type="button"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Assistant" : "Open Assistant"}
        className={cn(
          "fixed end-6 z-50 rounded-full shadow-lg",
          "bottom-6 md:bottom-8 size-14",
          "transition-transform duration-200 ease-out",
          "hover:scale-105 active:scale-95",
          "motion-reduce:transition-none",
        )}
      >
        <BotIcon className="size-6" />
        <span className="sr-only">
          {open ? "Close Assistant" : "Open Assistant"}
        </span>
      </Button>

      {/* Responsive sidebar: full-width on mobile, fixed sidebar on desktop */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className={cn(
            "flex w-full flex-col gap-0 p-0",
            "sm:max-w-md md:max-w-lg lg:max-w-xl",
          )}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border bg-sidebar/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BotIcon className="size-4" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold leading-tight text-foreground">
                  Assistant
                </h2>
                <p className="text-xs leading-tight text-muted-foreground">
                  How can I help you today?
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close Assistant"
              className="size-8 shrink-0 rounded-md text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </Button>
          </header>

          {/* Thread content */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <Thread />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
