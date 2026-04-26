"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandWrittenTitle } from "@/components/ui/hand-written-title";
import { PageMenuShell } from "@/components/ui/page-menu-shell";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="text-foreground transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="flex min-h-screen items-center justify-center px-6"
          >
            <HandWrittenTitle />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center"
          >
            <PageMenuShell center onOpenChange={setMenuOpen} />
            <h1
              className={`text-4xl font-semibold tracking-tight transition-opacity duration-200 sm:text-5xl ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              DAPS
            </h1>
            <p
              className={`max-w-xl text-foreground/75 transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Tap the menu and navigate to each page.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
