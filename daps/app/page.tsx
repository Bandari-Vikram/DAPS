"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageMenuShell } from "@/components/ui/page-menu-shell";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="text-foreground transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center"
      >
        <PageMenuShell center onOpenChange={setMenuOpen} />
        <h1
          className={`text-5xl font-semibold tracking-tight transition-opacity duration-200 sm:text-6xl ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          DAPS
        </h1>
        <p
          className={`max-w-xl text-lg text-foreground/85 transition-opacity duration-200 ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          Dayananda Sagar App Store
        </p>
      </motion.div>
    </main>
  );
}
