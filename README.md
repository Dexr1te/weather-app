🌤 Weather App

Weather App is a modern web application for checking current weather and a 5-day forecast. Built with React, TypeScript, Zustand, and React Query, it demonstrates API integration, state management, and data visualization using charts.

🔹 Features

Current Weather: View real-time weather by city or geolocation
5-Day Forecast: Min/max temperatures, humidity, and wind speed
City Search: Search for cities with history of recent searches
Favorite Cities: Save cities for quick access
Light/Dark Theme: Toggle between light and dark modes
Responsive Design: Works on desktop and mobile devices
Data Visualization: Temperature trends displayed via Recharts

🔹 Technologies Used

React + TypeScript – Frontend framework
Vite – Fast build and development server
Zustand – Local state management (search history, favorites)
React Query (TanStack Query) – Server state management (weather & forecast)
Tailwind CSS – Utility-first CSS for styling and responsiveness
shadcn/ui – Prebuilt UI components
Recharts – Charting library for temperature visualization

🔹 Installation

Clone the repository:
git clone https://github.com/username/weather-app.git
cd weather-app

Install dependencies:
npm install


Create a .env file in the root folder and add your OpenWeather API key:
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY


Start the development server:
npm run dev

🔹 Build for Production
npm run build


The compiled files will be in the dist/ folder, ready for deployment to services like Vercel or Netlify.

🔹 Usage

Search for a city using the search input
Click on a city to view current weather and forecast
Add cities to favorites for quick access
Toggle between light and dark mode
View 5-day forecast with interactive charts

🔹 Environment Variables
Variable	Description
VITE_OPENWEATHER_API_KEY	Your API key from OpenWeather

Note: .env is excluded from GitHub to protect your API key. Use .env.example as a template.
