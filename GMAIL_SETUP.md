# Shanvi Insurance Services - Supabase + Gmail Enquiry Setup

The website now saves quote enquiries to the Supabase `leads` table and can send an email notification to your Gmail through a Supabase Edge Function.

## Already completed
- Supabase URL and publishable key added to `supabase-config.js`
- Website quote "Request" now saves the enquiry to Supabase
- Edge Function `supabase/functions/notify-lead/index.ts` is included
- Email recipient defaults to `nokhwalpankaj99@gmail.com`

## One-time setup in Supabase
1. Create a free account at Resend and create an API key.
2. In Supabase Dashboard open **Edge Functions** and create/deploy a function named `notify-lead`.
3. Use the code from `supabase/functions/notify-lead/index.ts`.
4. In the function's Secrets/Environment Variables add:
   - `RESEND_API_KEY` = your Resend API key
   - `NOTIFY_TO_EMAIL` = `nokhwalpankaj99@gmail.com`
5. Deploy the function.
6. Upload the website files to your existing hosting/GitHub Pages.

## Important
- Never put a Resend API key or Supabase secret key in frontend files.
- The Supabase publishable key in `supabase-config.js` is intended for browser use with RLS.
- The existing `leads` table and INSERT policy should already be present from the SQL setup you completed.

## What happens after setup
Customer -> Website -> Supabase `leads` -> `notify-lead` -> Gmail inbox.

The PI page continues to keep its existing local document workflow. Its email notification can also be migrated to this backend in the next step.
