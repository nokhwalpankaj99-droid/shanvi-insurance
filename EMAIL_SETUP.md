# Shanvi Insurance Services — Email + PI Setup

## 1) Run the SQL
Open Supabase → SQL Editor and run `supabase_pi_setup.sql`.

This creates the PI request table and private `pi-documents` Storage bucket.

## 2) Deploy the two Edge Functions
Deploy:
- `notify-lead`
- `notify-pi`

The source files are in `supabase/functions/`.

## 3) Add Edge Function secrets
In Supabase → Edge Functions → Secrets, add:

- `RESEND_API_KEY` = your Resend API key
- `NOTIFY_TO_EMAIL` = `nokhwalpankaj99@gmail.com`
- `RESEND_FROM` = `Shanvi Website <onboarding@resend.dev>` for initial testing
- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase server secret/service role key (server-side only)

Never put `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` into the website files.

## 4) Deploy
If using Supabase CLI:

```bash
supabase link --project-ref dwfhqjoidrgjszlpyejr
supabase functions deploy notify-lead
supabase functions deploy notify-pi
```

## 5) Website behaviour
- Home/quote enquiries → Supabase + Gmail notification + WhatsApp handoff.
- Sub-Agent insurance requests → Supabase/local portal + Gmail notification + WhatsApp handoff.
- PI requests → private Storage upload + `pi_requests` record + Gmail notification containing secure 7-day document links + WhatsApp handoff.

## 6) PI documents included
- RC Front
- RC Back
- ID/KYC Front
- ID/KYC Back
- Multiple vehicle photos
- Vehicle video upload
- Optional video link

The Sub-Agent login no longer exposes a certificate PDF download.
