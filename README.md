# PGAGI Analytics Dashboard

A comprehensive, high-performance analytics dashboard built with Next.js, React, and TypeScript. Integrates real-time Weather, News, and Finance data APIs, featuring interactive charts, advanced animations, drag-and-drop widgets, dark/light themes, and accessibility support.

---

## 🚀 Features

* **Weather Module**: Searchable current weather and 5-day forecast chart using OpenWeatherMap.
* **News Feed**: Category-filtered headlines with infinite scroll via NewsAPI.
* **Finance Dashboard**: Searchable stock charts (daily close prices) using Alpha Vantage.

---

## 🛠 Tech Stack

* **Framework**: Next.js 14
* **Language**: TypeScript (strict mode)
* **Styling**: Tailwind CSS + SCSS Modules
* **State**: Redux Toolkit + RTK Query
* **Charts**: Recharts, Chart.js
* **Animations**: Three.js, Lottie
* **Auth**: NextAuth.js
* **Testing**: Jest, React Testing Library, Cypress
* **Deployment**: Vercel + GitHub Actions

---

## 📦 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/mayankrsagar/advanceFrontend
   cd advanceFrontend
   ```

2. **Install dependencies**

   ```bash
   npm create-next@latest .
   ```

3. **Environment Variables**

   Create a `.env` file in the project root with:

   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=<OpenWeatherMap_API_Key>
  NEXT_PUBLIC_NEWS_API_KEY=<NewsAPI_API_Key>
  NEXT_PUBLIC_ALPHA_VANTAGE_KEY=<AlphaVantage_API_Key>


   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## 🔧 Scripts

* `dev` - Start development server
* `build` - Create production build
* `start` - Run production build
* `lint` - Run ESLint
* `test` - Run unit & integration tests
* `cy:open` - Open Cypress test runner
* `coverage` - Generate test coverage report

---

## 📑 API Keys

* **OpenWeatherMap**: [Get key](https://home.openweathermap.org/api_keys)
* **NewsAPI**: [Get key](https://newsapi.org/register)
* **Alpha Vantage**: [Get key](https://www.alphavantage.co/support/#api-key)

---

## 🛡 Security

* Environment variables managed via `.env`
* No sensitive keys committed to source control
* Input sanitization for search forms

---

## 📚 Documentation

* **Components**: See `/components` for reusable UI elements.
* **Services**: API integrations in `/services`.
* **Store**: Redux slices & RTK Query in `/store`.
* **Layouts & Hooks**: Shared logic in `/components/layouts` and `/hooks`.

---

## 🌐 Live Demo (Optional)

A live version is deployed at: [https://pgagi-dashboard.vercel.app](https://pgagi-dashboard.vercel.app)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -m "feat: description"`)
4. Push to branch (`git push origin feat/YourFeature`)
5. Open a Pull Request

---

## 📝 License

MIT © Mayank Rambirsingh Sagar
