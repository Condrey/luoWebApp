"use client";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="size-full h-dvh w-dvw flex flex-col items-center justify-center ">
      Something has occurred.
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
