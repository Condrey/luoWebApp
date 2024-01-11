import HomeNavBar from "@/app/(homeComponents)/NavBar";
import { webPageName } from "@/lib/constants/Constants";
import DonateReminderForm from "@/app/(homeNavBarPages)/donate/donate-reminder-form";
import { fetchHasUserSentDonateReminder } from "@/lib/db/data/donate-reminder-data";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";

const DonatePage = async () => {
  const isReminderSent = await fetchHasUserSentDonateReminder();
  return (
    <div className="h-dvh">
      <HomeNavBar />
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <div className="max-w-prose flex flex-col gap-6">
          <span> Thank you for your interest to donate.</span>
          <span>
            This feature is not implemented yet. To be informed about the time
            when it is next available, click this button
          </span>

          {isReminderSent ? (
            <Badge>
              Reminder sent <CheckIcon />
            </Badge>
          ) : (
            <DonateReminderForm />
          )}
        </div>
      </div>
    </div>
  );
};
export default DonatePage;
export const metadata = {
  title: `${webPageName}: Donate to the team to further and give more zeal to upcoming developments. Be a part to fund this great cause`,
};
/**
 * Absolutely, creating a "Donate" section is crucial for those who want to contribute financially to the campaign. Here's how you can structure it:
 *
 * 1. **Donation Information:**
 *    - Clearly state the purpose of the donations (e.g., supporting the construction of Akii Bua Stadium, funding the campaign, etc.).
 *    - Provide a brief overview of where the funds will be allocated.
 *
 * 2. **Donation Options:**
 *    - Offer different donation tiers if applicable (e.g., Bronze, Silver, Gold levels).
 *    - Allow donors to enter a custom amount if they prefer.
 *
 * 3. **Payment Gateway:**
 *    - Integrate a secure payment gateway (e.g., PayPal, Stripe) for smooth transactions.
 *    - Mention that the transactions are secure to reassure donors.
 *
 * 4. **Progress Tracker:**
 *    - Display a visual representation of the fundraising goal and how much has been raised so far.
 *    - Regularly update this section to show transparency.
 *
 * 5. **Acknowledgments:**
 *    - Consider having a section to acknowledge and thank donors.
 *    - Include an option for donors to leave a message or comment.
 *
 * 6. **Tax Deductibility (if applicable):**
 *    - Provide information on whether donations are tax-deductible.
 *    - If so, include details on how donors can obtain a tax receipt.
 *
 * 7. **Social Sharing:**
 *    - Add social media sharing buttons so donors can encourage others to contribute.
 *
 * 8. **Contact Information:**
 *    - Include a contact form or email address for any donation-related inquiries.
 *    - Assure donors that their questions will be addressed promptly.
 *
 * Remember, transparency and trust are key when it comes to fundraising. Keep donors informed about how their contributions are making a difference, and express gratitude for their support. Ready to open the doors for generosity?
 */
