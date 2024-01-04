import { fetchQuotations } from "@/lib/db/data/quotation-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default async function QuotationList() {
  const quotations = await fetchQuotations();

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
      {quotations.map((quotation) => (
        <div
          key={quotation.id}
          className="flex flex-col justify-center items-center h-auto aspect-video md:aspect-square gap-6 dark:bg-accent bg-background/50 p-3 rounded-md "
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={quotation.imageUrl} />
              <AvatarFallback className="uppercase">
                {quotation.userName.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span>{quotation.userName}</span>
            <span>{quotation.occupation}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p>{quotation.content}</p>
            <cite>{quotation.createdUpdatedAtTimestamp}</cite>
          </div>
        </div>
      ))}
    </div>
  );
}

export function QuotationListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-[250px] w-[250px]" />
      ))}
    </div>
  );
}
