SHANVI INSURANCE SERVICES — PROFESSIONAL REFRESH
================================================

CONTENTS
- index.html: refreshed responsive home page and enquiry form
- admin.html: admin dashboard for policy records, due reminders, photos, enquiries, notices and backup
- customer.html: vehicle-number lookup against saved policy records
- due-insurance.html: due/expired policy list and WhatsApp reminder drafts
- agent.html: agent registration enquiry form
- tax-gst.html: official Income Tax/GST/Udyam/FSSAI links and GST calculator
- style.css, app.js, admin.js: shared styles and functionality

ADMIN LOGIN
Old hard-coded demo credentials removed. First use: set a local Admin ID and a password of at least 12 characters. This is browser-local demo access only, not secure server-side authentication.

IMPORTANT LIMITATIONS (PLEASE READ)
1. This is a static website package. Admin data is stored in the current browser's localStorage. It does NOT sync across devices or between different visitors.
2. Admin login is client-side only and is NOT suitable for production security. Do not store sensitive documents or confidential customer information on shared/public devices.
3. Vehicle lookup only searches policy records manually saved by the administrator. It does not query an RTO or insurer database.
4. Quick enquiry estimates are not live insurance quotes. This package does not issue policies or connect to PBPartners/insurer APIs.
5. WhatsApp reminders open a prepared message; the user must press Send. The site does not send messages automatically.
6. Homepage notice changes in Admin are local-browser settings and do not redeploy the public website.
7. Photos are stored in local browser storage. Browser storage is limited; upload images under 1.5 MB each and export backups regularly.
8. For production use with multi-device syncing, secure admin authentication, shared policy records, public gallery updates and real agent/customer accounts, a secure backend (for example Supabase with properly configured database tables, row-level security and storage policies) must be set up and tested.

HOW TO TEST
1. Extract ZIP to a folder.
2. Open index.html in a modern browser (Chrome/Edge).
3. Open Admin Login, sign in with the credentials above.
4. Add a policy record with a vehicle number and expiry date.
5. Open Customer Portal and search that vehicle number.
6. Open Due Insurance and confirm it appears if expiry is within 30 days.
7. Test WhatsApp button (it opens WhatsApp; sending is manual).
8. Add a small photo, then delete it. Export a backup and test restoring it.
9. Test the GST calculator.

Note: This package is a refreshed front-end with working local workflows, not a verified live multi-user production CRM.