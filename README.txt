SHANVI INSURANCE - UPDATED STATIC WEBSITE

Included:
- index.html: polished insurance-company style homepage
- Vehicle number quote UI with Car/Bike + Comprehensive/Third Party/Standalone OD
- Major insurer directory with logo/favicons
- pi.html: PI / policy issuance document upload page
  RC Copy, KYC documents, customer/vehicle photos, optional short video, submission timestamp
- agent-login.html -> agent-dashboard.html: separate Agent Portal login/dashboard
- Fixed commission: Bike Rs.75 per policy; Car Rs.210 per policy
- Customer and PI requests are configured to email: nokhwalpankaj99@gmail.com

IMPORTANT EMAIL SETUP:
The static site uses FormSubmit for email delivery. On the first form submission, FormSubmit may ask the recipient to confirm/activate the email address. Complete that confirmation once.

PI FILE LIMIT:
The browser blocks PI submissions above 9.5 MB total to stay below the free FormSubmit 10 MB attachment limit. Keep the video short/compressed.

IMPORTANT QUOTE NOTE:
The vehicle-number interface is fixed and now gives a clear result state, but it does NOT invent live premiums. Actual live insurer premium/vehicle data requires an authorized insurer/aggregator API. PB Partners private authenticated endpoints must not be copied into frontend code.

AGENT LOGIN (PREVIEW ONLY):
Agent ID: agent01
Password: demo123

GitHub Pages is static hosting. This login is only a front-end preview and is NOT secure production authentication. For real authentication/database, move auth to a backend/Supabase/Firebase/etc.
