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
