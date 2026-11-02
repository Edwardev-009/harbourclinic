import type { Metadata } from "next";
import { PageIntro } from "@/components/Sections";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How Harbour Medical Clinic collects, uses and protects your personal data.",
  path: "/privacy-policy",
  noindex: true, // TODO: switch to indexable once the real, reviewed policy replaces this placeholder
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy policy">
        <p>Draft summary. This page must be replaced with a full GDPR privacy policy reviewed by the practice before launch.</p>
      </PageIntro>
      {/*
        TODO (client / solicitor): replace with the real policy. It needs: data controller identity and contact,
        categories of data (booking + contact forms), legal basis, retention period, who receives the data
        (hosting and database processors, email provider), international transfers, data subject rights,
        right to complain to the Data Protection Commission (dataprotection.ie), cookie/analytics statement.
      */}
      <section className="container-site pb-24">
        <div className="measure space-y-6 text-lg leading-relaxed text-muted-foreground lg:ml-[33%]">
          <h2 className="text-3xl text-foreground">What we collect</h2>
          <p>When you book an appointment or contact us we collect your name, phone number and email address, and a short reason for your visit if you choose to give one.</p>
          <h2 className="text-3xl text-foreground">How we use it</h2>
          <p>To manage your appointment and reply to you.</p>
          <h2 className="text-3xl text-foreground">Your rights</h2>
          <p>You can ask to see, correct or delete your data by emailing {site.email}. You can also complain to the Data Protection Commission.</p>
        </div>
      </section>
    </>
  );
}
