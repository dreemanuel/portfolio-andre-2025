import { BrowserRouter, Route, Routes } from "../node_modules/react-router-dom";
import HeroSection from "./components/HeroSection.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutMePage from "./pages/AboutMePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const App = () => {
  console.log("App Component Rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <HeroSection />
      <Navbar />
    </BrowserRouter>
  );
};

export default App;
