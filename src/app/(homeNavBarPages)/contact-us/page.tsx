import HomeNavBar from "@/app/(homeComponents)/NavBar";
import { webPageEmail, webPageName } from "@/lib/constants/Constants";
import Link from "next/link";

const ContactUsPage = () => {
  return (
    <div className="h-dvh">
      <HomeNavBar />
      <div className="flex flex-col size-full items-center justify-center">
        <span className="max-w-prose flex gap-2">
          Contact us on
          <Link
            href={`mailto:${webPageEmail}`}
            className="text-sky-800 dark:text-sky-500"
          >
            {webPageEmail}
          </Link>
        </span>
      </div>
    </div>
  );
};
export default ContactUsPage;
export const metadata = {
  title: `${webPageName}: Contact us about the website through emails`,
};
/**
 * Certainly! Here's an example of how you could structure the "Contact Us" section:
 *
 * ### Contact Us:
 *
 * **For Inquiries and Collaboration:**
 *
 * - **Email:** [Your Email Address]
 * - **Phone:** [Your Contact Number]
 * - **Mailing Address:** [Your Physical Address, if applicable]
 *
 * **Social Media:**
 *
 * Connect with us on social media for updates and discussions:
 *
 * - **Facebook:** [Your Facebook Page Link]
 * - **Twitter:** [Your Twitter Handle]
 * - **Instagram:** [Your Instagram Handle]
 * - **LinkedIn:** [Your LinkedIn Profile/Company Page]
 *
 * **Stay Updated:**
 *
 * Subscribe to our newsletter for the latest news and updates.
 *
 * [Subscribe Now Button]
 *
 * ### Contact Form:
 *
 * For quick inquiries, please fill out the form below:
 *
 * [Name]
 * [Email]
 * [Subject]
 * [Message]
 * [Send Message Button]
 *
 * ### Office Hours:
 *
 * Monday - Friday: [Opening Time] - [Closing Time]
 *
 * Feel free to customize the details based on your actual contact information and social media profiles. Additionally, consider adding links to your social media icons for a visually appealing and user-friendly experience.
 */
