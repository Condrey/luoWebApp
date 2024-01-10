import { fetchQuotations } from "@/lib/db/data/quotation-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditQuotationButton from "@/app/(homeNavBarPages)/grievances/quotations/edit-quotation-button";

export default async function Page() {
  const quotes = await fetchQuotations();
  return (
    <>
      <span>{`List of quotes (${quotes.length.toLocaleString()})`}</span>
      <div className="flex flex-col gap-4">
        {quotes.map((quote) => (
          <div key={quote.id} className="p-3 border rounded-md max-w-2xl ">
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src={quote.imageUrl} />
                <AvatarFallback>
                  {quote.userName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col grow">
                <span className="text-sm">{quote.userName}</span>
                <span className="text-xs">
                  {quote.createdUpdatedAtTimestamp}
                </span>
              </div>
              <div>
                <EditQuotationButton quotationToEdit={quote} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className=" font-bold">{quote.title}</span>
              <span>{quote.content}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
