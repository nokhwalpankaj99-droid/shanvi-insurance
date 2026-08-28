Shanvi Insurance Services — v14

PI / Inspection access is restricted to authorised Agent Portal sessions. Customer Portal no longer exposes PI submission.

# Shanvi Insurance Services – Final Portal Update

## Included in this version
- Agent and customer login with **Forgot User ID / Forgot Password** recovery page.
- Admin agent controls: Issue/Re-issue Certificate, Reject Certificate, Deactivate/Activate Account.
- Professional agent certificate layout with certificate number, agent code, verification mark and signature blocks.
- PI payment page with a dedicated **₹190 UPI QR** and Open UPI App button.
- QR is generated for the supplied UPI ID `9664029638-2@ybl` with ₹190 pre-filled.
- Existing supplied PhonePe QR is retained as fallback.
- Agent login is blocked when account is deactivated, certificate is rejected, or certificate has not been issued.
- All current browser-side records continue to use localStorage.

## Important production note
This GitHub Pages version is client-side. Real secure login, email OTP/password recovery, permanent document storage, server-side admin control and automatic email attachments require a backend/database and secure authentication. The recovery screen therefore performs local browser account recovery only; it does not send a real email OTP.

## Upload
Upload the complete extracted folder to the GitHub repository, keeping `assets/phonepe-qr-190.png` and `assets/phonepe-qr.jpg` inside the `assets` folder.


## Latest v15 changes
- Admin dashboard now shows agent/customer/PI/insurance/site-visit counts and recent visitor details.
- 10-minute inactivity session timer is visible; warning appears in the final 2 minutes.
- Cross-portal login links are blocked until the current portal is logged out.
- Customer portal cannot raise PI; PI is Agent Portal only.
- Agent certificate shows only Shanvi Insurance Services as authorised signatory.
- Uploaded third-party rate PDF is included under `assets/motor_third_party_insurance_rates.pdf` and its rates are shown on the public website.

### Important hosting note
This ZIP remains a frontend/static implementation. LocalStorage data (agents, customers, requests and site visits) is browser/device-specific. For real multi-device shared admin data, real email attachments, persistent uploads and secure user authentication, connect the included storage calls to a server/database/API.


### PI Request Access
- PI / Inspection request page is PUBLIC.
- Customer Login ki requirement nahi hai.
- Agent Login ki requirement nahi hai.
- User payment ₹190 karta hai, UTR aur required documents submit karta hai.
- Request admin data mein `shanviPIRequests` ke andar `source: Public PI Page` ke saath save hoti hai.


## v17 Home Page Upgrade
- PB Partners-inspired partner dashboard home layout with clearly separated navigation, product cards, quote area, insurer network, brokers and service sections.
- Supplied Raksha Bandhan poster added as `assets/raksha-bandhan-2026.png` and shown on Home Page.
- Admin poster upload now stores a browser-side poster preview in `shanviSiteSettings.posterData` (static hosting limitation still applies).
- Added detailed `about-us.html` with owner Pankaj Nokhwal and office/support information.
- Public PI page remains accessible without login; Agent Portal does not expose PI submission.
- PI page now uses the bundled `assets/phonepe-qr-190.png` QR for ₹190.

## Admin login
User ID: `shanvi112`
Password: `Shanvi@123`

## Static hosting limitation
The website remains a frontend/static implementation. LocalStorage accounts, visits, requests and browser-side poster data are not a shared server database. For production multi-device admin control, secure authentication, permanent uploads and automatic email attachments, a backend/API and database/storage must be connected.
