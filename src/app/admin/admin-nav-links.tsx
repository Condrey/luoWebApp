"use client";
import Link from "next/link";
import {
  Heading,
  ListVideo,
  LucideIcon,
  MessageCircle,
  Reply,
  ThumbsUp,
  User,
  Videotape,
  Vote,
} from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminNavLinks() {
  const pathName = usePathname();
  const links: {
    name: string;
    href: string;
    icon: LucideIcon;
  }[] = [
    { name: "Users", href: "/admin/users", icon: User },
    { name: "Petitions", href: "/admin/petitions", icon: Vote },
    { name: "Videos", href: "/admin/videos", icon: Videotape },
    { name: "Playlists", href: "/admin/playlists", icon: ListVideo },
    { name: "Quotes", href: "/admin/quotes", icon: MessageCircle },
    { name: "Topics", href: "/admin/topics", icon: Heading },
    { name: "Replies", href: "/admin/replies", icon: Reply },
    {
      name: "LikesAndDislikes",
      href: "/admin/likes-and-dislikes",
      icon: ThumbsUp,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <div key={link.name} className="block">
            <Link
              href={link.href}
              className={cn(
                "flex hover:text-amber-500 dark:hover:text-amber-300 gap-2 ",
                pathName === link.href &&
                  "text-amber-500 dark:text-amber-300 font-bold",
              )}
            >
              <Icon /> {link.name}
            </Link>
          </div>
        );
      })}
    </>
  );
}
