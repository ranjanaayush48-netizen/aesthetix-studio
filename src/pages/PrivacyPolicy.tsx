import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

// DPDP Act 2023 and DPDP Rules 2025 have phased commencement dates. Re-review this implementation before 13 May 2027 and whenever MeitY issues amendments, notifications, rules, or guidance.

export function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-brand-offwhite pt-32 pb-24 px-6 select-text">
      <div className="container-wide max-w-4xl">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 hover:text-brand-olive transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="mb-14 pb-8 border-b border-brand-beige">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
              LEGAL & PRIVACY COMPLIANCE
            </span>
            <div className="h-[1px] w-8 bg-brand-beige" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 tracking-tight mb-4">
            Privacy Policy
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-500">
            <span>Effective Date: 27 September 2026</span>
            <span>•</span>
            <span>Last Updated: 27 September 2026</span>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-brand-beige/30 border border-brand-beige text-xs text-neutral-700 leading-relaxed flex items-start gap-3">
            <AlertCircle size={18} className="text-brand-olive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Statutory Statement & Notice</p>
              <p>
                This Privacy Policy describes how Aesthetix Studio collects, uses, stores, protects,
                and otherwise processes personal data in connection with this website and its services,
                and is intended to reflect applicable Indian data protection and privacy requirements,
                including the Digital Personal Data Protection Act, 2023 and the Digital Personal Data
                Protection Rules, 2025 (to the extent their relevant provisions have commenced), the
                Information Technology Act, 2000, and related rules. Nothing in this Privacy Policy
                limits any rights available to individuals under applicable law.
              </p>
            </div>
          </div>
        </header>

        {/* Policy Body */}
        <article className="space-y-12 text-sm text-neutral-700 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              1. Introduction
            </h2>
            <p>
              Aesthetix Studio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is the brand and trading
              name under which Ayush Ranjan, an independent freelancer based in India,
              delivers website design, front-end engineering, and bespoke web application development services.
              This Privacy Policy explains how personal data is collected, processed, and protected through
              our public website, project enquiry forms, client review submissions, and related digital interactions.
            </p>
            <p>
              In this context, &quot;personal data&quot; refers to data about an identifiable individual.
              This policy explains what information is collected, the specific purposes for which it is
              processed, how it is retained, the technical controls implemented, and the statutory rights
              available to data principals under applicable Indian law.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              2. Data Fiduciary / Controller Details
            </h2>
            <p>
              Under applicable Indian privacy frameworks, Aesthetix Studio (operated by Ayush Ranjan as an
              independent freelancer) operates as the Data Fiduciary in respect of personal data submitted
              through this website.
            </p>
            <div className="p-6 rounded-2xl bg-brand-offwhite border border-brand-beige space-y-2 font-mono text-xs">
              <div className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold">
                Identity & Contact Details
              </div>
              <div><strong className="text-neutral-900">Brand / Trading Name:</strong> Aesthetix Studio</div>
              <div><strong className="text-neutral-900">Operated by:</strong> Ayush Ranjan</div>
              <div><strong className="text-neutral-900">Status:</strong> Independent Freelancer</div>
              <div><strong className="text-neutral-900">Business Location:</strong> India</div>
              <div>
                <strong className="text-neutral-900">Privacy & Grievance Contact:</strong>{' '}
                <a href="mailto:ayushranjan212614@gmail.com" className="text-brand-olive underline hover:opacity-80">
                  ayushranjan212614@gmail.com
                </a>
              </div>
              <div>
                <strong className="text-neutral-900">General Contact:</strong>{' '}
                <a href="mailto:ayushranjan212614@gmail.com" className="text-brand-olive underline hover:opacity-80">
                  ayushranjan212614@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              3. Personal Data We Collect
            </h2>
            <p>
              We adhere to the principle of data minimisation and process only information necessary
              to evaluate project enquiries, communicate with prospective clients, moderate and display
              authorized client testimonials, and administer the website:
            </p>

            <div className="space-y-4 pl-4 border-l-2 border-brand-beige">
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">A. Project Enquiry Data</h3>
                <p className="text-xs text-neutral-600 mb-2">
                  Collected when you complete and submit our project questionnaire at{' '}
                  <code className="px-1.5 py-0.5 rounded bg-brand-beige/50 font-mono">/start-project</code>:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                  <li>Full Name</li>
                  <li>Business / Brand Name</li>
                  <li>Email Address</li>
                  <li>WhatsApp / Contact Phone Number</li>
                  <li>Requested Service Category (e.g., Business Website, E-commerce, SaaS, Landing Page, Redesign, Other)</li>
                  <li>Brief Business Description</li>
                  <li>Existing Website Status (Boolean) & Current Website URL (if supplied)</li>
                  <li>Selected Budget Range and Estimated Delivery Timeline</li>
                  <li>Project Description & Scope Requirements</li>
                  <li>Additional Notes (Optional free-text field)</li>
                  <li>Administrative metadata: Submission Timestamp, Internal Status (NEW, CONTACTED, DISCUSSION, QUOTED, WON, LOST)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">B. Client Testimonial / Review Data</h3>
                <p className="text-xs text-neutral-600 mb-2">
                  Collected when a client submits feedback through our public review modal:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                  <li>Full Name</li>
                  <li>Business / Brand Name</li>
                  <li>Email Address (retained for verification and administrative moderation)</li>
                  <li>Project / Service Delivered Reference</li>
                  <li>Numerical Rating (1 to 5)</li>
                  <li>Review Testimonial Message</li>
                  <li>Moderation Status (pending, published, removed) and Submission Timestamp</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">C. Administrative Account Data</h3>
                <p className="text-xs text-neutral-600 mb-2">
                  Collected solely for authenticated studio operators accessing administrative dashboards:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                  <li>Administrator Email Address</li>
                  <li>Cryptographic Unique User Identifier (Supabase auth.uid)</li>
                  <li>Internal Authorization Role (&quot;admin&quot;)</li>
                  <li>Account Creation and Update Timestamps</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">D. Technical & Routing Information</h3>
                <p className="text-xs text-neutral-600">
                  Standard network request headers (such as IP address, browser user-agent, and requested URL) are
                  processed ephemerally in transit by hosting infrastructure and content delivery networks for routing
                  web traffic, maintaining network reliability, and mitigating denial-of-service attempts. We do not
                  deploy user fingerprinting tools or behavioral advertising trackers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              4. Specified Purposes for Processing
            </h2>
            <p>
              Personal data is processed strictly for defined, legitimate purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Project Enquiries:</strong> Evaluating project requirements, preparing scope assessments and quotes,
                communicating regarding requested services, scheduling discussions, and maintaining enquiry records.
              </li>
              <li>
                <strong>Client Reviews:</strong> Receiving client feedback, verifying submissions, moderating inappropriate
                or unauthorized entries, and displaying approved testimonials on the website.
              </li>
              <li>
                <strong>Studio Administration:</strong> Managing administrative authentication, enforcing role-based access
                controls, protecting administrative interfaces, and maintaining system reliability.
              </li>
              <li>
                <strong>Legal & Statutory Compliance:</strong> Maintaining business records and addressing lawful obligations
                under applicable Indian law.
              </li>
            </ul>
          </section>

          {/* Section 5 & 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              5. Data Minimisation & Sensitive Personal Data Exclusion
            </h2>
            <p>
              We seek to collect only information reasonably necessary for the stated purposes.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              <strong>Notice Regarding Sensitive Personal Information:</strong> Our project enquiry forms and review submission
              interfaces are not intended to collect passwords, financial account credentials, payment card PINs, government-issued
              identity documents (such as Aadhaar or PAN), health information, biometric data, or other sensitive personal data.
              Users should not submit such information through general web enquiry forms.
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              7. Legal Grounds for Processing & Consent Withdrawal
            </h2>
            <p>
              Depending on the context, personal data is processed on lawful grounds available under applicable law, including
              your voluntary and informed consent indicated when checking the required Privacy Policy acknowledgement prior to
              submitting an enquiry or review, as well as where processing is necessary to take preliminary steps at your request
              prior to entering into a contract, communicate with you regarding requested services, or fulfill legitimate business
              and compliance obligations.
            </p>
            <p>
              Where processing is based on consent, you may withdraw your consent at any time by contacting our Privacy Contact /
              Grievance Contact at{' '}
              <a href="mailto:ayushranjan212614@gmail.com" className="font-mono font-bold text-neutral-900 underline hover:text-brand-olive">ayushranjan212614@gmail.com</a>. Withdrawal does not
              affect the lawfulness of processing carried out prior to withdrawal. Upon receipt of a verified request, we will cease
              processing your data and delete or anonymize your records, except where retention is required by applicable law, ongoing
              contractual commitments, or dispute resolution.
            </p>
          </section>

          {/* Section 8 & 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              8. Third-Party Service Providers & Cross-Border Processing
            </h2>
            <p>
              We do not sell, rent, or trade personal data to third parties for marketing purposes. Personal data is processed
              through reputable infrastructure service providers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Database & Authentication:</strong> Managed through Supabase Inc. Our database instance is provisioned in
                the <strong>Singapore region</strong> (AWS ap-southeast-1). Personal data stored in our database is therefore
                processed outside India, governed by appropriate technical and organizational security measures provided by our
                infrastructure providers and configured within the application.
              </li>
              <li>
                <strong>Application Hosting & CDN:</strong> Provided by cloud hosting infrastructure to serve frontend assets and
                secure data in transit using TLS/HTTPS encryption.
              </li>
            </ul>
          </section>

          {/* Section 10 & 11 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              10. Data Retention & Deletion Practice
            </h2>
            <p>
              Personal data is retained for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy,
              evaluate and respond to project requests, maintain business and communication records, resolve disputes, and comply with
              applicable legal or accounting obligations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Project Enquiries (Leads):</strong> Retained in our database to evaluate project requirements, communicate
                with prospective clients, and reference past project discussions for legitimate business operations. Records are reviewed
                periodically and deleted or anonymized when no longer required for business or legal purposes.
              </li>
              <li>
                <strong>Published Testimonials:</strong> Displayed on the public website until removed upon client request or when the
                studio updates its portfolio showcase.
              </li>
              <li>
                <strong>Pending / Moderated Reviews:</strong> Retained in the administrative database for review verification and moderation.
              </li>
              <li>
                <strong>Commercial Contracts & Financial Records:</strong> For completed client projects, formal invoices and agreements
                are retained in accordance with applicable Indian accounting and taxation requirements.
              </li>
            </ul>
            <p className="text-xs pt-1">
              You may submit a deletion request at any time by contacting{' '}
              <a href="mailto:ayushranjan212614@gmail.com" className="font-mono font-bold text-neutral-900 underline hover:text-brand-olive">ayushranjan212614@gmail.com</a>. Requests will be honored
              subject to identity verification, applicable law, and lawful retention exceptions.
            </p>
          </section>

          {/* Section 12 & 13 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              12. Data Principal Rights & Grievance Redressal
            </h2>
            <p>
              Subject to applicable law, identity verification, and lawful retention requirements, individuals whose personal data is
              processed may exercise the following rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-brand-beige bg-brand-offwhite">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-1">Access to Information</h4>
                <p className="text-xs text-neutral-600">Request confirmation of processing and obtain a summary of personal data held about you.</p>
              </div>
              <div className="p-4 rounded-xl border border-brand-beige bg-brand-offwhite">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-1">Correction & Updating</h4>
                <p className="text-xs text-neutral-600">Request correction of inaccurate personal data or completion of incomplete information.</p>
              </div>
              <div className="p-4 rounded-xl border border-brand-beige bg-brand-offwhite">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-1">Erasure</h4>
                <p className="text-xs text-neutral-600">Request deletion of personal data where continued retention is no longer necessary or permitted by law.</p>
              </div>
              <div className="p-4 rounded-xl border border-brand-beige bg-brand-offwhite">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-1">Grievance Redressal</h4>
                <p className="text-xs text-neutral-600">Submit grievances regarding personal data processing directly to our designated contact.</p>
              </div>
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-brand-beige/20 border border-brand-beige space-y-2">
              <h3 className="font-bold text-sm text-neutral-900">Grievance Redressal Mechanism</h3>
              <p className="text-xs text-neutral-700">
                To submit a privacy inquiry, exercise a statutory right, or raise a grievance, please write to our designated contact:
              </p>
              <div className="font-mono text-xs text-neutral-800 space-y-0.5 pt-1">
                <div><strong>Attention:</strong> Privacy & Grievance Contact</div>
                <div><strong>Operated by:</strong> Ayush Ranjan (Independent Freelancer)</div>
                <div><strong>Email:</strong> <a href="mailto:ayushranjan212614@gmail.com" className="underline hover:text-brand-olive">ayushranjan212614@gmail.com</a></div>
                <div><strong>Business Location:</strong> India</div>
              </div>
              <p className="text-xs text-neutral-600 pt-1">
                Please provide sufficient information to enable us to identify your records and reasonably verify your identity.
                We will acknowledge your communication within 48 business hours and endeavor to resolve verified requests in accordance
                with applicable timelines under law. Individuals may also have the right to approach competent statutory authorities
                (such as the Data Protection Board of India) as applicable provisions of law become effective.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              14. Children's Information
            </h2>
            <p>
              This website is intended for individuals capable of entering into legally binding contracts under applicable law.
              We do not intentionally solicit or collect personal data from minors. If you believe a minor has submitted personal
              information through our website without appropriate authorization, please contact us so we can review and delete the records.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              15. Technical Security Practices
            </h2>
            <p>
              We implement reasonable security practices to protect personal data against unauthorized access, alteration, or disclosure:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Database Row Level Security (RLS):</strong> Database-level access controls are configured so that public users
                are not permitted to read project enquiry records.
              </li>
              <li>
                <strong>Role-Based Access Control:</strong> Access to the administrative panel requires authenticated credentials with
                verified administrative roles.
              </li>
              <li>
                <strong>Credential Management:</strong> Privileged administrative service-role keys are not included in public client-side
                bundles; client requests use restricted public anonymous credentials constrained by RLS.
              </li>
              <li>
                <strong>Input Validation:</strong> Form submissions are validated against defined schemas prior to database entry.
              </li>
              <li>
                <strong>Transport Encryption:</strong> Data transmitted between browsers and the application is encrypted via TLS/HTTPS.
              </li>
            </ul>
            <p className="text-xs pt-1">
              For additional details regarding our architecture, visit our{' '}
              <Link to="/security" className="text-brand-olive font-bold underline hover:opacity-80">
                Security & Data Protection
              </Link>{' '}
              overview.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              16. Cookies & Local Storage
            </h2>
            <p>
              We do not currently deploy third-party advertising cookies, social media tracking pixels, or cross-site tracking
              scripts. Browser local storage is used for essential administrative authentication functionality (<code className="px-1 py-0.5 rounded bg-brand-beige/50 font-mono text-xs">sb-*-auth-token</code>).
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              17. Third-Party Links
            </h2>
            <p>
              Our website may contain links to external websites, client projects, or third-party platforms. We are not responsible
              for the privacy practices or content of external sites and encourage you to review their independent privacy policies.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              18. Updates to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our operational practices or applicable law.
              Updated versions will be posted on this page with a revised Last Updated date.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-3 pt-6 border-t border-brand-beige">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              19. Contact Details
            </h2>
            <p>
              For inquiries regarding this Privacy Policy or our data handling practices, please contact:
            </p>
            <div className="font-mono text-xs text-neutral-700 space-y-1">
              <div><strong>Brand / Trading Name:</strong> Aesthetix Studio</div>
              <div><strong>Operated by:</strong> Ayush Ranjan (Independent Freelancer)</div>
              <div><strong>Business Location:</strong> India</div>
              <div><strong>Privacy & Grievance Contact:</strong> <a href="mailto:ayushranjan212614@gmail.com" className="underline hover:text-brand-olive">ayushranjan212614@gmail.com</a></div>
              <div><strong>General Contact:</strong> <a href="mailto:ayushranjan212614@gmail.com" className="underline hover:text-brand-olive">ayushranjan212614@gmail.com</a></div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
