# Shanvi Insurance Services – v17 Premium Home + Portal Update

## What changed
- Premium marketplace-style Home Page inspired by modern insurance partner dashboards (original Shanvi branding).
- Today’s Raksha Bandhan poster added as `assets/raksha-bandhan-2026.jpg`.
- Rotating headline for festival/commission messages.
- Clear Home navigation: Home, Quick Quote, PI/Inspection, TP Rates, Insurers, Agent Portal, Customer Login, Admin.
- Broker section for InsuranceDekho and Policybazaar.
- Insurance partner grid with insurer brand marks and names.
- About Us page expanded with Owner: **Pankaj Nokhwal** and Shanvi contact/address details.
- Public PI page remains open without Customer/Agent login.
- PI fee fixed at **₹190**.
- PhonePe QR shown from `assets/phonepe-qr-190.png` with JPG fallback.
- Public PI request now records submitted document files in browser storage (3 MB per file limit in static mode) and request metadata.
- Admin can verify PI payment, download submitted documents, and upload the finished PI PDF.
- Customer Portal can download the PI PDF when the request email matches the customer account, and can download policy PDFs.
- Agent Portal keeps insurance request + policy PDF workflow; PI submission is not inside Agent Portal.
- Agent registration requires email and own User ID/Password; admin certificate approval remains required before agent login.
- Agent code sequence starts from `SIS2022601`.
- Professional certificate includes Shanvi authorised signatory only.
- 10-minute inactivity session timer and warning remain active.
- Admin dashboard includes agent/customer/PI/insurance/site-visit counts.
- Third-party rate PDF remains available under `assets/motor_third_party_insurance_rates.pdf`.

## Admin login
- User ID: `shanvi112`
- Password: `Shanvi@123`

## Contact
- Support: 96640-29638
- Email: nokhwalpankaj99@gmail.com
- Address: 58 LNP Ridmalsar Road, Sri Ganganagar, Rajasthan - 335061
- Owner: Pankaj Nokhwal

## Important production note
This ZIP is still a **static/GitHub Pages frontend**. Browser `localStorage` is device/browser-specific. It cannot provide secure multi-device authentication, permanent server file storage, or true email attachments by itself.

The PI page opens the user's mail client with request details after submission, but browsers do not allow a static page to silently attach the uploaded RC/KYC/photos/video to an email. For real email attachments, permanent document storage, secure admin control and multi-device customer/agent accounts, connect the frontend storage functions to a backend/API/database.

## GitHub Pages upload
Upload the extracted contents of this ZIP to the repository root. Keep the complete `assets` folder.
