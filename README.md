# Maruti Solutions — Business Platform

A complete, production-ready Next.js 15 business consultancy platform for **Maruti Solutions** by Arush Prakash.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: Resend
- **Deployment**: Netlify

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home
│   ├── about/                    # About page
│   ├── services/                 # Services page
│   ├── portfolio/                # Portfolio + case studies
│   ├── blog/                     # Blog listing + posts
│   ├── contact/                  # Contact form
│   ├── book/                     # Appointment booking
│   ├── submit/                   # Project submission
│   ├── admin/                    # Protected admin dashboard
│   │   ├── dashboard/            # Overview + stats
│   │   ├── leads/                # Lead management
│   │   ├── appointments/         # Appointment management
│   │   ├── projects/             # Project management
│   │   ├── blog/                 # Blog CMS
│   │   └── settings/             # Site settings
│   └── api/                      # API routes
│       ├── appointments/
│       ├── projects/
│       ├── contact/
│       ├── blog/
│       └── analytics/
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── sections/                 # Page sections
│   └── ui/                       # UI primitives
└── lib/
    ├── supabase.ts               # DB client
    ├── email.ts                  # Resend email templates
    ├── utils.ts                  # Utilities
    └── validations.ts            # Zod schemas
```

---

## Setup

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required variables:
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `RESEND_API_KEY` | Resend API key for emails |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |
| `NEXT_PUBLIC_ADMIN_PIN` | Password for admin dashboard (default: `maruti2024`) |
| `NEXT_PUBLIC_ADMIN_API_SECRET` | Secret for API admin endpoints |

### 3. Set up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** and run the contents of:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
3. Copy your project URL and keys to `.env.local`

### 4. Set up Resend

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key and add to `.env.local`
4. Update `FROM_EMAIL` in `src/lib/email.ts` to your verified domain

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Admin Dashboard

Access at `/admin/dashboard`

**Default password**: `maruti2024`

Change this via the `NEXT_PUBLIC_ADMIN_PIN` environment variable.

Modules:
- **Dashboard** — KPI overview and recent activity
- **Leads** — Contact form submissions with status management
- **Appointments** — Booking requests with confirm/cancel
- **Projects** — Project brief submissions with file attachments
- **Blog** — Create, edit, publish/unpublish blog posts
- **Settings** — Business info and notification preferences

---

## Netlify Deployment

### Deploy steps:

1. Push repo to GitHub
2. Connect to Netlify → **New site from Git**
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the **Netlify Next.js plugin** (auto-detected or install `@netlify/plugin-nextjs`)
6. Add all environment variables in **Site Settings → Environment Variables**

The `netlify.toml` is pre-configured.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, domains, process, founder, CTA |
| `/about` | About Maruti Solutions and Arush Prakash |
| `/services` | All 4 service areas with full detail |
| `/portfolio` | Case studies with filter + expand |
| `/blog` | Insights listing + individual posts |
| `/contact` | Contact form → leads table + email |
| `/book` | Appointment booking → appointments table + email |
| `/submit` | Project submission with file upload |
| `/admin/dashboard` | Protected admin overview |

---

## Email Notifications

All forms trigger two emails via Resend:
1. **Admin notification** → `Arushhh.work@gmail.com`
2. **Auto-response** → the person who submitted

---

## Color Palette

| Token | Hex |
|---|---|
| Primary Navy | `#041E42` |
| Accent Orange | `#FF7A00` |
| Background | `#030712` |
| White | `#FFFFFF` |
| Muted | `#9CA3AF` |
| Success | `#10B981` |

---

## Contact

**Arush Prakash** — Founder, Maruti Solutions  
📧 Arushhh.work@gmail.com  
🔗 [linkedin.com/in/arush-prakash-198418249](https://linkedin.com/in/arush-prakash-198418249)
