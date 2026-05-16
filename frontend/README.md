# ProofCam - Geo-Verified Evidence Platform

ProofCam is a secure field reporting and media verification platform. It allows users to capture media with cryptographic proof of location, time, and authenticity, ensuring an unbroken chain of custody for digital evidence.

## 🌟 Key Features

- **Secure Evidence Capture**: Inject GPS coordinates, high-precision timestamps, and generate SHA-256 hashes at the moment of capture.
- **Proof Score Algorithm**: Automatically evaluates the integrity and trustworthiness of the captured media based on sensor data and metadata.
- **GeoVault Storage**: A highly secure, private locker for storing evidence with granular, role-based access control and privacy settings.
- **Live Public Map**: A geo-intelligence dashboard for filtering and viewing verified incidents by location and severity.
- **Authority Reporting**: Generate and share immutable, cryptographic reports with authorities or insurance providers.
- **Mobile Simulator**: An integrated testing environment to view the responsive mobile-app experience directly from the desktop browser.
- **Cinematic UI**: A modern, interactive, and highly polished user interface with 3D scroll-reactive elements and glassmorphism.

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Custom CSS (Glassmorphism, 3D animations)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Typography**: Arial Black (Headings), Inter (Body), JetBrains Mono (Hashes/Logs)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed (v18+ recommended).

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd proofcam/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📱 Mobile App View
To test the responsive mobile design without leaving your desktop, click the **Mobile App** button in the top navigation bar. This opens the integrated Mobile Simulator.

## 🔒 Security & Privacy
ProofCam ensures that all media is hashed before it ever leaves the device. User privacy is maintained through strict sharing controls, meaning data is only visible to the entities you explicitly authorize.

---
*Truth is Geo-Verified.*
