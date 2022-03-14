import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Auctions from "./pages/Auctions";
import Listings from "./pages/Listings";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import Gallery from "./pages/Gallery";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/:name" element={<Artist />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/gallery/:name" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
