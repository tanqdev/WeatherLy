import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/layout";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/Home-page";
import CityPage from "./pages/City-page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/city/:cityName" element={<CityPage />}></Route>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
