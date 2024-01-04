import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MessageCircleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTopicAndReplyNumber } from "@/lib/db/data/topic-data";

export default async function ChatCard() {
  const { numberOfTopics, numberOfComments } = await fetchTopicAndReplyNumber();
  return (
    <Card className="inline-flex dark:bg-accent hover:bg-accent/50 flex-col items-center hover:shadow-2xl cursor-pointer">
      <Link
        href="/grievances/chat"
        className="inline-flex flex-col items-center  w-full h-full"
      >
        <CardHeader>
          <CardTitle className="flex gap-1">
            <MessageCircleIcon />
            Chats
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 justify-center">
          <span>{numberOfTopics}</span>
          <span>{numberOfComments}</span>
        </CardContent>
      </Link>
    </Card>
  );
}

export function ChatCardSkeleton() {
  return <Skeleton className="h-[250px] w-[250px] "></Skeleton>;
}
