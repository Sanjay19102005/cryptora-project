# TOR - Unveil

A professional cyber-forensic tool simulation UI for tracing TOR network activity and identifying probable origin IPs.

## Features

- **Login Page** - Dark theme with animated network background
- **Home Dashboard** - Real-time metrics, charts, and world map visualization
- **TOR Topology Simulation** - Interactive visualization of TOR circuits
- **Activity Correlation** - Upload and analyze PCAP/log files
- **Probable Origin IP** - Identify most likely origin IP addresses
- **Forensic Report** - Generate comprehensive forensic reports

## Tech Stack

- React 18
- Vite
- TailwindCSS
- React Router
- Recharts (for data visualization)
- Framer Motion (for animations)
- Lucide React (for icons)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Login**: Use any username and password to access the system (simulation only)
2. **Dashboard**: View real-time TOR network statistics and visualizations
3. **TOR Topology**: Click "Simulate Path" to generate and visualize TOR circuits
4. **Activity Correlation**: Upload a file (simulated) and analyze correlation results
5. **Probable Origin IP**: Run analysis to identify probable origin IP addresses
6. **Forensic Report**: View auto-generated comprehensive forensic reports

## Project Structure

```
tor-unveil/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── NetworkBackground.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TopologySimulation.jsx
│   │   ├── ActivityCorrelation.jsx
│   │   ├── ProbableOriginIP.jsx
│   │   └── ForensicReport.jsx
│   ├── utils/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Notes

- This is a **simulation-only** application with no backend
- All data is generated using mock data utilities
- Authentication is simulated (any credentials will work)
- File uploads are simulated (no actual files are processed)

## License

This project is for demonstration purposes only.

