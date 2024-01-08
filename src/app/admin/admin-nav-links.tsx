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
} from "lucide-react";
import React from "react";

export default function AdminNavLinks() {
  const links: {
    name: string;
    href: string;
    icon: LucideIcon;
  }[] = [
    { name: "Users", href: "/admin/users", icon: User },
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
              className="flex hover:text-amber-500 dark:text-amber-300 gap-2 "
            >
              <Icon /> {link.name}
            </Link>
          </div>
        );
      })}
    </>
  );
}
