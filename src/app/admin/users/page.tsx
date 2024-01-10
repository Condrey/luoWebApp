import { clerkClient } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDateToLocal } from "@/lib/utils";

export default async function Page() {
  const users = await clerkClient.users.getUserList();
  return (
    <>
      <span>{`List of Users (${users.length.toLocaleString()})`}</span>
      <div className="flex flex-col gap-1 ">
        <Table className="p-3 border rounded-md  ">
          <TableHeader>
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Last sign in</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Banned</TableHead>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} className="odd:bg-accent">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar className="w-[25px] h-[25px]">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      {user.firstName?.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  {user.firstName || user.username || "Empty"}
                </TableCell>
                <TableCell>
                  {user.emailAddresses.map((emailAddress) => (
                    <div key={emailAddress.id} className="flex gap-1">
                      <span>{emailAddress.emailAddress}</span>
                      <span
                        className={cn(
                          emailAddress.verification?.status === "verified"
                            ? "text-green-500 dark:text-green-300"
                            : "text-destructive",
                        )}
                      >{`(${emailAddress.verification?.status})`}</span>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{formatDateToLocal(user.lastSignInAt!)}</TableCell>
                <TableCell>{formatDateToLocal(user.createdAt!)}</TableCell>
                <TableCell> {user.banned ? "Banned" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
