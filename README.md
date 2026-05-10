MediCore — B2B Healthcare Platform
MediCore is a comprehensive, HIPAA-compliant healthcare management system designed for clinicians, hospital administrators, and laboratory technicians. It provides a centralized portal for managing patient records, clinical analytics, appointments, and operational reports with a focus on ease of use and responsive design.

✨ Key Features
Clinical Dashboard: Real-time overview of total patients, active admissions, critical alerts, and daily schedules.

Patient Records: Advanced management system featuring grid and list views, detailed vitals monitoring, medical history, and condition tracking.

Analytics & Reporting: Interactive data visualization for admissions, revenue, and patient satisfaction using Recharts.

Appointment Management: Full scheduling system to track, confirm, or cancel patient visits across various departments.

Document Portal: Centralized repository for clinical, financial, and operational reports.

Professional Profiles: Specialized profiles for medical staff to manage certifications and personal clinical statistics.

Theme Management: Native support for Light and Dark modes with a persistent theme store.

Security & Compliance: Built with HIPAA compliance in mind, featuring role-based access control, session timeouts, and encrypted login paths.

🚀 Tech Stack
Framework: React

Routing: React Router 6

Icons: Lucide React

Charts: Recharts

State Management: React Context API (Auth and Theme Stores)

Styling: Modern CSS with CSS Variables for theming

📂 Project Structure
Plaintext
src/
├── assets/          # Static images and icons
├── components/      # Shared components (Layout, Stores, Mock Data)
│   ├── AuthStore.jsx    # Authentication logic and session handling
│   ├── ThemeStore.jsx   # Dark/Light mode management
│   ├── Layout.jsx       # Main navigation and sidebar structure
│   └── data.js          # Mock clinical and financial datasets
├── pages/           # Application routes
│   ├── Dashboard.jsx    # Operational KPI overview
│   ├── Patients.jsx     # Patient record management
│   ├── Analytics.jsx    # Performance charts and data export
│   ├── Appointments.jsx # Scheduling and visit tracking
│   └── ...              # Login, Profile, Reports, and Settings
├── App.jsx          # Route definitions and guards
└── main.jsx         # Entry point and Service Worker registration
🛠️ Getting Started
Clone the repository:

Bash
git clone https://github.com/your-username/medicore.git
cd medicore
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Login: Use the demo credentials provided on the login page (Email: doctor@medicore.health, Password: demo1234).

🛡️ Security & PWA Features
Auth Guard: Protected routes ensure that only authenticated users can access sensitive clinical data.

PWA Support: Includes Service Worker registration for offline capabilities and notification handling.

Audit Trail: The system is designed to support HIPAA-compliant audit logs for data access.
