'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {webPageEmail} from "@/lib/constants/Constants";

export default function PrivacyPolicySection() {
    const [readPolicy, setReadPolicy] = useState<boolean>(false)

    return (
        <div className="container mx-auto mt-8  flex flex-col xl:flex-row gap-6 justify-center items-center">
            <div className='flex flex-col items-center w-full'>
                <Button onClick={() => setReadPolicy(!readPolicy)} variant={readPolicy ? 'destructive' : 'default'}
                        className='inline-flex'>
                    {!readPolicy ? 'View Petition Signing Privacy Policy' : 'Close Petition Signing Privacy Policy'}
                    <ChevronDownIcon className={cn(readPolicy ? 'rotate-180' : 'animate-bounce')}/>
                </Button>
            </div>


            {/* Privacy Policy Section */}
            <section
                className={cn(" p-8 rounded shadow-md max-w-prose bg-white dark:bg-white/5", !readPolicy && 'hidden')}>

                <h1 className="text-2xl font-bold mb-6">Privacy Policy for Petition Signatures</h1>

                {/*Section 1: Information We Collect*/}
                <section id='information-collection'>
                    <h2 className="text-lg font-semibold mb-4">1. Information We Collect:</h2>
                    <p className="mb-2">1.1 <strong>Personal Information:</strong> When you sign the petition, we may
                        collect personal information, including but not limited to your name, email address, and
                        location.
                    </p>
                    <p>1.2 <strong>Optional Information:</strong> You may choose to provide additional information, such
                        as
                        comments or messages of support.</p>
                </section>

                {/*Section 2: How We Use Your Information*/}
                <section id='how-we-use' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">2. How We Use Your Information:</h2>
                    <p className="mb-2">2.1 <strong>Petition Updates:</strong> We may use your email address to send you
                        updates about the petition, campaign progress, and related news.</p>
                    <p className="mb-2">2.2 <strong>Verification:</strong> Your name and location may be used for
                        verification purposes to ensure the authenticity of signatures.</p>
                    <p>2.3 <strong>Campaign Communication:</strong> With your consent, we may contact you for further
                        engagement, including information about events, merchandise, and other campaign-related
                        activities.
                    </p>
                </section>

                {/*Section 3: Information Sharing*/}
                <section id='information-sharing' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">3. Information Sharing:</h2>
                    <p className="mb-2">3.1 <strong>Public Display:</strong> By signing the petition, your name and, if
                        provided, location may be displayed publicly on our website as a show of support.</p>
                    <p>3.2 <strong>Aggregate Data:</strong> We may share aggregated and anonymized data for statistical
                        purposes or to demonstrate the collective impact of the campaign.</p>
                </section>

                {/*Section 4: Security Measures*/}
                <section id='security-measures' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">4. Security Measures:</h2>
                    <p className="mb-2">4.1 <strong>Data Security:</strong> We take reasonable measures to protect the
                        personal information collected during the petition signing process.</p>
                    <p>4.2 <strong>Third-Party Services:</strong> We use secure and reputable third-party services for
                        petition hosting and data storage.</p>
                </section>

                {/*Section 5: Your Choices*/}
                <section id='your-choices' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">5. Your Choices:</h2>
                    <p className="mb-2">5.1 <strong>Opt-Out:</strong> You have the option to opt-out of receiving
                        campaign-related communications at any time.</p>
                    <p>5.2 <strong>Update or Deletion:</strong> You may request to update or delete your personal
                        information by contacting us at <a
                            href={`mailto:${webPageEmail}`} className="text-blue-500">{webPageEmail}</a>.</p>
                </section>

                {/*Section 6: Changes to This Policy*/}
                <section id='changes-policy' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">6. Changes to This Policy:</h2>
                    <p className="mb-2">6.1 <strong>Updates:</strong> We may update this Privacy Policy to reflect
                        changes
                        in our practices. Any updates will be reflected on this page with the date of the last
                        modification.
                    </p>
                </section>

                {/*Section 7: Contact Us*/}
                <section id='contact-us' className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">7. Contact Us:</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a
                        href={`mailto:${webPageEmail}`} className="text-blue-500">{webPageEmail}</a>.</p>
                </section>

            </section>

        </div>
    );
}
