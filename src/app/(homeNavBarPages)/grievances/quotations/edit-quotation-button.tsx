"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AddEditQuotationDialog from "@/app/(homeNavBarPages)/grievances/quotations/add-edit-quotation-dialog";
import { Quotations } from ".prisma/client";

export default function EditQuotationButton({
  quotationToEdit,
}: {
  quotationToEdit: Quotations;
}) {
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setShowAddEditDialog(true)}>
        <Pencil />
        Edit Quote
      </Button>
      <AddEditQuotationDialog
        open={showAddEditDialog}
        setOpen={setShowAddEditDialog}
        quotationToEdit={quotationToEdit}
      />
    </>
  );
}
