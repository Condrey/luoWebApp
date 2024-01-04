import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchQuotationsByNumber } from "@/lib/db/data/quotation-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddQuotationButton from "@/app/(homeNavBarPages)/grievances/quotations/add-quotation-button";
import { currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CommentSection() {
  const comments = await fetchQuotationsByNumber(7);
  const user = await currentUser();
  return (
    <div className="w-full dark:bg-hero-pattern  bg-contain bg-repeat flex flex-col items-center">
      <div className="p-5 w-full flex flex-col items-center max-w-7xl">
        <div className=" w-auto p-5">
          <span className="text-center  text-5xl text-primary dark:text-secondary  font-black">
            GRIEVANCES
          </span>
        </div>

        <div className="grid max-w-prose lg:max-w-full  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {comments.map((comment) => (
            <div key={comment.id}>
              <Card className="w-auto">
                <CardHeader className="flex flex-col justify-center items-center px-2 break-words break-all ">
                  <Avatar className=" w-[150px] h-[150px] ring ring-amber-700 -outline-offset-4 ">
                    <AvatarImage src={comment.imageUrl} />
                    <AvatarFallback>
                      {comment.userName.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-2">
                    <span className="text-2xl">{comment.userName}</span>
                    <CardDescription>{comment.occupation}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center flex flex-col whitespace-pre-line gap-2">
                  <span className="text-2xl">{comment.title}</span>
                  <span className="whitespace-pre-line text-justify text-pretty">
                    {comment.content}
                  </span>
                  <span className="text-xs">
                    {comment.createdUpdatedAtTimestamp}
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
          <Card
            className={cn(
              "flex flex-col gap-4 items-center justify-center min-h-80",
            )}
          >
            <div className={cn(!user && "hidden")}>
              <AddQuotationButton />
            </div>
            <Link href="/grievances/quotations/" className={buttonVariants()}>
              View More
              <ArrowRightIcon />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function CommentSectionSkeleton() {
  return (
    <div className="w-full dark:bg-hero-pattern  bg-contain bg-repeat flex flex-col items-center">
      <div className="p-5 w-full flex flex-col items-center max-w-7xl">
        <div className=" w-auto p-5">
          <span className="text-center  text-5xl text-primary dark:text-secondary  font-black">
            GRIEVANCES
          </span>
        </div>

        <div className="grid max-w-prose lg:max-w-full  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  items-stretch">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index}>
              <Card className="w-[250px] h-auto grow">
                <CardHeader className="flex flex-col justify-center items-center px-2 break-words break-all ">
                  <Skeleton className=" w-[150px] h-[150px] ring ring-amber-700 -outline-offset-4 rounded-full" />
                  <div className="text-center">
                    <CardTitle>
                      <Skeleton className="text-2xl w-3/4 h-12" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="w-full h-4" />
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center flex flex-col whitespace-pre-line gap-2">
                  <Skeleton className="text-2xl h-20 w-full" />
                  <Skeleton className="text-2xl h-4 w-full" />
                  <Skeleton className="text-2xl h-3 w-full" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
