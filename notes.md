## 2026-03-03 – Project setup and core architecture

- **Goal**: Set up the Climate/Weatherly app with React + TypeScript + ShadCN UI + Tailwind, add routing, theming, React Query, and a clean API layer for OpenWeather.
- **Context**: Following a tutorial to build a production-style weather app with current weather, forecast, search, favorites, and dark/light mode.

---

## 1. Project initialization (`package.json`, Vite, React + TS)

### What I did
- Used **Vite React + TypeScript template** to bootstrap the app.
- Installed base dependencies and dev tools:
  - React, React DOM, TypeScript.
  - Tailwind + ShadCN UI tooling.
  - React Router for client-side routing.
  - TanStack React Query + Devtools for data fetching and caching.
  - ESLint + TypeScript ESLint for linting.
- Cleaned the default Vite starter:
  - Removed unused assets and boilerplate components.
  - Emptied the default CSS so I can style everything with Tailwind and ShadCN.

### Why this matters
- Vite + React + TS gives **fast dev server** and **type safety** from the start.
- Cleaning boilerplate keeps the project focused on the **weather app**, not example code.

---

## 2. UI foundation – Tailwind + ShadCN UI

### What I did
- Installed **Tailwind CSS** and generated its configuration files.
- Added Tailwind directives (base, components, utilities) into the main CSS file so I can use Tailwind classes anywhere.
- Installed and initialized **ShadCN UI** using its CLI:
  - Chose styling presets (e.g. “New York” style, neutral colors, CSS variables).
  - Let ShadCN configure theme tokens and Tailwind integration.
- Installed ShadCN components I will use:
  - `button`, `alert`, `card`, `command`, `scroll-area`, `skeleton`, `toast`, etc.

### How it shows up in the code
- Tailwind classes (like `bg-background`, `container`, `mx-auto`, `min-h-screen`) are used in layout components to quickly style the UI.
- ShadCN components live under `components/ui/...` and can be imported when building actual screens later.

### Why this matters
- Tailwind + ShadCN UI gives a **consistent design system** and **ready-made components**, so I can move faster on layout and focus on app logic.
- Using ShadCN’s tokens (like `bg-background`, `text-muted-foreground`) means **dark mode and light mode work automatically**.

---

## 3. Application shell – routing and layout (`App.tsx`, `Layout`)

### What I did
- Installed **React Router** and configured the main routes in `App.tsx`:
  - `/` → `HomePage` (weather dashboard for current location + saved locations).
  - `/city/:cityName` → `CityPage` (detailed weather view for a specific city).
- Wrapped the routes with a **layout and provider structure**:
  - `BrowserRouter` handles navigation.
  - `ThemeProvider` provides dark/light theme context.
  - `Layout` wraps every page with a shared header, footer, and main container.

### How it shows up in the code (`App.tsx`)
- `App.tsx`:
  - Imports `BrowserRouter`, `Routes`, `Route` from `react-router-dom`.
  - Wraps everything with `ThemeProvider defaultTheme="dark"` so dark mode is default.
  - Uses `<Layout>` so all pages share the same header/footer.
  - Defines:
    - `<Route path="/" element={<HomePage />} />`
    - `<Route path="/city/:cityName" element={<CityPage />} />`

### How `Layout` behaves
- `Layout` (in `components/Layouts/layout.tsx`) conceptually:
  - Renders a `Header` component.
  - Wraps children in a `<main>` tag.
  - Renders a footer with credits.
  - Uses Tailwind classes like:
    - Gradient background from `background` to `muted`.
    - `min-h-screen` to force full-height layout.
    - `container mx-auto px-4 py-8` to make content centered and responsive.

### Why this matters
- Centralizing the shell (header/footer/layout) keeps pages **simple and focused** on their own content.
- React Router gives a clean way to add more routes later (e.g. “About”, “Settings”, etc.).

---

## 4. Theming – dark/light mode (`ThemeProvider`, `useTheme`)

### What I did
- Created a **theme provider** file (based on ShadCN/next-themes) which:
  - Wraps the app and manages the current theme (`"light"`, `"dark"`, or `"system"`).
  - Exposes a `useTheme` hook to read and change the theme.
- In `App.tsx`, wrapped the entire UI with:
  - `<ThemeProvider defaultTheme="dark"> ... </ThemeProvider>`.

### How it works conceptually
- `ThemeProvider`:
  - Stores the current theme (e.g. in local storage or via CSS class on `<html>`).
  - Applies CSS variables so `bg-background`, `text-foreground`, etc. switch automatically.
- Any component can do:
  - `const { theme, setTheme } = useTheme();`
  - Then render different UI based on the theme or toggle it with `setTheme(...)`.

### Why this matters
- Dark mode is a **core feature** for modern UI, and ShadCN + `ThemeProvider` give it “for free”.
- Having a top-level theme context makes it easy to add things like:
  - Theme toggle in the header.
  - Remembering the user’s theme preference across sessions.

---

## 5. Header bar – logo and theme toggle (`header.tsx`)

### What I did
- Created `Header` in `components/Layouts/header.tsx`.
- Structure:
  - **Left side**: app logo that links back to the home page (`/`).
  - **Right side**: clickable icon to toggle between dark and light themes.
