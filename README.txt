Shanvi Insurance Services - professional website + vehicle quote UI + agent portal

NEW:
- Vehicle number quick-quote section on homepage.
- Displays vehicle summary and insurer/premium option cards in demo mode.
- Agent Portal page with login, dashboard, policies, commission calculation and configurable commission rate.
- Demo login: agent01 / demo123 (preview only; replace with real authentication before production).

LIVE VEHICLE/INSURANCE DATA:
The front-end cannot legally or reliably derive an exact live premium from a registration number by itself.
For production, connect a verified RC/vehicle-data API and licensed insurer/aggregator quote APIs on a secure server.
The UI is ready for that integration. Do not put secret API keys in GitHub/client-side JavaScript.

Suggested integration flow:
1. Registration number -> secure backend -> RC/vehicle API.
2. Backend returns vehicle make/model/fuel/registration/insurance status.
3. Backend calls authorized insurer/aggregator quote APIs.
4. Return live insurer quotes and final premium to the browser.
5. Agent portal stores issued policies and commission records in a secure database.

The current vehicle cards are clearly marked indicative/demo so customers are not misled.
