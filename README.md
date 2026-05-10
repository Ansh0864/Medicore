# MediCore — B2B Healthcare Platform

**MediCore** is a comprehensive, HIPAA-compliant healthcare management system designed for clinicians, hospital administrators, and laboratory technicians. It provides a centralized portal for managing patient records, clinical analytics, appointments, and operational reports with a responsive design.

## ✨ Key Features

* **Clinical Dashboard**: A high-level overview of total patients, active admissions, critical alerts, and today's schedule.
* **Patient Records**: Advanced management system with grid and list views, detailed vitals monitoring, medical history, and condition tracking.
* **Clinical Analytics**: Interactive data visualization for admissions, revenue, and patient satisfaction scores using Recharts.
* **Appointment Management**: Full scheduling system to track, confirm, or cancel patient visits across departments.
* **Reports Portal**: Centralized repository for clinical, financial, and operational documents.
* **Professional Profiles**: Specialized profiles for medical staff to manage certifications and personal clinical statistics.
* **Theme Management**: Support for Light and Dark modes with a persistent theme store.
* **Authentication & Guards**: Secure login with role-based access and protected routing.

## 🚀 Tech Stack

* **Framework**: React (Vite)
* **Routing**: React Router 6
* **Icons**: Lucide React
* **Charts**: Recharts
* **State Management**: React Context API (Auth and Theme)
* **Styling**: Modern CSS with Variables and Media Queries

## 🛠️ Getting Started
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

## 🛡️ Security & PWA Features
Auth Guard: Protected routes ensure that only authenticated users can access sensitive clinical data.

PWA Support: Includes Service Worker registration for offline capabilities and notification handling.

Audit Trail: The system is designed to support HIPAA-compliant audit logs for data access.
