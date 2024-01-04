"use client";
import * as React from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const AutoScrollDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      console.log("Scrolling...");
      console.log("scrollRef.current.scrollTop:", scrollRef.current.scrollTop);
      console.log(
        "scrollRef.current.scrollHeight:",
        scrollRef.current.scrollHeight,
      );

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [props.children]); // Add props.children to the dependency array

  return <div ref={scrollRef} className={cn(className, "h-dvh")} {...props} />;
});

AutoScrollDiv.displayName = "AutoScrollDiv";

export { AutoScrollDiv };
