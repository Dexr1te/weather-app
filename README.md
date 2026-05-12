https://roadmap.sh/projects/weather-app

# Weather App 🌤️  

A clean and modern weather forecast application built with **React**, **TypeScript**, **React Query**, and **Zustand**.  
The app fetches real-time weather data and a 5-day forecast, visualizes it, and provides a smooth, responsive UI.

---

## 🌟 Highlights

- **Real-time weather data** from OpenWeather API  
- **5-day forecast** with hourly details  
- **Beautiful charts** (Recharts) for temperature forecast  
- **State management with Zustand** — easy to scale  
- **React Query for API caching** — fast and efficient  
- **Responsive design** for desktop & mobile  
- **Clean and maintainable React + TS architecture**  

---

## ℹ️ Overview

Weather App is a simple and elegant solution for checking the weather anywhere in the world.  
The goal of the project is to practise:

- Clean React component structure  
- API integration with caching  
- State management patterns  
- UI/UX on real-world mini-projects  
- Data visualization libraries  

This application is easy to extend — you can add units, theming, geolocation, and more.

---

## ✍️ Authors

- **Dexr1te** — creator and maintainer  
  - GitHub: https://github.com/Dexr1te  

---

## 🚀 Usage

Run the app locally:

```bash
git clone https://github.com/Dexr1te/weather-app.git
cd weather-app
npm install
npm run dev
Open the link in your browser (usually):
http://localhost:5173
Try searching for any city — the app will show:
Current temperature
Feels-like indicator
Humidity, pressure, wind
Hourly + 5-day forecast chart
Example:
import { fetchWeather } from '@/api'
const data = await fetchWeather('London')
console.log(data.main.temp)
⬇️ Installation
Requirements:
Node.js v18+
npm v9+
Steps:
Clone the repository
Install dependencies
Run development server
Add your OpenWeather API key to .env:
VITE_API_KEY=your_api_key_here
📁 Project Structure
src/
 ├── api/          # API logic (fetching weather)
 ├── components/   # React UI components
 ├── features/     # Weather modules/pages
 ├── store/        # Zustand store
 ├── shared/       # Reusable helpers & types
 └── assets/       # Icons, images
💭 Feedback and Contributing
Found a bug? Want a new feature?
Open an Issue in the repository
Or start a Discussion
Contributions are welcome — feel free to submit a PR!
