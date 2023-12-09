import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export default function PetitionGrievanceButtons() {
    return <div
        className='flex flex-col md:flex-row gap-4  bg-red-200 bg-opacity-50 dark:bg-opacity-10 justify-center items-center p-4 rounded xl:rounded-full'>

        <p className='max-w-prose'>
            {`Join us in the fight for what is right. Sign the petition, share your voice, and stand with us as we declare: "No Akii Bua, No Votes, No AFCON in Uganda."`}

        </p>

        <div className='flex flex-wrap gap-4 justify-center py-3'>
            <Button className='max-w-prose ' variant='default' asChild>
                <Link href='/grievances'>
                    POST A GRIEVANCE
                    <ArrowRight/>
                </Link>
            </Button>
            <Button className='max-w-prose' variant='destructive' asChild>
                <Link href='/petition'>
                    SIGN THE PETITION
                    <ArrowRight/>
                </Link>
            </Button>
        </div>
    </div>

}