- Logo behavior:
  - Uses `useTheme()` to check the current theme.
  - If `theme === "dark"` → show `/image1.png`.
  - Else → show `/image.png`.
- Header styling:
  - `sticky top-0 z-50`: keeps header at the top while scrolling.
  - `border-b bg-background/95 backdrop-blur`: slight blur + transparent background for a glass effect.
  - Inner `div` uses `container mx-auto flex h-16 items-center justify-between px-4` for alignment.
- Theme toggle behavior:
  - Uses `MoonStar` and `Sun` icons from `lucide-react`.
  - If dark mode → show the sun (to indicate “switch to light”).
  - If light mode → show the moon (to indicate “switch to dark”).
  - On click:
    - Calls `setTheme(isDark ? "light" : "dark")`.
    - Adds a rotation animation via Tailwind classes like:
      - `transition-transform duration-500`
      - Conditional `rotate-180` / `rotate-0` based on the `isDark` flag.

### Why this matters
- The header is the **global navigation + brand area**; it appears on every page.
- Placing the theme toggle here makes it instantly discoverable and easy to use.
- The rotating icon is a **small UX polish** that makes the app feel more professional.

---

## 6. Data fetching – React Query setup (`App.tsx`)

### What I did
- Installed:
  - `@tanstack/react-query`
  - `@tanstack/react-query-devtools`
- In `App.tsx`:
  - Created a single `QueryClient` instance:
    - `const queryClient = new QueryClient();`
  - Wrapped the app with:
    - `<QueryClientProvider client={queryClient}> ... </QueryClientProvider>`
  - Added:
    - `<ReactQueryDevtools initialIsOpen={false} />` to debug queries.

### How this will be used
- Anywhere in the app (e.g. in `HomePage` or `CityPage`) I will be able to:
  - Use `useQuery` to fetch:
    - Current weather for a city.
    - 5-day forecast.
    - Reverse geocoding for current coordinates.
  - Use `useMutation` for things like:
    - Marking a city as favorite.
    - Managing search history.
- React Query will handle:
  - Caching data by query keys.
  - Background refetching when needed.
  - Loading / error states out of the box.

### Why this matters
- React Query **centralizes async logic**, so components stay simple and only describe **what data** they need, not **how to fetch it**.
- Devtools give a visual way to:
  - Inspect which queries are active.
  - See cache contents and freshness.

---

## 7. API configuration – OpenWeather settings (`src/api/config.ts`)

### What I did
- Created `API_CONFIG` in `src/api/config.ts` with:
  - `BASE_URL`: `https://api.openweathermap.org/data/2.5` (current weather + forecast endpoints).
  - `GEO_URL`: `http://api.openweathermap.org/geo/1.0/reverse` (geocoding / reverse geocoding).
  - `API_KEY`: read from environment variable (`import.meta.env.WEATHERLY_API_KEY`).
  - `DEFAULT_PARAMS`:
    - `units: "metric"` so temperatures are in Celsius.
    - `appid: import.meta.env.WEATHERLY_API_KEY` so every request sends the API key.

### Why I centralized this
- Having a single `API_CONFIG`:
  - Avoids repeating strings like base URLs and units.
  - Makes it easy to change units or move to a different API later.
- Reading the API key from `import.meta.env`:
  - Keeps secrets **out of the code** and under `.env` control.

### Gotcha to remember
- The env variable name you actually define (e.g. `VITE_WEATHERLY_API_KEY`) must **match what Vite expects** and what you read in `config.ts`.

---

## 8. Strong typing – API response types (`src/api/types.ts`)

### What I did
- Created `src/api/types.ts` to describe OpenWeather responses in TypeScript:

#### 8.1 `Coordinates`
- Represents a location:
  - `lat: number`
  - `lon: number`
- Used whenever we pass coordinates to API methods.

#### 8.2 `WeatherCondition`
- Represents a single weather condition item:
  - `id`, `main`, `description`, `icon`.
- Matches the `weather` array items from the OpenWeather API.

#### 8.3 `WeatherData`
- Represents **current weather** response:
  - `coord`: `Coordinates` (lat/lon).
  - `weather`: `WeatherCondition[]` (could be multiple descriptions).
  - `main`: temperature and humidity details:
    - `temp`, `feels_like`, `temp_min`, `temp_max`, `pressure`, `humidity`.
  - `wind`: wind speed and direction.
  - `sys`: metadata:
    - `sunrise`, `sunset`, `country`.
  - `name`: city name (e.g. “Mumbai”).
  - `dt`: timestamp of the weather data.

#### 8.4 `ForecastData`
- Represents **5-day / 3-hour forecast**:
  - `list`: array of forecast entries.
    - Each entry has:
      - `dt`: timestamp.
      - `main`: reuses `WeatherData["main"]` (same shape as current main data).
      - `weather`: reuses `WeatherData["weather"]`.
      - `wind`: reuses `WeatherData["wind"]`.
      - `dt_txt`: human-readable date/time string (e.g. `"2026-03-03 12:00:00"`).
  - `city`: meta info about the city:
    - `name`, `country`, `sunrise`, `sunset`.

