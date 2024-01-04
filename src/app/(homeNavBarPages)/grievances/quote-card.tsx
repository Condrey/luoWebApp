import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { QuoteIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchQuotationsCount } from "@/lib/db/data/quotation-data";

export default async function QuoteCard() {
  const noOfQuotes = fetchQuotationsCount();
  return (
    <Card className="hover:shadow-2xl dark:bg-accent hover:bg-accent/50 cursor-pointer">
      <Link
        href="/grievances/quotations"
        className="inline-flex flex-col items-center  w-full h-full"
      >
        <CardHeader>
          <CardTitle className="flex gap-1">
            <QuoteIcon />
            Quotes
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <span>{noOfQuotes}</span>
        </CardContent>
      </Link>
    </Card>
  );
}

export function QuoteCardSkeleton() {
  return <Skeleton className="h-[250px] w-[250px] "></Skeleton>;
}
