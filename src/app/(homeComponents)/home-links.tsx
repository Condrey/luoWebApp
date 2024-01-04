import React from "react";
import {
  LucideProps,
  MessageCircleIcon,
  TextQuoteIcon,
  VideotapeIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tabs: {
  title: string;
  icon: React.ForwardRefExoticComponent<LucideProps>;
  href: string;
  listDescription: string[];
}[] = [
  {
    title: "Chat",
    href: "/grievances/chat",
    icon: MessageCircleIcon,
    listDescription: [
      "A platform for visitors to share their thoughts and experiences.",
      " Moderation features to ensure respectful and constructive discussions.",
      "Reply option for community interaction.",
    ],
  },
  {
    title: "Video Gallery",
    href: "/grievances/video-gallery/playlist",
    icon: VideotapeIcon,
    listDescription: [
      " Categorized videos expressing local grievances.",
      " Brief descriptions for each video to provide context.",
      " Playlists for easy navigation.",
    ],
  },
  // {
  //     title: 'Voice Notes', href: '/grievances/voice-notes', icon: VoicemailIcon, listDescription: [
  //         'Audio recordings sharing personal stories and concerns.',
  //         'A play button for each voice note and a transcript for accessibility.'
  //     ]
  // },
  {
    title: "Quotations",
    href: "/grievances/quotations",
    icon: TextQuoteIcon,
    listDescription: [
      "Text-based speeches from community leaders and activists.",
      "Engaging quotes highlighted for impact.",
    ],
  },
  // {
  //   title: "Spotlight",
  //   href: "/grievances/spotlight",
  //   icon: LightbulbIcon,
  //   listDescription: [
  //     "Featured stories or interviews with individuals directly affected by the stadium decision.",
  //     "Humanize the cause by putting faces to the grievances.",
  //   ],
  // },
];

const GrievancesContent = (
  <div className="flex flex-col md:flex-row  gap-2 p-2 md:px-4">
    {tabs.map((tab) => {
      const TabIcon = tab.icon;
      return (
        <Link key={tab.title} href={tab.href}>
          <Card className=" xl:w-[250px] bg-transparent border-0 hover:bg-accent ">
            <CardHeader className="flex flex-row md:flex-col xl:flex-row items-center">
              <TabIcon className=" md:flex w-10" />
              <CardTitle className="text-sm xl:text-2xl">{tab.title}</CardTitle>
            </CardHeader>
            <CardContent className="hidden lg:block">
              <div>
                <ul className="list-image-star list-inside">
                  {tab.listDescription.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    })}
  </div>
);
export const homeLinks: {
  link: string;
  route: string;
  routeRef: string;
  content: React.JSX.Element | undefined;
}[] = [
  { link: "Home", route: "/", routeRef: "/home", content: undefined },
  { link: "About", route: "/about", routeRef: "/about", content: undefined },
  {
    link: "Petition",
    route: "/petition",
    routeRef: "/petition",
    content: undefined,
  },
  {
    link: "Grievances",
    route: "/grievances",
    routeRef: "/grievances",
    content: GrievancesContent,
  },
  // {
  //     link: "Merchandise",
  //     route: "/merchandise",
  //     routeRef: "/merchandise",
  //     content: undefined,
  // },
  // {link: "News", route: "/news", routeRef: "/news", content: undefined},
];
