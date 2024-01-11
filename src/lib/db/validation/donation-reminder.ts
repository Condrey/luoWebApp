import { z } from "zod";

export const createDonationReminderSchema = z.object({
  userId: z.string().optional(),
});

export type CreateDonateReminderSchema = z.infer<
  typeof createDonationReminderSchema
>;
export type UpdateDonateReminderSchema = z.infer<
  typeof updateDonateReminderSchema
>;

export const updateDonateReminderSchema = createDonationReminderSchema.extend({
  id: z.string().min(1),
});

export const deleteDonateReminderSchema = z.object({
  id: z.string().min(1),
});
