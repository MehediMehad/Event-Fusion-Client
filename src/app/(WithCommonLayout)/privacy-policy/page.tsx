export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Privacy Policy
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Last updated: May 9, 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome to Event Planner. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you about how we look after your personal data when you visit our
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">2. The Data We Collect About You</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Personal data, or personal information, means any information about an individual from which that person
                can be identified. It does not include data where the identity has been removed (anonymous data).
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped
                together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400">
                <li>Identity Data includes first name, last name, username or similar identifier.</li>
                <li>Contact Data includes email address and telephone numbers.</li>
                <li>Financial Data includes payment card details.</li>
                <li>
                  Transaction Data includes details about payments to and from you and other details of products and
                  services you have purchased from us.
                </li>
                <li>
                  Technical Data includes internet protocol (IP) address, your login data, browser type and version,
                  time zone setting and location, browser plug-in types and versions, operating system and platform, and
                  other technology on the devices you use to access this website.
                </li>
                <li>
                  Profile Data includes your username and password, purchases or orders made by you, your interests,
                  preferences, feedback and survey responses.
                </li>
                <li>Usage Data includes information about how you use our website, products and services.</li>
                <li>
                  Marketing and Communications Data includes your preferences in receiving marketing from us and our
                  third parties and your communication preferences.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">3. How We Use Your Personal Data</h2>
              <p className="text-gray-500 dark:text-gray-400">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal
                data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>
                  Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                  fundamental rights do not override those interests.
                </li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">4. Data Security</h2>
              <p className="text-gray-500 dark:text-gray-400">
                We have put in place appropriate security measures to prevent your personal data from being accidentally
                lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to
                your personal data to those employees, agents, contractors and other third parties who have a business
                need to know. They will only process your personal data on our instructions and they are subject to a
                duty of confidentiality.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">5. Data Retention</h2>
              <p className="text-gray-500 dark:text-gray-400">
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
                collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or
                reporting requirements. We may retain your personal data for a longer period in the event of a complaint
                or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">6. Your Legal Rights</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Under certain circumstances, you have rights under data protection laws in relation to your personal
                data. These include the right to: - Request access to your personal data - Request correction of your
                personal data - Request erasure of your personal data - Object to processing of your personal data -
                Request restriction of processing your personal data - Request transfer of your personal data - Right to
                withdraw consent If you wish to exercise any of these rights, please contact us using the details
                provided in this policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">7. Cookies</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Our website uses cookies to distinguish you from other users of our website. This helps us to provide
                you with a good experience when you browse our website and also allows us to improve our site. A cookie
                is a small file of letters and numbers that we store on your browser or the hard drive of your computer
                if you agree. Cookies contain information that is transferred to your computer&apos;s hard drive.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">8. Changes to the Privacy Policy</h2>
              <p className="text-gray-500 dark:text-gray-400">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                privacy policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
                You are advised to review this privacy policy periodically for any changes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">9. Contact Us</h2>
              <p className="text-gray-500 dark:text-gray-400">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-500 dark:text-gray-400">
                <p>Email: privacy@eventplanner.com</p>
                <p>
                  Postal address: 123 Event Street, Suite 100
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                You have the right to make a complaint at any time to the relevant data protection authority in your
                jurisdiction. However, we would appreciate the chance to deal with your concerns before you approach the
                authority, so please contact us in the first instance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
