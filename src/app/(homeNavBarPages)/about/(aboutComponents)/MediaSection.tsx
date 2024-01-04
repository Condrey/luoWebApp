import { Suspense } from "react";
import PetitionGrievanceCounter, {
  PetitionGrievanceCounterSkeleton,
} from "@/components/petitionGrievanceCounter";
import PetitionGrievanceButtons from "@/components/petitionGrievanceButtons";

export default function MediaSection() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-7xl gap-6 flex flex-col">
        <Suspense fallback={<PetitionGrievanceCounterSkeleton />}>
          <PetitionGrievanceCounter />
        </Suspense>
        <PetitionGrievanceButtons />
      </div>
    </div>
  );
}
