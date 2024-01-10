import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ServerMessage = {
  type: "error" | "success" | "warning";
  message: string;
  title?: string | undefined;
  errors?: string | undefined;
};

export const formatDateToLocal = (
  dateStr: Date | string | number,
  locale: string = "en-US",
): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const secondsPerMinute = 60;
  const secondsPerHour = 3600;
  const secondsPerDay = 86400;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  if (diffInSeconds < secondsPerMinute) {
    return "just now";
  } else if (diffInSeconds < secondsPerHour) {
    const minutes = Math.floor(diffInSeconds / secondsPerMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < secondsPerDay) {
    const hours = Math.floor(diffInSeconds / secondsPerHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2 * secondsPerDay) {
    return "yesterday";
  } else if (now.getFullYear() === date.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  }
};
