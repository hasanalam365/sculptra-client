// MainLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import SiteBackground from "../../Shared/SiteBackground/SiteBackground";

// Resets the window's scroll position to the top every time the route
// (pathname) changes, so navigating from one page to another — or from
// the Courses grid to a dynamic /academy-course-details/:id page — always
// opens at the top instead of keeping the previous page's scroll offset.
// "auto" (not "smooth") makes this an instant jump with no visible scroll.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const MainLayout = () => {
  return (
    <div className="relative isolate flex flex-col min-h-screen overflow-x-hidden bg-[#0a0b0d] text-white">
      <ScrollToTop />

      {/* WEBSITE BACKGROUND (gradient + animation) */}
      <SiteBackground />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MainLayout;