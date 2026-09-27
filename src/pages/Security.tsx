import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Database, UserCheck, Key, FileCheck } from 'lucide-react';

export function Security() {
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
              SYSTEM ARCHITECTURE & SAFEGUARDS
            </span>
            <div className="h-[1px] w-8 bg-brand-beige" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 tracking-tight mb-4">
            Security & Data Protection
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-500">
            <span>Architecture Overview: 2026.1</span>
            <span>•</span>
            <span>Last Updated: 27 September 2026</span>
          </div>

          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mt-6 max-w-2xl">
            A technical overview of the security controls, access barriers, and data protection practices
            implemented across the Aesthetix Studio web application.
          </p>
        </header>

        {/* Security Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-brand-beige bg-brand-offwhite shadow-sm space-y-2">
            <Shield className="text-brand-olive mb-2" size={24} />
            <h3 className="font-bold text-sm text-neutral-900 tracking-tight">Database-Level RLS</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Access rules enforced directly in PostgreSQL policies, complementing application-layer checks.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-beige bg-brand-offwhite shadow-sm space-y-2">
            <Lock className="text-brand-olive mb-2" size={24} />
            <h3 className="font-bold text-sm text-neutral-900 tracking-tight">Secret Isolation</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Administrative service-role keys are never packaged or exposed in client browser bundles.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-beige bg-brand-offwhite shadow-sm space-y-2">
            <UserCheck className="text-brand-olive mb-2" size={24} />
            <h3 className="font-bold text-sm text-neutral-900 tracking-tight">Restricted Lead Access</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Database controls are configured so public users are not permitted to read project enquiries.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <article className="space-y-12 text-sm text-neutral-700 leading-relaxed font-sans">
          {/* Section 1: Authentication & Authorization */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-olive font-bold text-xs uppercase tracking-widest">
              <Key size={16} />
              <span>Identity & Access Control</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              1. Authentication Architecture & Admin Protection
            </h2>
            <p>
              Administrative access to Aesthetix Studio internal tools is restricted to authorized studio operators.
              Authentication is managed via Supabase Auth using cryptographically signed JSON Web Tokens (JWT).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Route Protection:</strong> All <code className="px-1.5 py-0.5 rounded bg-brand-beige/50 font-mono">/admin/*</code> routes
                are guarded by an authenticated wrapper component that confirms active session state and verifies the
                user's <code className="font-mono">role = &apos;admin&apos;</code> in the database before granting access to dashboard views.
              </li>
              <li>
                <strong>Session Token Storage:</strong> Tokens are stored in browser local storage under scoped Supabase keys and
                transmitted via authenticated HTTPS Bearer headers.
              </li>
              <li>
                <strong>Defense in Depth:</strong> Frontend routing checks provide interface guidance; all actual data mutations
                and queries are governed by database Row Level Security policies.
              </li>
            </ul>
          </section>

          {/* Section 2: Database Security & RLS */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-olive font-bold text-xs uppercase tracking-widest">
              <Database size={16} />
              <span>Database Security</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              2. Row Level Security (RLS) & Table Isolation
            </h2>
            <p>
              Row Level Security (RLS) is enabled on application tables in our PostgreSQL database. Access rules are
              enforced at the database engine level, governing API operations performed using client credentials:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-brand-beige bg-brand-beige/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-neutral-900">Leads Table (Private Enquiries)</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                    Restricted Read
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  Public clients are permitted to <strong className="text-neutral-800">INSERT</strong> project enquiries.
                  Database-level access controls are configured so that public users are not permitted to read, update, or
                  delete project enquiry records submitted by other individuals.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-brand-beige bg-brand-beige/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-neutral-900">Reviews Table (Moderated Feedback)</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                    Moderated
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  New submissions default to <code className="font-mono">status = &apos;pending&apos;</code>. The public SELECT
                  query policy permits viewing only rows where <code className="font-mono">status = &apos;published&apos;</code>.
                  Reviews pending moderation or marked as removed are not displayed publicly.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-brand-beige bg-brand-beige/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-neutral-900">Projects Table (Portfolio)</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Public Read
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  Public visitors have read access to portfolio project records exposed through the public projects policy. Modifications, additions, and deletions are
                  restricted to authenticated studio administrators.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Secrets & Environment Management */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-olive font-bold text-xs uppercase tracking-widest">
              <Lock size={16} />
              <span>Secrets Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              3. Secret Management & Environment Isolation
            </h2>
            <p>
              We maintain strict separation between public configuration variables and privileged administrative credentials:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
              <li>
                <strong>Public Client Keys:</strong> The frontend application utilizes only <code className="font-mono">VITE_SUPABASE_URL</code> and
                the public anonymous key (<code className="font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</code>), which is intended for client communication
                and restricted by Row Level Security policies.
              </li>
              <li>
                <strong>Service-Role Master Keys Excluded:</strong> The administrative service-role key—which bypasses RLS—is strictly
                excluded from client-side code and is not bundled into frontend assets.
              </li>
              <li>
                <strong>Environment Controls:</strong> Production variables and database credentials are managed through secure deployment
                configuration channels.
              </li>
            </ul>
          </section>

          {/* Section 4: Input Validation & Application Security */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-olive font-bold text-xs uppercase tracking-widest">
              <FileCheck size={16} />
              <span>Input Hygiene</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              4. Validation & Injection Defense
            </h2>
            <p>
              To protect against malformed payloads and common web vulnerabilities, we implement multi-layer validation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
              <li><strong>Schema Validation:</strong> Client-submitted data is validated against defined Zod schemas prior to dispatch.</li>
              <li><strong>Database Constraints:</strong> PostgreSQL column constraints enforce required types, string boundaries, and valid value sets.</li>
              <li><strong>Output Escaping:</strong> React automatically escapes string values rendered in the virtual DOM, mitigating cross-site scripting (XSS).</li>
            </ul>
          </section>

          {/* Section 5: Infrastructure & Physical Hosting */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-olive font-bold text-xs uppercase tracking-widest">
              <Shield size={16} />
              <span>Infrastructure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              5. Cloud Infrastructure & Transport Encryption
            </h2>
            <p>
              Our database is provisioned in AWS data centers located in the <strong>Singapore region</strong> via Supabase Inc.
              Data in transit between web browsers and application endpoints is encrypted using modern TLS (HTTPS) protocols.
            </p>
          </section>

          {/* Section 6: Incident Response & Responsible Disclosure */}
          <section className="space-y-3 pt-6 border-t border-brand-beige">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
              6. Incident Response & Responsible Disclosure
            </h2>
            <p>
              We maintain procedures to monitor and investigate anomalous system activity. In the event of a confirmed personal
              data breach impacting individuals, we will initiate remedial actions and provide notifications in accordance with
              applicable provisions of Indian law.
            </p>
            <div className="p-5 rounded-2xl bg-brand-offwhite border border-brand-beige space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                Security Contact & Vulnerability Reporting
              </h3>
              <p className="text-xs text-neutral-600">
                If you believe you have discovered a security issue in our web application, please report it responsibly to:
              </p>
              <div className="font-mono text-xs text-neutral-800 space-y-1">
                <div><strong>Brand / Trading Name:</strong> Aesthetix Studio</div>
                <div><strong>Operated by:</strong> Ayush Ranjan (Independent Freelancer)</div>
                <div><strong>Business Location:</strong> India</div>
                <div>
                  <strong>Security & Privacy Contact:</strong>{' '}
                  <a href="mailto:ayushranjan212614@gmail.com" className="underline hover:text-brand-olive">
                    ayushranjan212614@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Please provide reproduction steps and allow reasonable time for investigation before public disclosure.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
