# Shanvi Insurance Services – v18 Commission Wallet + Payout Update

## Included
- Premium Shanvi home page with rotating commission/festival headline and Raksha Bandhan poster support.
- Public PI / Inspection request page (no customer login required), fixed fee ₹190.
- PhonePe QR asset for ₹190 and UPI deep link.
- Admin portal with agent/customer/PI/insurance/site-visit dashboard.
- Sub-Agent registration with own User ID + Password + mandatory email.
- Admin certificate issue/reject/deactivate workflow; login only after certificate issue.
- 10-minute inactivity session timer, warning and portal isolation.
- Sub-Agent commission wallet: earned/pending/paid view, own UPI ID, payout request.
- Admin commission payout queue: view agent/UPI/amount, Mark Paid, and payment-slip generator with Print/Save as PDF.
- Agent insurance request and policy PDF upload workflow; PI upload remains outside Agent Portal.
- Customer Portal policy/PI PDF delivery workflow.
- Updated Excel workbook: `Shanvi_Insurance_Agent_Portal_v18.xlsx` with payout/UPI fields.

## Admin login
User ID: `shanvi112`
Password: `Shanvi@123`

## Contact
Support: 96640-29638  
Email: nokhwalpankaj99@gmail.com  
Address: 58 LNP Ridmalsar Road, Sri Ganganagar, Rajasthan - 335061  
Owner: Pankaj Nokhwal

## Important
This is a static/GitHub Pages frontend. `localStorage` is browser/device-specific. Secure multi-device accounts, permanent document storage, real server-side email attachments, and server-side payment verification require a backend/database. The commission wallet and payout workflow in this version are frontend-local until a backend is connected.

## v19 final refresh
- Home About Us navigation restored
- Raksha Bandhan poster converted to a browser-safe JPEG
- PI ₹190 QR has cache-busting, fallback link and clear ₹190 label
- Admin Visit Details now has Clean Visit Details and visitor summary
- Admin can credit earned commission to a Sub-Agent wallet
- Agent payout cannot exceed available earned commission
- Corrected wallet accounting: Earned / Pending / Paid / Available
- Local insurer wordmark assets included so logos do not depend on external URLs


## Policy / PI document workflow
- Policy PDF upload is Admin-only. Admin links it to a Customer UID and optionally a Sub-Agent UID.
- Customer Portal can download its linked Policy PDF.
- Linked Sub-Agent can download the Policy PDF from Sub-Agent Portal.
- PI PDF remains Admin-uploaded after verification and is available to the linked Sub-Agent and Customer where the request is associated.
- Static hosting limitation remains: localStorage is browser/device specific; central multi-device document delivery requires a backend/database/object storage.


## v22 visual/link reliability patch
- Raksha Bandhan poster embedded directly in Home page.
- Insurance partner SVG logos embedded directly in Home page.
- ₹190 PI QR embedded directly in PI page.
- Strong portal isolation: Website/other portal links blocked until Logout.
- Agent certificate link remains available inside authenticated Sub-Agent Portal.

## Important
Payment requests stored in browser localStorage cannot travel from an Agent device to an Admin device. A central backend/database is required for real cross-device payment requests and document delivery.