#### 8.5 `GeocodingResponse`
- Represents **reverse geocoding** result:
  - `name`: city name.
  - `local_names?`: map of localized names (`Record<string, string>`).
  - `lat`, `lon`: coordinates.
  - `country`: country code.
  - `state?`: optional state/region field.

### Why this matters
- With these types:
  - Components and API layer get **strong autocomplete** and **compile-time safety**.
  - It’s harder to accidentally access a field that doesn’t exist.
  - Future refactors are safer because TypeScript will highlight broken assumptions.

---

## 9. API layer – `WeatherAPI` class (`src/api/weather.ts`)

### What I did
- Created a `WeatherAPI` class to group all weather-related network calls.
- This class:
  - Knows how to build URLs with query parameters.
  - Knows how to perform `fetch` calls and handle errors.
  - Exposes clear methods for each kind of data the app needs.

### 9.1 Private helpers

#### `createURL(endpoint: string, params: Record<string, string | number>)`
- Purpose:
  - Build a full URL with query parameters, always including the `appid` (API key).
- Steps:
  - Uses `URLSearchParams` to combine:
    - `appid: API_CONFIG.API_KEY`
    - Any additional `params` passed in (like `lat`, `lon`, `units`, `limit`).
  - Returns a string like:
    - `https://api.openweathermap.org/data/2.5/weather?lat=...&lon=...&units=metric&appid=...`

#### `fetchData<T>(url: string): Promise<T>`
- Purpose:
  - Generic helper to make the HTTP request and parse the JSON.
- Steps:
  - Calls `fetch(url)`.
  - If `!response.ok`, throws an error with the status text (`Weather API Error: ...`).
  - Otherwise, calls `response.json()` and returns it as type `T`.
- Benefit:
  - Any method (`getCurrentWeather`, `currentForecast`, `reverseGeocode`) can reuse the same logic without repeating error handling.

### 9.2 Public methods

#### `getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData>`
- Builds URL:
  - Endpoint: `${API_CONFIG.BASE_URL}/weather`.
  - Params:
    - `lat`, `lon` (converted to strings).
    - `units` from `API_CONFIG.DEFAULT_PARAMS.units` (metric).
- Calls `fetchData<WeatherData>(url)` to get typed data.
- Used to display **current conditions** for a location.

#### `currentForecast({ lat, lon }: Coordinates): Promise<ForecastData>`
- Builds URL:
  - Endpoint: `${API_CONFIG.BASE_URL}/forecast`.
  - Params:
    - `lat`, `lon`.
    - `units` from `API_CONFIG.DEFAULT_PARAMS.units`.
- Calls `fetchData<ForecastData>(url)`.
- Used to power the **5-day / 3-hour forecast graph and list**.

#### `reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]>`
- Builds URL:
  - Endpoint based on `API_CONFIG.GEO_URL` (reverse geocoding).
  - Params:
    - `lat`, `lon`.
    - `limit: 1` (we only care about the first/best match).
- Calls `fetchData<GeocodingResponse[]>(url)`.
- Used to:
  - Convert device coordinates (from browser geolocation) into a **human-readable city name**.

### 9.3 Exported instance
- Exported `weatherApi` as a **singleton instance**:
  - `export const weatherApi = new WeatherAPI();`
- This means:
  - Anywhere in the app I can import `weatherApi` and call:
    - `weatherApi.getCurrentWeather(...)`
    - `weatherApi.currentForecast(...)`
    - `weatherApi.reverseGeocode(...)`

### Why this matters
- Encapsulating API logic in a class:
  - Keeps components **clean and declarative**.
  - Makes it easier to mock the API in tests.
  - Centralizes error handling and URL-building logic.

---

## 10. Notes / gotchas and next steps

### Current gotchas
- Need to ensure `.env` (or `.env.local`) defines the correct env var (e.g. `VITE_WEATHERLY_API_KEY`) and that it matches what `API_CONFIG` reads.
- `GEO_URL` currently points to `.../geo/1.0/reverse` while `reverseGeocode` also appends `/reverse`:
  - I may need to adjust this so the final URL is correct (either remove `/reverse` from `GEO_URL` or from `reverseGeocode`).
- `HomePage` and `CityPage` are wired into the router but **don’t yet have full UI or data fetching logic**.

### Planned next steps
- **HomePage (dashboard)**:
  - Use browser geolocation to get current coordinates.
  - Use React Query + `weatherApi.getCurrentWeather` and `weatherApi.currentForecast` to show:
    - Current temperature, description, location name.
    - 24-hour/5-day forecast graph.
  - Show a list of favorite cities and their summary weather.
- **CityPage**:
  - Read `cityName` from URL params.
  - Fetch weather data for that city using query hooks and `weatherApi`.
  - Reuse card components from ShadCN for a clean layout.
- **Search + favorites + history**:
  - Implement search (likely with ShadCN `command`).
  - Store recent searches and favorites using React Query mutations and local storage.
- **Deployment**:
  - Build the app and deploy to a host (like Hostinger or any static host) using a custom domain.

