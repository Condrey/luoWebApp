import Link from "next/link";
import { QuoteIcon } from "lucide-react";
import { fetchRandomQuotation } from "@/lib/db/data/quotation-data";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PopularQuoteTag() {
  const { randomQuote } = await fetchRandomQuotation();
  const quotation = randomQuote;
  const userName = randomQuote.userName;
  return (
    <Link
      href={`/grievances/quotations/${quotation!.id}`}
      className="border bg-card dark:bg-accent hover:bg-accent/50 text-accent-foreground
                  max-w-prose  p-3 rounded-md  hover:shadow-2xl cursor-pointer"
    >
      <div className="float-left text-destructive dark:text-red-500 font-bold pr-1">
        <QuoteIcon />
        Quote
      </div>
      <p className="break-words text-clip whitespace-pre-line ">
        {quotation!.content}
      </p>
      <span className="text-xs">{`${quotation!.title}-${userName}`}</span>
    </Link>
  );
}

export function PopularQuoteTagSkeleton() {
  return <Skeleton className="h-[250px] w-[250px] "></Skeleton>;
}
