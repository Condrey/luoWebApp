import { fetchPetitions } from "@/lib/db/data/petition-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import EditPetitionButton from "@/app/(homeNavBarPages)/petition/(petitionComponents)/EditPetitionButton";
import { Petition } from ".prisma/client";

export default async function Page() {
  const petitions = await fetchPetitions();
  return (
    <>
      <span>{`List of petitions (${petitions.length})`}</span>
      <Table>
        <TableHeader>
          <TableHead>#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Show details</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {petitions.map((petition, index) => {
            const petition2: Petition = {
              createdAt: petition.createdAt,
              showDetails: petition.showDetails,
              userId: petition.userId,
              id: petition.id,
              district: petition.district,
            };
            return (
              <TableRow key={petition.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={petition.imageUrl} />
                    <AvatarFallback>
                      {petition.userName.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{petition.userName}</TableCell>
                <TableCell>{petition.district}</TableCell>
                <TableCell
                  className={cn(
                    petition.showDetails
                      ? "text-green-500 dark:text-green-300"
                      : "text-destructive",
                  )}
                >
                  {petition.showDetails ? "Show" : "Hide"}
                </TableCell>
                <TableCell>
                  <EditPetitionButton petition={petition2} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
