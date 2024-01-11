"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateDonateReminderSchema,
  createDonationReminderSchema,
} from "@/lib/db/validation/donation-reminder";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { createDonateReminder } from "@/lib/db/actions/donate-reminder-action";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function DonateReminderForm() {
  const router = useRouter();
  const form = useForm<CreateDonateReminderSchema>({
    resolver: zodResolver(createDonationReminderSchema),
    defaultValues: {
      userId: "",
    },
  });

  async function onSubmit(input: CreateDonateReminderSchema) {
    try {
      const response = await createDonateReminder(input);
      toast({
        title: response.title!,
        description: response.message,
        variant: response.type === "error" ? "destructive" : "default",
      });
    } catch (e) {
      toast({
        title: "An error occurred",
        description: "Please try again.!",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"userId"}
          control={form.control}
        />
        <LoadingButton loading={form.formState.isSubmitting} type={"submit"}>
          Remind me
        </LoadingButton>
      </form>
    </Form>
  );
}
