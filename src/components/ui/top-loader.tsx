"use client";
import React, { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

export const TopLoader = () => {
  const [scroll, setScroll] = useState(0);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dir = document.documentElement.getAttribute("dir") || "ltr";
    setIsRTL(dir === "rtl");
  }, []);

  return (
    <React.Fragment>
      <NextTopLoader showSpinner={false} color="var(--primary)" height={4} />
      <div
        className="fixed top-0 z-50 h-1 bg-primary transition-all duration-150"
        style={
          isRTL
            ? { right: 0, width: `${scroll}%` }
            : { left: 0, width: `${scroll}%` }
        }
      />
    </React.Fragment>
  );
};
