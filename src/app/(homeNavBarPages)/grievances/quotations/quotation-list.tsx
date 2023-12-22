import {fetchQuotations} from "@/lib/db/data/quotation-data";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default async function QuotationList() {
    const quotations = await fetchQuotations()

    return (
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 '>
            {
                quotations.map((quotation) =>

                    <div key={quotation.id}
                         className='flex flex-col justify-center items-center aspect-video md:aspect-square gap-6 dark:bg-accent bg-fuchsia-300/30 p-3 rounded-md'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Avatar className='w-[100px] h-[100px]'>
                                <AvatarImage src={quotation.user.imageUrl}/>
                                <AvatarFallback
                                    className='uppercase'>{quotation.user.firstName?.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span>{`${quotation.user.firstName} ${quotation.user.lastName}`}</span>
                            <span>{quotation.occupation}</span>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <p>{quotation.content}</p>
                            <cite>{quotation.createdUpdatedAtTimestamp}</cite>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
