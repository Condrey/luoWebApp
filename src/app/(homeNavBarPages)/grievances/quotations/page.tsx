import { InfoIcon, TextQuote } from "lucide-react";
import Breadcrumbs from "@/components/ui/bread-crumb";
import React, { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AddQuotationButton from "@/app/(homeNavBarPages)/grievances/quotations/add-quotation-button";
import QuotationList, {
  QuotationListSkeleton,
} from "@/app/(homeNavBarPages)/grievances/quotations/quotation-list";

export default function Quotations() {
  return (
    <div className="p-4 md:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Grievances", href: "/grievances" },
          { label: "Quotations", href: "/grievances/quotations", active: true },
        ]}
      />
      <div className="space-y-4">
        <div className="flex justify-between gap-2">
          <span className="flex gap-2 text-2xl">
            <TextQuote />
            Quotations
          </span>
          <AddQuotationButton />
        </div>
        <Alert>
          <InfoIcon />
          <AlertTitle>Description</AlertTitle>
          <AlertDescription>
            Text-based speeches from community leaders and activists. Engaging
            quotes highlighted for impact.
          </AlertDescription>
        </Alert>
        <div className="flex  justify-center w-full ">
          <Suspense fallback={<QuotationListSkeleton />}>
            <QuotationList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export const metadata = {
  title: `Grievances: Speeches from community leaders and activists`,
};
