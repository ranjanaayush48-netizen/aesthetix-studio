# Security Architecture - Aesthetix Studio

## 1. Authentication Architecture
- **Provider**: Supabase Auth.
- **Method**: Email/Password or OAuth (configured via Supabase dashboard).
- **Session Management**: Handled securely by the Supabase SDK using local storage/cookies with proper security headers.
- **Admin Entry**: Protected routes `/admin/*` requiring an authenticated session and an `admin` role.

## 2. Authorization & Database Security (RLS)
Security is enforced at the database level using PostgreSQL **Row Level Security (RLS)**.

### Profiles
- **Select**: Publicly readable (limited fields).
- **Update**: Restricted to the owner (auth.uid() = id).

### Projects
- **Select**: Publicly readable (all users).
- **All other**: Restricted to users with `role = 'admin'` in their profile.

### Leads (Private Inquiries)
- **Insert**: Publicly allowable (for potential clients).
- **Select/Update/Delete**: Strictly restricted to `admin` role. Public users can NEVER read other leads.

### Reviews (Moderated Feedback)
- **Insert**: Publicly allowable. Initial status is always `pending`.
- **Select**: Only reviews with `status = 'published'` are visible to the public.
- **Update/Delete**: Restricted to `admin` role for moderation.

## 3. Secret Management
- **VITE_SUPABASE_URL**: Public (Safe for client).
- **VITE_SUPABASE_PUBLISHABLE_KEY**: Public (Safe for client, restricted by RLS).
- **SUPABASE_SERVICE_ROLE_KEY**: **NEVER** expose in the frontend. This key bypasses RLS and must only be used in secure server environments or Supabase Edge Functions.

## 4. Environment Variables
Configuration is handled via `.env` files.
- `.env.example` provides the template.
- Production variables must be set in the deployment platform (e.g., Vercel/Cloud Run).

## 5. Form Validation & Sanitization
- **Frontend**: Zod-based validation ensures data integrity before submission.
- **Backend**: Supabase/PostgreSQL types and constraints (e.g., CHECK constraints on ratings and status) prevent invalid data from persisting.
- **XSS Prevention**: React automatically escapes content. `dangerouslySetInnerHTML` is banned unless specifically audited.

## 6. Lead Privacy
Leads contain PII (Personally Identifiable Information). They are stored in a private table with zero public read access. Admin access is audited via Supabase logs.

## 7. Review Moderation Workflow
1. Client submits review (`status = 'pending'`).
2. Admin reviews submission in the dashboard.
3. Admin updates status to `'published'` (visible to public) or `'removed'`.
4. This prevent spam or inappropriate content from appearing on the site.
