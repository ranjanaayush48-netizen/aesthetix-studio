import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export function TermsOfService() {
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
              SERVICE AGREEMENT
            </span>
            <div className="h-[1px] w-8 bg-brand-beige" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 tracking-tight mb-4">
            Terms of Service
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-500">
            <span>Effective Date: 27 September 2026</span>
            <span>•</span>
            <span>Last Updated: 27 September 2026</span>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-brand-beige/30 border border-brand-beige text-xs text-neutral-700 leading-relaxed flex items-start gap-3">
            <AlertCircle size={18} className="text-brand-olive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Contractual Basis</p>
              <p>
                These Terms of Service govern the engagement and delivery of web design, digital creative,
                and software development services provided by Aesthetix Studio. Individual projects are
                further detailed through written Statements of Work (SOW), formal project proposals, or signed
                agreements.
              </p>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <article className="space-y-12 text-sm text-neutral-700 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              1. Acceptance & About Aesthetix Studio
            </h2>
            <p>
              By using this website, submitting an enquiry, or engaging Aesthetix Studio for services, you
              acknowledge these Terms of Service (&quot;Terms&quot;). A specific project is governed by the applicable
              proposal, Statement of Work (SOW), or written agreement between the Client and Aesthetix Studio. If there is
              a conflict between these Terms and a signed project agreement, the signed project agreement will control to the
              extent of that conflict.
            </p>
            <p>
              Aesthetix Studio is the trading/brand name under which Ayush Ranjan, an independent freelancer,
              provides website design, web development, and related digital services. Our business details are
              set forth below:
            </p>
            <div className="p-5 rounded-2xl bg-brand-offwhite border border-brand-beige space-y-1.5 font-mono text-xs">
              <div><strong>Brand / Trading Name:</strong> Aesthetix Studio</div>
              <div><strong>Operated by:</strong> Ayush Ranjan</div>
              <div><strong>Status:</strong> Independent Freelancer</div>
              <div><strong>Business Location:</strong> India</div>
              <div><strong>Jurisdiction:</strong> Patna, Bihar, India</div>
              <div>
                <strong>Contact:</strong>{' '}
                <a href="mailto:ayushranjan212614@gmail.com" className="text-brand-olive underline hover:opacity-80">
                  ayushranjan212614@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              2. Services & Project Scope
            </h2>
            <p>
              Aesthetix Studio provides custom website design, responsive frontend engineering, web application
              development, digital brand identity implementation, and related technical services.
            </p>
            <p>
              Every commissioned engagement is bounded by a defined Project Scope. Any request, feature, layout,
              or integration not explicitly detailed in the agreed proposal or Statement of Work constitutes out-of-scope
              work and may be quoted as a separate addendum or change order at our prevailing commercial rates.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              3. Client Requirements, Quotes & Estimates
            </h2>
            <p>
              Timely project delivery depends upon prompt cooperation from the Client. The Client agrees to supply all
              necessary text, branding guidelines, high-resolution imagery, credential accesses, and product data
              required to execute the project in a timely manner.
            </p>
            <p>
              Any formal quote or proposal generated by Aesthetix Studio is valid for thirty (30) calendar days from the
              date of issuance, after which pricing and scheduling availability are subject to re-evaluation.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              4. Pricing & Payment
            </h2>
            <p>
              Published package rates (e.g., Starter ₹8,000, Business ₹12,000, Premium ₹20,000) serve as starting
              points for standard fixed-scope websites. Bespoke applications and enterprise projects are scoped individually.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Advance Payment:</strong> Work commences only upon receipt of the agreed initial advance deposit
                (typically 50% of the total project fee, unless specified otherwise in the written SOW).
              </li>
              <li>
                <strong>Final Payment & Handover:</strong> The remaining balance is payable upon project completion, prior to
                final code repository handover, domain DNS cutover, or production deployment credentials transfer.
              </li>
              <li>
                <strong>Currency & Taxes:</strong> Unless expressly stated otherwise, all prices are in Indian Rupees (INR)
                and exclude any statutory goods and services taxes (GST) that may apply under Indian law.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              5. Revisions & Client Delays
            </h2>
            <p>
              Each package or custom scope includes an agreed number of structured revision rounds (e.g., 1 round for Starter,
              2 rounds for Business, 3 rounds for Premium). Revisions must consist of consolidated, actionable feedback provided
              within the designated review window.
            </p>
            <p>
              Significant structural changes requested after design sign-off or after code implementation has commenced will be
              treated as change orders. If a project is stalled for more than twenty-one (21) consecutive business days due to
              unresponsive client feedback or missing materials, Aesthetix Studio reserves the right to invoice for completed work
              and reschedule the project queue.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              6. Third-Party Services
            </h2>
            <p>
              Our software solutions frequently interface with third-party vendors (such as domain registrars, Supabase, hosting
              providers, payment gateways, and external APIs). The Client is solely responsible for maintaining their own direct
              accounts, licenses, and billing relationships with these third-party platforms.
            </p>
            <p>
              Aesthetix Studio does not guarantee the uptime, service continuity, or feature availability of third-party platforms
              and is not liable for disruptions resulting from external vendor outages.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              7. Intellectual Property & Client Materials
            </h2>
            <p>
              <strong>Final Deliverables:</strong> Upon receipt of full and final payment, all bespoke design files, customized
              code, and final digital assets created specifically for the Client transfer to the Client.
            </p>
            <p>
              <strong>Studio Tools & Open-Source Libraries:</strong> Aesthetix Studio retains ownership of pre-existing software
              libraries, open-source frameworks, boilerplates, and proprietary developer utilities utilized during development.
              The Client is granted a non-exclusive, perpetual, worldwide license to utilize these components as part of their
              deployed website.
            </p>
            <p>
              <strong>Client Warranties:</strong> The Client warrants that all copy, logos, graphics, fonts, and media provided
              to the Studio do not infringe upon the intellectual property or privacy rights of any third party.
            </p>
            <p>
              <strong>Portfolio Showcase:</strong> Unless explicitly restricted by a signed Non-Disclosure Agreement (NDA),
              Aesthetix Studio reserves the right to display the completed work, project screenshots, and public URLs in our
              portfolio, case studies, and promotional materials.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              8. Confidentiality & Warranties
            </h2>
            <p>
              Both parties agree to treat proprietary business information, technical secrets, and unreleased marketing plans
              exchanged during the course of the project as confidential.
            </p>
            <p>
              Aesthetix Studio warrants that work will be performed in a professional manner conforming to recognized modern web
              standards. Except as expressly provided, all services and software are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis without warranties of any other kind, whether express or implied.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              9. Post-Launch Support & Termination
            </h2>
            <p>
              <strong>Post-Launch Warranty Period:</strong> Following final deployment and handover, we provide a standard
              fourteen (14) calendar day bug-fix window (or as defined in the SOW) to rectify defects directly attributable to our
              code delivery. Ongoing maintenance, version upgrades, and new feature additions require an active retainer or separate
              support agreement.
            </p>
            <p>
              <strong>Termination:</strong> Either party may terminate an engagement for material breach upon written notice if the
              breach remains uncured for fourteen (14) days. In the event of early termination, the Client shall compensate the Studio
              for all hours and milestones completed up to the effective termination date. Advance deposits are non-refundable once
              scoping or development has commenced.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              10. Limitation of Liability & Indemnification
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, Aesthetix Studio, operated by Ayush Ranjan,
              shall not be liable for any indirect, incidental, special, punitive, or consequential damages, including loss
              of profits, business interruption, or data loss arising from the use of or inability to use the delivered website.
            </p>
            <p>
              In all cases, our total aggregate liability for any claims arising under or related to an engagement shall not exceed
              the total fees actually paid by the Client to Aesthetix Studio under the applicable Statement of Work.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              11. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in
              accordance with the laws of the Republic of India.
            </p>
            <p>
              The parties agree to attempt in good faith to resolve any dispute through mutual consultations within thirty (30) days.
              If unresolved, the dispute shall be subject to the jurisdiction of the competent civil courts located in{' '}
              <span className="font-mono font-bold text-neutral-900">
                Patna, Bihar, India
              </span>.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6 border-t border-brand-beige">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              12. Modifications & Contact
            </h2>
            <p>
              We reserve the right to modify these Terms to reflect changes in our operational procedures or applicable law.
              Updated versions will be posted on this page with a revised Last Updated date.
            </p>
            <div className="font-mono text-xs text-neutral-700 space-y-1 pt-2">
              <div><strong>Brand / Trading Name:</strong> Aesthetix Studio</div>
              <div><strong>Operated by:</strong> Ayush Ranjan</div>
              <div><strong>Status:</strong> Independent Freelancer</div>
              <div><strong>Business Location:</strong> India</div>
              <div><strong>Jurisdiction:</strong> Patna, Bihar, India</div>
              <div>
                <strong>Contact:</strong>{' '}
                <a href="mailto:ayushranjan212614@gmail.com" className="underline hover:text-brand-olive">
                  ayushranjan212614@gmail.com
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
