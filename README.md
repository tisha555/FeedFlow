# 📱 FeedFlow — Your Feed. Your Way.

<p align="center">
  <img src="./assets/logo.png" width="120" height="120" alt="FeedFlow Logo" style="border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <strong>Take back control of your Instagram algorithm. Define your preferences, activate background automation, and watch your feed align with your interests.</strong>
</p>

<p align="center">
  <a href="https://feedflow-rho.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel" alt="Vercel Live Demo" /></a>
  <img src="https://img.shields.io/badge/Expo-v56.0-blue?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Version" />
  <img src="https://img.shields.io/badge/React%20Native-0.85-61dafb?style=for-the-badge&logo=react" alt="React Native Version" />
</p>

---

## 🎯 Project Overview

Most Instagram users have limited control over the content that appears in their feeds. **FeedFlow** bridges this gap by acting on behalf of the user to actively "train" the recommendation algorithm. 

By setting up **Boosted Interests** and **Muted Topics**, FeedFlow runs a local background agent that automatically searches, likes, views, and bookmarks preferred topics, while instantly skipping and flagging unwanted noise.

---

## ✨ Features

- **🚀 Dual-Fidelity Layouts**: Responsive design that adapts to desktop screens (SaaS-style left sidebar) and mobile screens (native bottom navigation bar).
- **🎨 Curated Aesthetics**: Premium glassmorphic cards, glowing borders, custom HSL color systems, and a fully interactive **Dark Mode** toggle.
- **✨ Onboarding Experience**: Carousel slide-deck explaining secure session synchronization, preference setups, and algorithm training.
- **⚙️ Personalization Controls**:
  - **Boost Section**: Select categories (AI, Startups, Travel) and set weight weights (Low, Med, High, Max).
  - **Mute Section**: Toggle filters on noise (Drama, Politics, Ads) or add custom muted keywords (e.g. "shopping").
- **🔒 Secure Connections**: Simulated Instagram credential authentication mapping follower/post counts in an active session badge.
- **📈 Personalization Analytics**:
  - Sleek custom-drawn bar charts visualizing algorithm alignment scores over sync intervals.
  - Metrics tracking actions run, session state, and percentage growth.
- **Console Terminal & Simulator**:
  - **Live Command Terminal**: Real-time console logs (green for boosts, red for skips) displaying browser automation activities.
  - **Visual Feed Simulator**: A mock Instagram viewport demonstrating auto-likes (glowing heart triggers) and blurred filter blocks on muted hashtags.
- **⚙️ Automation Speed Rules**: Control automation intervals (`Safe` ~12s to mimic human behavior, `Balanced` ~6s, or `Turbo` ~3s) and toggles for Auto-Like, Auto-Save, and Sleep Mode scheduling.

---

## 🛠️ Technology Stack

- **Framework**: [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 56)
- **Web Support**: [React Native Web](https://necolas.github.io/react-native-web/) + [@expo/metro-runtime](https://www.npmjs.com/package/@expo/metro-runtime)
- **Icons**: [Lucide React Native](https://lucide.dev/)
- **Hosting**: [Vercel](https://vercel.com/) (Static deployment suite)

---

## 📂 Project Structure

```bash
FeedFlow/
├── assets/                    # App assets (Logos, default placeholders)
│   └── logo.png               # FeedFlow branding logo
├── src/
│   ├── components/            # Reusable UI widgets
│   │   ├── Header.js          # Navigation Brand Bar & theme switcher
│   │   └── CustomChart.js     # Analytics bar chart component
│   ├── context/
│   │   └── AppContext.js      # Global state provider & Automation Simulator loop
│   └── screens/               # Main Application screens
│       ├── OnboardingScreen.js # Slideshow explainer carousel
│       ├── PreferencesScreen.js# Tag weights and keyword filters
│       ├── ConnectionScreen.js # Mock credentials authentication
│       ├── DashboardScreen.js  # Stat metrics & Live terminal logs console
│       ├── FeedExplorerScreen.js# Mock feed with blur filters & auto-likes
│       └── SettingsScreen.js   # Automation speed controls & sleep cycles
├── App.js                     # Root entry point & layout router (Sidebar vs. Tab bar)
├── app.json                   # Expo configurations
├── package.json               # Dependencies & build scripts
└── README.md                  # Project documentation
```

---

## ⚡ Quick Start

### 1. Installation
Clone the repository and install the project dependencies:
```bash
git clone https://github.com/yourusername/FeedFlow.git
cd FeedFlow
npm install
```

### 2. Run Locally
Launch the application locally in Web preview mode:
```bash
npm run web
```
This opens the development bundle on **`http://localhost:8081`**.

### 3. Build & Export
Export the static, optimized production assets:
```bash
npx expo export --platform web
```
The compiled files will be located in the **`dist/`** directory.

### 4. Deploy
To deploy the compiled project to Vercel:
```bash
npx vercel ./dist --prod
```

---

## 🤖 The Personalization Engine Under the Hood

The background agent runs a periodic loop:
- **Boost action (65% chance)**: Searches tags matching your boosted preferences, simulates a post view, likes it, and occasionally bookmarks it.
- **Mute action (35% chance)**: Scans captions for blacklisted keywords. If found, it scrolls past the post within 0.6 seconds and registers a "Not Interested" signal, suppressing similar recommendations on Instagram.
- **Stealth Guard**: Employs human browsing speed intervals (🐢 Safe Speed ~12s) and stealth device UserAgents to make interactions look completely natural to bot-detection algorithms.

---

<p align="center">
  Made with ❤️ by the FeedFlow Team • Your Feed. Your Way.
</p>
